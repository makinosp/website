# me.mknn.jp

[me.mknn.jp](https://me.mknn.jp) is the personal portfolio website of Makinon, a software engineer based in Tokyo. The site is built with Astro and is available in English, Japanese, and Simplified Chinese.

## Features

- Profile, technical stack, personal projects, and GitHub activity sections
- English, Japanese, and Simplified Chinese locales with locale persistence
- Recent GitHub pushes, activity breakdown, and top repositories from the public GitHub API
- Client-side caching for GitHub data with a 24-hour retention period
- Third-party license dialog covering dependencies, fonts, and icons
- Production security and asset caching headers for Cloudflare Pages

## Technology

- [Astro](https://astro.build/) 7
- TypeScript
- Tailwind CSS with the Vite integration
- [astro-icon](https://github.com/natemoo-re/astro-icon) with Lucide and Simple Icons

## Project Routes

| Locale | Path |
| --- | --- |
| English | `/` |
| Japanese | `/ja/` |
| Simplified Chinese | `/zh-cn/` |

## Requirements

- Node.js 22.12.0 or later
- pnpm

## Development

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

The site is served at `http://localhost:4321` by default.

## Build

Set the public site origin when creating a production build so canonical and Open Graph URLs are generated correctly:

```sh
SITE_URL=https://mknn.jp pnpm build
```

Preview the production build locally:

```sh
pnpm preview
```

### Environment variables

| Variable | Description |
| --- | --- |
| `SITE_URL` | Public origin of the deployed site, including the scheme, such as `https://me.mknn.jp`. Set this in the Cloudflare Pages build environment. |

No GitHub API token is required. GitHub data is fetched from public, unauthenticated endpoints in the browser.

## Project Structure

```text
.
├── public/                 # Static assets and Cloudflare Pages headers
├── src/
│   ├── components/         # Reusable Astro components
│   ├── i18n/               # Locale definitions and translations
│   ├── layouts/            # Site layout and document metadata
│   ├── lib/                # GitHub, site, social, and license utilities
│   ├── pages/              # English, Japanese, and Chinese pages
│   └── styles/             # Global styles
├── astro.config.ts         # Astro, Tailwind CSS, and site configuration
└── package.json
```

## Commands

All commands run from the repository root:

| Command | Description |
| --- | --- |
| `pnpm install` | Install project dependencies |
| `pnpm dev` | Start the development server at `http://localhost:4321` |
| `pnpm build` | Create a production build in `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro check` | Run Astro and TypeScript checks |

## License

This project is licensed under the [BSD 3-Clause License](LICENSE).
