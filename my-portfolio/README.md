# Muhammad Qasim Portfolio

Premium, modern, and responsive portfolio website built for internship hiring and freelance client conversion.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide Icons

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for Production

```bash
npm run build
npm run start
```

## Editable Content

All main profile content is centralized in:

- `src/data/portfolio-content.ts`

Update this file to quickly change:

- Hero text and personal details
- Skills
- Projects
- Experience
- Services
- Testimonials
- Contact links

## Resume Download

Current resume file path:

- `public/resume-muhammad-qasim.pdf`

Replace this file with your final resume PDF while keeping the same file name.

## SEO

Metadata is configured in:

- `src/app/layout.tsx`

Before deployment, update:

- `metadataBase` URL
- Open Graph text
- Keywords as needed

## Deploy on Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use default Next.js build settings.
4. Deploy.

Vercel auto-detects Next.js and handles optimized production builds.
