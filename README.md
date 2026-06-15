# sovereign

Personal blog of **M. Segundo** about how software design, infrastructure, and
regulation affect personal autonomy.

Built from the [Polyglow](https://github.com/zbzailabs/Polyglow) Astro 6 theme.

## Stack

- Astro 6 with static output and trailing slashes
- Tailwind CSS v4 through `@tailwindcss/vite`
- MDX content collections
- Pagefind static full-text search
- `astro-seo` for SEO metadata
- Light/dark themes with Astro view transitions

## Requirements

- Node.js 24 or newer
- pnpm

## Commands

```bash
pnpm install   # Install dependencies
pnpm dev       # Start local development
pnpm build     # Typecheck and build static output
pnpm preview   # Preview the built site locally
```

## Structure

```
src/config/                  # Site, locale, taxonomy, pagination
src/content/                 # Authors, pages, posts
src/pages/                   # Localized routes
src/layouts/main.astro       # Shared HTML shell
src/components/              # Cards, navigation, widgets
src/integrations/pagefind.ts # Build-time Pagefind indexing
src/styles/global.css        # Runtime Tailwind v4 theme
```

## Locales

- `en` — English (default)
- `es` — Español

## Content

Posts live in `src/content/posts/<locale>/`.
Pages live in `src/content/pages/<locale>/`.
Authors live in `src/content/authors/<locale>/`.

## License

MIT
