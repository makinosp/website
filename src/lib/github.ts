import { USERNAME } from "./site.ts";
import {
  GITHUB_API,
  PER_PAGE,
  buildActivityStats,
  fetchRecentEvents,
  type ActivitySlice,
} from "./github-client.ts";

const USER_AGENT = "makinosp-website-build";
const ACCEPT_HEADER = "application/vnd.github+json";
const TOP_REPOS_LIMIT = 4;
const FALLBACK_LANGUAGE = "—";

export interface TopRepo {
  name: string;
  htmlUrl: string;
  language: string;
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

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [topRepos, events] = await Promise.all([
    fetchTopRepos(),
    fetchRecentEvents(USERNAME),
  ]);

  const stats = buildActivityStats(events);

  return {
    ...stats,
    topRepos,
  };
}
