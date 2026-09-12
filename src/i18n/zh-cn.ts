import type { Dictionary } from "./dictionary.ts";

export const zhCn: Dictionary = {
  meta: {
    title: "牧野 - Portfolio",
    description:
      "牧野 - 常驻东京的软件工程师，专注于使用 TypeScript、Rust 和 Node.js 的 Web 开发。",
  },
  nav: {
    about: "关于我",
    tech: "技术栈",
    projects: "项目",
    stats: "统计",
  },
  languageLabel: "语言",
  hero: {
    subtitle: "常驻东京的软件工程师，专注于 Web 与移动应用开发。",
    avatarAlt: "牧野",
  },
  about: {
    title: "关于我",
    greetingTemplate: "你好！我是常驻东京的软件工程师{name}。",
    paragraphs: [
      "工作中主要使用 TypeScript 开发 Node.js 后端服务。",
      "个人项目中开发家庭记账工具和 2D 游戏。",
      "以规范驱动、善用 AI 智能体为主要开发方式，同时不忘亲手写代码的乐趣。",
    ],
  },
  tech: {
    title: "技术栈",
    categories: {
      languages: "语言",
      frameworksTools: "框架与工具",
      other: "其他",
    },
  },
  projects: {
    title: "项目",
    descriptions: {
      utopia:
        "轻量、可自托管的个人记账 API，部分兼容 Firefly III，使用 Rust 编写。",
      luminescence:
        "面向 Firefly III 的 TypeScript 多客户端应用套件，在移动端、Web 端和 CLI 之间共享个人记账逻辑。",
      xiangke:
        "Xiangke（相剋; xiāngkè）是一款以三国为灵感、菜单驱动战斗的回合制游戏。",
      "pr-agent-runner":
        "基于 OpenCodeReview（OCR）的 AI PR 评审自动化，以及用于发布评审和响应 @提及命令的小型 TypeScript CLI。",
    },
    viewOnGitHubTemplate: "在 GitHub 上查看{name}",
    starsTemplate: "{count} 个 Star",
    forksTemplate: "{count} 个 Fork",
  },
  stats: {
    title: "GitHub 统计",
    recentPushes: "近期推送",
    pushesSuffix: "过去 7 天内的推送次数",
    activity: "动态",
    topRepos: "热门仓库",
    loadingPushes: "正在加载近期推送…",
    loadingActivity: "正在加载动态…",
    loadError: "无法加载 GitHub 动态，请稍后再试。",
    labels: {
      commits: "提交",
      pullRequests: "拉取请求",
      codeReview: "代码评审",
      issues: "议题",
    },
  },
  footer: {
    rightsSuffix: "版权所有。",
    licensesButton: "第三方许可",
  },
  licensesModal: {
    title: "第三方许可",
    description:
      "本站使用开源软件构建，感谢各项目的维护者与贡献者。",
    closeLabel: "关闭第三方许可对话框",
    categories: {
      runtime: "运行时",
      buildTooling: "构建工具",
      fonts: "字体",
      icons: "图标",
    },
  },
};
