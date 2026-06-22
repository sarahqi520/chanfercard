# CHANFER Card Packaging Website

Card packaging automation solutions by Guangzhou Chanfer Intelligent Equipment Co., Ltd.

## Tech Stack

- **Framework**: Next.js 16 (static export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## Project Structure

```
app/[lang]/          # Route-based i18n pages (9 languages)
  page.tsx           # Homepage with 6 packaging methods
  solutions/         # Packaging solution detail pages
  machines/          # Machine catalog
  about/             # Company profile
  contact/           # Contact form + info
components/          # React components
lib/                 # Utilities, data, i18n config
messages/            # Translation files (en, zh, ru, it, de, fr, es, ko, ja)
public/              # Static assets, robots.txt, sitemap.xml
```

## Content Management

Edit text content in `messages/{locale}.json` — changes auto-deploy on push.
See `内容管理指南.md` for full instructions.

## Development

```bash
npm install
npm run dev     # Start dev server at localhost:3000
npm run build   # Build to static out/ directory
```

## Auto-Deploy

Pushing to `main` branch triggers GitHub Actions → builds → deploys to chanfercard.com
