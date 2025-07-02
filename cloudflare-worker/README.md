# Resume PDF Generator - Cloudflare Worker

This Cloudflare Worker generates PDF resumes using Puppeteer and Cloudflare's Browser Rendering API.

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Login to Cloudflare:**
   ```bash
   npx wrangler login
   ```

3. **Deploy the worker:**
   ```bash
   pnpm deploy
   ```

## Usage

The worker accepts POST requests with resume data and returns a PDF file.

### Request Format

```json
{
  "resumeData": {
    "personalInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0123",
      "location": "San Francisco, CA",
      "summary": "Experienced software engineer..."
    },
    "experience": [
      {
        "id": "1",
        "company": "Tech Corp",
        "position": "Senior Engineer",
        "startDate": "2020-01",
        "endDate": "2023-12",
        "description": "Led development of..."
      }
    ],
    "education": [
      {
        "id": "1",
        "institution": "University of Tech",
        "degree": "Bachelor's",
        "field": "Computer Science",
        "startDate": "2016-09",
        "endDate": "2020-05",
        "gpa": "3.8"
      }
    ],
    "skills": [
      {
        "id": "1",
        "name": "JavaScript",
        "level": 5
      }
    ]
  },
  "globalSettings": {
    "fontSize": 12,
    "lineSpacing": 1.5,
    "margin": 0.5
  }
}
```

### Response

Returns a PDF file with the filename format: `{name}_resume.pdf`

## Integration with Next.js App

Update your Next.js app's download function to call this worker instead of the local API route:

```typescript
const downloadPDF = async (resumeData: ResumeData, globalSettings: GlobalSettings) => {
  const response = await fetch('https://your-worker.your-subdomain.workers.dev', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resumeData, globalSettings }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate PDF')
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
```

## Environment Variables

No environment variables are needed - the Browser Rendering binding is automatically provided by Cloudflare.

## Development

To test locally:

```bash
pnpm dev
```

This will start the worker with remote browser rendering enabled. 