import puppeteer from '@cloudflare/puppeteer'

// Define the same types as your Next.js app
interface PersonalInfo {
  name: string
  email?: string
  phone?: string
  location?: string
  summary?: string
}

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  gpa?: string
}

interface Skill {
  id: string
  name: string
  level: number
}

interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}

interface GlobalSettings {
  fontSize?: number
  lineSpacing?: number
  margin?: number
}

interface ResumeRequestData {
  resumeData: ResumeData
  globalSettings: GlobalSettings
}

// Generate the HTML document for the resume
function generateResumeHTML(data: ResumeRequestData): string {
  const { resumeData, globalSettings } = data
  const { personalInfo, experience, education, skills } = resumeData
  
  const fontSize = globalSettings?.fontSize || 12
  const lineSpacing = globalSettings?.lineSpacing || 1.5
  const margin = globalSettings?.margin || 0.5

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalInfo.name} - Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: ${fontSize}px;
      line-height: ${lineSpacing};
      color: #000;
      background: white;
      padding: ${margin}in;
    }
    
    .header {
      text-align: center;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #333;
      padding-bottom: 1rem;
    }
    
    .name {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    .contact-info {
      font-size: 1rem;
      color: #666;
    }
    
    .contact-info span {
      margin: 0 0.5rem;
    }
    
    .summary {
      margin-bottom: 1.5rem;
      text-align: justify;
    }
    
    .section {
      margin-bottom: 1.5rem;
    }
    
    .section-title {
      font-size: 1.3rem;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 1px solid #333;
      margin-bottom: 1rem;
      padding-bottom: 0.25rem;
    }
    
    .experience-item, .education-item {
      margin-bottom: 1rem;
    }
    
    .experience-header, .education-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .company, .institution {
      font-weight: bold;
      font-size: 1.1rem;
    }
    
    .position, .degree {
      font-style: italic;
      color: #666;
    }
    
    .date {
      color: #666;
      font-size: 0.9rem;
    }
    
    .description {
      text-align: justify;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.5rem;
    }
    
    .skill-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .skill-name {
      font-weight: 500;
    }
    
    .skill-level {
      display: flex;
      gap: 2px;
    }
    
    .skill-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ddd;
    }
    
    .skill-dot.filled {
      background: #333;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${personalInfo.name}</div>
    <div class="contact-info">
      ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
      ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
      ${personalInfo.location ? `<span>${personalInfo.location}</span>` : ''}
    </div>
  </div>
  
  ${personalInfo.summary ? `
  <div class="summary">
    <p>${personalInfo.summary}</p>
  </div>
  ` : ''}
  
  ${experience.length > 0 ? `
  <div class="section">
    <h2 class="section-title">Experience</h2>
    ${experience.map(exp => `
      <div class="experience-item">
        <div class="experience-header">
          <div>
            <div class="company">${exp.company}</div>
            <div class="position">${exp.position}</div>
          </div>
          <div class="date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
        </div>
        <div class="description">${exp.description}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}
  
  ${education.length > 0 ? `
  <div class="section">
    <h2 class="section-title">Education</h2>
    ${education.map(edu => `
      <div class="education-item">
        <div class="education-header">
          <div>
            <div class="institution">${edu.institution}</div>
            <div class="degree">${edu.degree} in ${edu.field}</div>
          </div>
          <div class="date">${edu.startDate} - ${edu.endDate || 'Present'}</div>
        </div>
        ${edu.gpa ? `<div class="description">GPA: ${edu.gpa}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
  
  ${skills.length > 0 ? `
  <div class="section">
    <h2 class="section-title">Skills</h2>
    <div class="skills-grid">
      ${skills.map(skill => `
        <div class="skill-item">
          <span class="skill-name">${skill.name}</span>
          <div class="skill-level">
            ${Array.from({ length: 5 }, (_, i) => 
              `<div class="skill-dot ${i < skill.level ? 'filled' : ''}"></div>`
            ).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  ` : ''}
</body>
</html>
  `
}

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    try {
      const data: ResumeRequestData = await request.json()
      
      // Validate required data
      if (!data.resumeData?.personalInfo?.name) {
        return new Response(
          JSON.stringify({ error: 'Personal information with name is required' }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }

      // Launch browser
      const browser = await puppeteer.launch(env.BROWSER)
      const page = await browser.newPage()

      // Generate HTML content
      const htmlContent = generateResumeHTML(data)
      
      // Set content and wait for fonts
      await page.setContent(htmlContent)
      await page.evaluate(() => document.fonts.ready)

      // Generate PDF
      const pdf = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in'
        }
      })

      // Close browser
      await browser.close()

      // Generate filename
      const name = data.resumeData.personalInfo.name
      const filename = `${name.replace(/\s+/g, '_')}_resume.pdf`

      // Return PDF
      return new Response(pdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Access-Control-Allow-Origin': '*',
        },
      })

    } catch (error) {
      console.error('PDF generation error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to generate PDF' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  },
} 