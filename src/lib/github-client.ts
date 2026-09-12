import { USERNAME } from "./site.ts";

export const GITHUB_API = "https://api.github.com";
export const PER_PAGE = 100;
export const MAX_PAGES = 10;
export const RECENT_DAYS = 7;
export const CACHE_KEY = "github-activity-stats-v1";
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export interface EventResponse {
  type: string;
  created_at: string;
}

export interface ActivitySlice {
  label: string;
  percent: number;
}

export interface ActivityStats {
  recentPushes: number;
  eventsTotal: number;
  activity: ActivitySlice[];
}

export interface EventCounts {
  commits: number;
  pullRequests: number;
  codeReviews: number;
  issues: number;
}

const INITIAL_COUNTS: EventCounts = {
  commits: 0,
  pullRequests: 0,
  codeReviews: 0,
  issues: 0,
};

/** Calculate the date N days ago in ISO 8601 format (UTC) */
export function getDaysAgo(days: number = RECENT_DAYS): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString();
}

export function countEvents(events: EventResponse[]): EventCounts {
  return events.reduce<EventCounts>(
    (counts, event) => {
      switch (event.type) {
        case "PushEvent":
          counts.commits += 1;
          break;
        case "PullRequestEvent":
          counts.pullRequests += 1;
          break;
        case "PullRequestReviewEvent":
        case "PullRequestReviewCommentEvent":
          counts.codeReviews += 1;
          break;
        case "IssuesEvent":
        case "IssueCommentEvent":
          counts.issues += 1;
          break;
      }
      return counts;
    },
    { ...INITIAL_COUNTS },
  );
}

/** Aggregate filtered events into display-ready activity stats */
export function buildActivityStats(events: EventResponse[]): ActivityStats {
  const { commits, pullRequests, codeReviews, issues } = countEvents(events);
  const total = commits + pullRequests + codeReviews + issues;
  const toPercent = (count: number): number =>
    total === 0 ? 0 : Math.round((count / total) * 100);

  return {
    recentPushes: commits,
    eventsTotal: events.length,
    activity: [
      { label: "Commits", percent: toPercent(commits) },
      { label: "Pull requests", percent: toPercent(pullRequests) },
      { label: "Code review", percent: toPercent(codeReviews) },
      { label: "Issues", percent: toPercent(issues) },
    ],
  };
}

/** Fetch public events within the recent window using pagination (browser safe) */
export async function fetchRecentEvents(
  username: string = USERNAME,
  days: number = RECENT_DAYS,
): Promise<EventResponse[]> {
  const cutoff = getDaysAgo(days);
  const allEvents: EventResponse[] = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/events/public?per_page=${PER_PAGE}&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(
        `GitHub API request failed: ${response.status} ${response.statusText}`,
      );
    }
    const events = (await response.json()) as EventResponse[];
    if (events.length === 0) {
      break;
    }

    const oldestEvent = events[events.length - 1];
    if (oldestEvent.created_at < cutoff) {
      allEvents.push(
        ...events.filter((event) => event.created_at >= cutoff),
      );
      break;
    }

    allEvents.push(...events);
    page += 1;
    if (page > MAX_PAGES) {
      break;
    }
  }

  return allEvents;
}

interface CachedActivity {
  fetchedAt: number;
  stats: ActivityStats;
}

/** Load cached activity stats when still fresh, otherwise null */
export function loadCachedActivity(
  now: number = Date.now(),
  key: string = CACHE_KEY,
): ActivityStats | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    const cached = JSON.parse(raw) as CachedActivity;
    if (now - cached.fetchedAt > CACHE_TTL_MS) {
      return null;
    }
    return cached.stats;
  } catch {
    return null;
  }
}

/** Persist activity stats with a fetch timestamp */
export function saveCachedActivity(
  stats: ActivityStats,
  now: number = Date.now(),
  key: string = CACHE_KEY,
): void {
  try {
    const payload: CachedActivity = { fetchedAt: now, stats };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Ignore storage errors (private mode, quota exceeded)
  }
}

/** Fetch fresh activity stats and update the cache */
export async function fetchActivityStats(
  username: string = USERNAME,
  days: number = RECENT_DAYS,
): Promise<ActivityStats> {
  const events = await fetchRecentEvents(username, days);
  const stats = buildActivityStats(events);
  saveCachedActivity(stats);
  return stats;
}
