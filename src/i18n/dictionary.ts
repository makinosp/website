export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    tech: string;
    projects: string;
    stats: string;
  };
  languageLabel: string;
  hero: {
    subtitle: string;
    avatarAlt: string;
  };
  about: {
    title: string;
    greetingTemplate: string;
    paragraphs: string[];
  };
  tech: {
    title: string;
    categories: {
      languages: string;
      frameworksTools: string;
      other: string;
    };
  };
  projects: {
    title: string;
    descriptions: Record<string, string>;
    viewOnGitHubTemplate: string;
    starsTemplate: string;
    forksTemplate: string;
  };
  stats: {
    title: string;
    recentPushes: string;
    pushesSuffix: string;
    activity: string;
    topRepos: string;
    loadingPushes: string;
    loadingActivity: string;
    loadError: string;
    labels: {
      commits: string;
      pullRequests: string;
      codeReview: string;
      issues: string;
    };
  };
  footer: {
    rightsSuffix: string;
    licensesButton: string;
  };
  licensesModal: {
    title: string;
    description: string;
    closeLabel: string;
    categories: {
      runtime: string;
      buildTooling: string;
      fonts: string;
      icons: string;
    };
  };
}
