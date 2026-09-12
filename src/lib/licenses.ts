import pkg from "../../package.json";

export interface LicenseItem {
  label: string;
  href: string;
  note: string;
}

export interface LicenseCategory {
  title: string;
  items: LicenseItem[];
}

function version(name: string): string {
  const value: string | undefined =
    (pkg.dependencies as Record<string, string>)[name] ??
    (pkg.devDependencies as Record<string, string>)[name];
  return value ? value.replace(/^[~^>=<\s]+/, "") : "";
}

export const LICENSE_CATEGORIES: LicenseCategory[] = [
  {
    title: "Runtime",
    items: [
      {
        label: `Astro ${version("astro")}`,
        href: "https://github.com/withastro/astro",
        note: "— MIT License",
      },
      {
        label: `astro-icon ${version("astro-icon")}`,
        href: "https://github.com/natemoo-re/astro-icon",
        note: "— MIT License",
      },
    ],
  },
  {
    title: "Build tooling",
    items: [
      {
        label: `Tailwind CSS ${version("tailwindcss")}`,
        href: "https://github.com/tailwindlabs/tailwindcss",
        note: "— MIT License",
      },
      {
        label: `@tailwindcss/vite ${version("@tailwindcss/vite")}`,
        href: "https://github.com/tailwindlabs/tailwindcss",
        note: "— MIT License",
      },
      {
        label: `TypeScript ${version("typescript")}`,
        href: "https://github.com/microsoft/TypeScript",
        note: "— Apache License 2.0",
      },
      {
        label: `@astrojs/check ${version("@astrojs/check")}`,
        href: "https://github.com/withastro/astro",
        note: "— MIT License",
      },
      {
        label: `@types/node ${version("@types/node")}`,
        href: "https://github.com/DefinitelyTyped/DefinitelyTyped",
        note: "— MIT License",
      },
    ],
  },
  {
    title: "Fonts",
    items: [
      {
        label: "Inter",
        href: "https://github.com/rsms/inter",
        note:
          "by Rasmus Andersson — SIL Open Font License 1.1, loaded via Google Fonts",
      },
      {
        label: "Fira Code",
        href: "https://github.com/tonsky/FiraCode",
        note:
          "by Nikita Prokopov — SIL Open Font License 1.1, loaded via Google Fonts",
      },
    ],
  },
  {
    title: "Icons",
    items: [
      {
        label: "Lucide",
        href: "https://github.com/lucide-icons/lucide",
        note: `(via @iconify-json/lucide ${version("@iconify-json/lucide")}) — ISC License; includes portions derived from Feather Icons (MIT License, copyright Cole Bemis)`,
      },
      {
        label: "Simple Icons",
        href: "https://github.com/simple-icons/simple-icons",
        note: `(via @iconify-json/simple-icons ${version("@iconify-json/simple-icons")}) — CC0 1.0 Universal; brand trademarks belong to their respective owners`,
      },
      {
        label: "VRC Icons (Launchpad Icons)",
        href: "https://github.com/kurone-kito/launchpad-icons",
        note:
          "by Kurone Kito — MIT License (dual-licensed MIT / CC BY 4.0, MIT applied by default); used for the VRChat icon",
      },
      {
        label: "CHARAT avatar artwork",
        href: "https://charat.me/",
        note:
          "by LIBRE (Ameniwa) — created with CHARAT and used per the CHARAT usage guidelines; no credit required for profile-icon use, listed here as a courtesy",
      },
    ],
  },
];
