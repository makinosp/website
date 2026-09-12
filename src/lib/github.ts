const GITHUB_API = "https://api.github.com";
const USERNAME = "makinosp";
const USER_AGENT = "makinosp-website-build";

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

/** Calculate the date 7 days ago in ISO 8601 format (UTC) */
function getSevenDaysAgo(): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 7);
  return date.toISOString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
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

export async function fetchTopRepos(limit = 4): Promise<TopRepo[]> {
  const repos = await fetchJson<RepoResponse[]>(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&type=owner&sort=pushed&direction=desc`,
  );
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, limit)
    .map((repo) => ({
      name: repo.name,
      htmlUrl: repo.html_url,
      language: repo.language ?? "—",
    }));
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [topRepos, events] = await Promise.all([
    fetchTopRepos(),
    fetchRecentEvents(),
  ]);

  const sevenDaysAgo = getSevenDaysAgo();
  const recentEvents = events.filter(
    (event) => event.created_at >= sevenDaysAgo,
  );

  const commits = recentEvents.filter((event) => event.type === "PushEvent").length;
  const pullRequests = recentEvents.filter(
    (event) => event.type === "PullRequestEvent",
  ).length;
  const codeReviews = recentEvents.filter(
    (event) =>
      event.type === "PullRequestReviewEvent" ||
      event.type === "PullRequestReviewCommentEvent",
  ).length;
  const issues = recentEvents.filter(
    (event) =>
      event.type === "IssuesEvent" || event.type === "IssueCommentEvent",
  ).length;

  const total = commits + pullRequests + codeReviews + issues;
  const toPercent = (count: number) =>
    total === 0 ? 0 : Math.round((count / total) * 100);

  return {
    recentPushes: commits,
    eventsTotal: recentEvents.length,
    activity: [
      { label: "Commits", percent: toPercent(commits) },
      { label: "Pull requests", percent: toPercent(pullRequests) },
      { label: "Code review", percent: toPercent(codeReviews) },
      { label: "Issues", percent: toPercent(issues) },
    ],
    topRepos,
  };
}

/** Fetch all public events from the last 7 days using pagination */
async function fetchRecentEvents(): Promise<EventResponse[]> {
  const sevenDaysAgo = getSevenDaysAgo();
  const allEvents: EventResponse[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const events = await fetchJson<EventResponse[]>(
      `${GITHUB_API}/users/${USERNAME}/events/public?per_page=${perPage}&page=${page}`,
    );

    if (events.length === 0) {
      break;
    }

    // Check if the oldest event in this page is older than 7 days
    const oldestEvent = events[events.length - 1];
    if (oldestEvent.created_at < sevenDaysAgo) {
      // Filter to only include events within the last 7 days
      const recentInPage = events.filter(
        (event) => event.created_at >= sevenDaysAgo,
      );
      allEvents.push(...recentInPage);
      break;
    }

    allEvents.push(...events);
    page++;

    // Safety limit: don't fetch more than 10 pages (1000 events)
    if (page > 10) {
      break;
    }
  }

  return allEvents;
}
