import type { Dictionary } from "./dictionary.ts";

export const ja: Dictionary = {
  meta: {
    title: "まきのん - Portfolio",
    description:
      "まきのん - 東京を拠点とするソフトウェアエンジニア。TypeScript、Rust、Node.jsによるWeb開発を中心に活動しています。",
  },
  nav: {
    about: "自己紹介",
    tech: "技術スタック",
    projects: "プロジェクト",
    stats: "統計",
  },
  languageLabel: "言語",
  hero: {
    subtitle:
      "東京を拠点とするソフトウェアエンジニア。Web・モバイルアプリケーション開発を中心に活動しています。",
    avatarAlt: "まきのん",
  },
  about: {
    title: "自己紹介",
    greetingTemplate: "こんにちは！東京を拠点に活動するソフトウェアエンジニア、{name}です。",
    paragraphs: [
      "仕事ではTypeScriptによるNode.jsバックエンドサーバーの開発を中心に担当しています。",
      "個人では家計管理ツールや2Dゲームを開発しています。",
      "AIエージェントを活用した仕様駆動の開発スタイルですが、自分でコードを書く楽しさも忘れません。",
    ],
  },
  tech: {
    title: "技術スタック",
    categories: {
      languages: "言語",
      frameworksTools: "フレームワーク・ツール",
      other: "その他",
    },
  },
  projects: {
    title: "プロジェクト",
    descriptions: {
      utopia:
        "Firefly IIIと部分互換の軽量・セルフホスト可能な個人向け家計管理API。Rust製。",
      luminescence:
        "Firefly III向けのTypeScript製マルチクライアントアプリケーション群。モバイル・Web・CLIで共通の家計管理ロジックを提供します。",
      xiangke:
        "Xiangke（相剋; xiāngkè）は三国志に着想を得た、メニュー選択式のターンバトルゲームです。",
      "pr-agent-runner":
        "OpenCodeReview（OCR）基盤のAIによるPRレビュー自動化と、レビュー投稿や@メンション応答を行う小型TypeScript CLIです。",
    },
    viewOnGitHubTemplate: "GitHubで{name}を見る",
    starsTemplate: "スター {count} 件",
    forksTemplate: "フォーク {count} 件",
  },
  stats: {
    title: "GitHub統計",
    recentPushes: "最近のプッシュ",
    pushesSuffix: "直近7日間のプッシュ数",
    activity: "アクティビティ",
    topRepos: "主要リポジトリ",
    loadingPushes: "最近のプッシュを読み込み中…",
    loadingActivity: "アクティビティを読み込み中…",
    loadError:
      "GitHubアクティビティを読み込めませんでした。しばらくしてから再度お試しください。",
    labels: {
      commits: "コミット",
      pullRequests: "プルリクエスト",
      codeReview: "コードレビュー",
      issues: "Issue",
    },
  },
  footer: {
    rightsSuffix: "All rights reserved.",
    licensesButton: "サードパーティライセンス",
  },
  licensesModal: {
    title: "サードパーティライセンス",
    description:
      "このサイトはオープンソースソフトウェアで構築されています。各プロジェクトのメンテナーとコントリビューターに感謝します。",
    closeLabel: "サードパーティライセンスのダイアログを閉じる",
    categories: {
      runtime: "ランタイム",
      buildTooling: "ビルドツール",
      fonts: "フォント",
      icons: "アイコン",
    },
  },
  qqModal: {
    openLabel: "QQのQRコードを表示",
    closeLabel: "QQのQRコードダイアログを閉じる",
    qrAlt: "QQのQRコード",
  },
};
