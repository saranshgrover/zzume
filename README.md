# Free No-Login Resume Builder

A lightweight, privacy-first resume builder where users can create, preview, and download ATS-friendly resumes — no account required. The builder offers live editing, structured form inputs, and exports the resume as a semantic HTML-based PDF via a serverless Puppeteer function.

## Features

- ✅ **No Login Required** - Create resumes instantly without any account
- ✅ **Live Preview** - See changes in real-time as you edit
- ✅ **ATS-Friendly** - Semantic HTML structure for optimal parsing
- ✅ **PDF Export** - Download clean, print-ready PDFs
- ✅ **Local Storage** - Data persists in your browser
- ✅ **Modern UI** - Clean, responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **PDF Generation**: Puppeteer (serverless function)
- **Package Manager**: pnpm

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Connect to Vercel**: Go to [vercel.com](https://vercel.com) and import your repository
3. **Automatic Deployment**: Vercel will automatically detect Next.js and deploy

The project includes:
- `vercel.json` - Configuration for Puppeteer function timeout
- Optimized Next.js config for serverless deployment
- Proper handling of Puppeteer in production

### Environment Variables

No environment variables are required for basic functionality. The app uses:
- `VERCEL_URL` - Automatically set by Vercel in production
- `PUPPETEER_EXECUTABLE_PATH` - Optional, for custom Chrome paths

## Project Structure

```
src/
├── app/
│   ├── (editor)/builder/     # Resume builder forms
│   ├── (exporter)/pdf-template/  # PDF template page
│   └── api/export-pdf/       # PDF generation API
├── components/               # Reusable UI components
└── lib/                      # Store and utilities
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
