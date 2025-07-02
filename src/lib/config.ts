// Configuration for external services
export const config = {
  // Cloudflare Worker URL for PDF generation
  // Replace with your actual deployed worker URL
  pdfWorkerUrl: process.env.NEXT_PUBLIC_PDF_WORKER_URL || 'https://your-worker.your-subdomain.workers.dev',
  
  // Fallback to local API route for development
  useLocalPdfApi: process.env.NODE_ENV === 'development',
} 