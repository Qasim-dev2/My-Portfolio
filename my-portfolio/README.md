# Muhammad Qasim - Premium Portfolio

A premium, modern, and responsive portfolio website built with cutting-edge web technologies. Designed for internship hiring and freelance client conversion.

## ✨ Features

- **Next.js 16** with App Router for optimal performance
- **TypeScript** for type safety and better DX
- **Tailwind CSS v4** for rapid UI development
- **Framer Motion** for smooth animations and transitions
- **Neural Network Canvas** for stunning visual effects
- **3D Tilt Cards** with cinematic lighting
- **Responsive Design** - looks great on all devices
- **SEO Optimized** with proper meta tags
- **Performance First** - optimized images and bundle size
- **Accessibility** - WCAG compliant

## 🚀 Tech Stack

- **Framework**: Next.js 16.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion 12
- **Icons**: Lucide React
- **UI**: Custom components with premium design

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## 🛠️ Setup & Installation

1. **Clone or setup the project**
   ```bash
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── portfolio-page.tsx # Main portfolio component
│   └── visual-effects.tsx # Neural network canvas
├── data/
│   └── portfolio-content.ts # Content and profile data
└── lib/
    ├── constants.ts       # Application constants
    └── utils.ts           # Utility functions
```

## 🎨 Customization

### Update Profile Information
Edit `src/data/portfolio-content.ts` with your:
- Name and title
- Profile image (place in `public/`)
- About section
- Skills and experience
- Projects and testimonials
- Contact information

### Styling
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Theme variables in CSS root

### Content & Navigation
Update `NAV_ITEMS` in `src/lib/constants.ts` to customize navigation links.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

**Build for production:**
```bash
npm run build
npm start
```

## 📊 Performance

- **Lighthouse Scores**: Optimized for 90+ scores
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: ~50KB gzip (after optimization)

## 🔍 SEO

The portfolio includes:
- Meta tags and Open Graph information
- Semantic HTML structure
- Fast Core Web Vitals
- Mobile-friendly design

Update metadata in `src/app/layout.tsx` with your own information.

## 📝 Adding New Sections

1. Create a new component in `src/components/`
2. Import and add to `src/components/portfolio-page.tsx`
3. Style using Tailwind CSS utilities
4. Add animations using Framer Motion if needed

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Build failures?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📄 License

This project is personal and proprietary. All rights reserved.

## 🤝 Support

For issues or improvements, refer to the project documentation or create an issue in the repository.

---

**Last Updated**: April 2026
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
