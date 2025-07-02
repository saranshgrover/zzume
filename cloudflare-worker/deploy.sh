#!/bin/bash

# Deploy Cloudflare Worker for PDF generation
echo "🚀 Deploying Resume PDF Generator Worker..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Deploy to Cloudflare
echo "🌐 Deploying to Cloudflare..."
pnpm deploy

echo "✅ Deployment complete!"
echo "📝 Update your .env.local with:"
echo "NEXT_PUBLIC_PDF_WORKER_URL=https://resume-pdf-generator.your-subdomain.workers.dev" 