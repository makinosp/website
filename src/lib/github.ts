import { USERNAME } from "./site.ts";

const GITHUB_API = "https://api.github.com";
const USER_AGENT = "makinosp-website-build";
const ACCEPT_HEADER = "application/vnd.github+json";
const PER_PAGE = 100;
const MAX_PAGES = 10;
const TOP_REPOS_LIMIT = 4;
const RECENT_DAYS = 7;
const FALLBACK_LANGUAGE = "—";

export interface TopRepo {
  name: string;
  htmlUrl: string;
  language: string;
}

export interface ActivitySlice {
  label: string;
  percent: number;
}

export interface GitHubStats {
  recentPushes: number;
  eventsTotal: number;
  activity: ActivitySlice[];
  topRepos: TopRepo[];
}

interface RepoResponse {
  name: string;
  html_url: string;
  language: string | null;
  fork: boolean;
  pushed_at: string;
}

interface EventResponse {
  type: string;
  created_at: string;
}

interface EventCounts {
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
function getDaysAgo(days: number = RECENT_DAYS): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: ACCEPT_HEADER,
      "User-Agent": USER_AGENT,
    },
  });
  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    throw new Error(
      `GitHub API request failed: ${response.status} ${response.statusText} for ${url}` +
      (remaining !== null ? ` (rate-limit remaining: ${remaining})` : ""),
    );
  }
  return (await response.json()) as T;
}

export async function fetchTopRepos(
  limit: number = TOP_REPOS_LIMIT,
): Promise<TopRepo[]> {
  const repos = await fetchJson<RepoResponse[]>(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=${PER_PAGE}&type=owner&sort=pushed&direction=desc`,
  );
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, limit)
    .map((repo) => ({
      name: repo.name,
      htmlUrl: repo.html_url,
      language: repo.language ?? FALLBACK_LANGUAGE,
    }));
}

/** Fetch all public events from the last N days using pagination */
async function fetchRecentEvents(): Promise<EventResponse[]> {
  const cutoff = getDaysAgo();
  const allEvents: EventResponse[] = [];
  let page = 1;

  while (true) {
    const events = await fetchJson<EventResponse[]>(
      `${GITHUB_API}/users/${USERNAME}/events/public?per_page=${PER_PAGE}&page=${page}`,
    );

    if (events.length === 0) {
      break;
    }

    // Check if the oldest event in this page is older than the cutoff
    const oldestEvent = events[events.length - 1];
    if (oldestEvent.created_at < cutoff) {
      // Filter to only include events within the window
      const recentInPage = events.filter(
        (event) => event.created_at >= cutoff,
      );
      allEvents.push(...recentInPage);
      break;
    }

    allEvents.push(...events);
    page++;

    // Safety limit: don't fetch more than MAX_PAGES
    if (page > MAX_PAGES) {
      break;
    }
  }

  return allEvents;
}

function countEvents(events: EventResponse[]): EventCounts {
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

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [topRepos, events] = await Promise.all([
    fetchTopRepos(),
    fetchRecentEvents(),
  ]);

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
    topRepos,
  };
}
