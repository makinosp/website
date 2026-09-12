import type { Dictionary } from "./dictionary.ts";

export const en: Dictionary = {
  meta: {
    title: "Makie - Portfolio",
    description:
      "Makie - Software Engineer based in Tokyo, focusing on Web development with TypeScript, Rust, and Node.js.",
  },
  nav: {
    about: "About",
    tech: "Tech Stack",
    projects: "Projects",
    stats: "Stats",
  },
  languageLabel: "Language",
  hero: {
    subtitle:
      "Software Engineer based in Tokyo, focusing on web and mobile application development.",
    avatarAlt: "Makie",
  },
  about: {
    title: "About Me",
    greetingTemplate: "Hi! I'm {name}, a Software Engineer based in Tokyo.",
    paragraphs: [
      "I mainly develop Node.js backend servers in TypeScript for business projects.",
      "In personal projects, I build tools for household finance and develop 2D games.",
      "My approach is largely specification-driven, leveraging AI agents—though I never lose the joy of writing code myself.",
    ],
  },
  tech: {
    title: "Tech Stack",
    categories: {
      languages: "Languages",
      frameworksTools: "Frameworks & Tools",
      other: "Other",
    },
  },
  projects: {
    title: "Projects",
    descriptions: {
      utopia:
        "A lightweight, self-hostable personal finance API with partial Firefly-III compatibility, written in Rust.",
      luminescence:
        "A TypeScript-based multi-client application suite for Firefly III, providing shared personal finance management logic across mobile, web, and CLI platforms.",
      xiangke:
        "Xiangke (相剋; xiāngkè) is a turn-based battle game with menu-driven combat, inspired by Romance of the Three Kingdoms.",
      "pr-agent-runner":
        "AI-powered PR review automation built on OpenCodeReview (OCR) and a small TypeScript CLI that posts reviews and answers @mention commands on GitHub.",
    },
    viewOnGitHubTemplate: "View {name} on GitHub",
    starsTemplate: "{count} star",
    forksTemplate: "{count} fork",
  },
  stats: {
    title: "GitHub Stats",
    recentPushes: "Recent pushes",
    pushesSuffix: "pushes in the last 7 days",
    activity: "Activity",
    topRepos: "Top Repositories",
    loadingPushes: "Loading recent pushes…",
    loadingActivity: "Loading activity…",
    loadingTopRepos: "Loading top repositories…",
    loadError: "Could not load GitHub activity. Please try again later.",
    topReposLoadError: "Could not load top repositories. Please try again later.",
    labels: {
      commits: "Commits",
      pullRequests: "Pull requests",
      codeReview: "Code review",
      issues: "Issues",
    },
  },
  footer: {
    rightsSuffix: "All rights reserved.",
    licensesButton: "Third-party licenses",
  },
  licensesModal: {
    title: "Third-party licenses",
    description:
      "This site is built with open source software. Thanks to the maintainers and contributors of these projects.",
    closeLabel: "Close third-party licenses dialog",
    categories: {
      runtime: "Runtime",
      buildTooling: "Build tooling",
      fonts: "Fonts",
      icons: "Icons",
    },
  },
};
