import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export const dynamic = 'force-dynamic'

// Define proper types for the resume data
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let browser: any

async function getBrowser() {
  if (browser) return browser

  browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote',
      '--single-process'
    ],
    headless: true,
  })
  return browser
}

export async function POST(request: NextRequest) {
  console.log('🚀 PDF export request started')
  
  try {
    const { resumeData, globalSettings }: ResumeRequestData = await request.json()
    console.log('📄 Received resume data:', {
      hasPersonalInfo: !!resumeData.personalInfo,
      hasName: !!resumeData.personalInfo?.name,
      name: resumeData.personalInfo?.name,
      hasExperience: !!resumeData.experience?.length,
      hasEducation: !!resumeData.education?.length,
      hasSkills: !!resumeData.skills?.length
    })
    console.log('⚙️ Global settings:', globalSettings)
    
    // Validate required data
    if (!resumeData.personalInfo?.name) {
      console.log('❌ Validation failed: Missing personal info or name')
      return NextResponse.json(
        { error: 'Personal information with name is required' },
        { status: 400 }
      )
    }

    // Get browser instance using the new configuration
    console.log('🌐 Getting browser instance...')
    const browserInstance = await getBrowser()
    console.log('✅ Browser instance obtained')

    console.log('📄 Creating new page...')
    const page = await browserInstance.newPage()
    console.log('✅ New page created')
    
    // Set viewport for consistent rendering
    console.log('📐 Setting viewport...')
    await page.setViewport({ width: 1200, height: 1600 })
    console.log('✅ Viewport set to 1200x1600')
    
    // Set user agent for better font rendering
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    console.log('✅ User agent set')
    
    // Navigate to the PDF template route
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
    console.log('🌍 Base URL:', baseUrl)
    
    const pdfUrl = `${baseUrl}/pdf-template`
    console.log('🔗 PDF template URL:', pdfUrl)
    
    console.log('🌐 Navigating to PDF template...')
    await page.goto(pdfUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    })
    console.log('✅ Navigation completed')

    // Inject the data into the page using page.evaluate
    console.log('📝 Injecting resume data into page...')
    await page.evaluate((data: ResumeRequestData) => {
      // Store the data in window object so the page can access it
      (window as unknown as Record<string, unknown>).resumeData = data.resumeData
      ;(window as unknown as Record<string, unknown>).globalSettings = data.globalSettings
    }, { resumeData, globalSettings })
    console.log('✅ Data injected successfully')

    // Wait for the page to render with the data
    console.log('⏳ Waiting for page to render...')
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('✅ Page render wait completed')

    // Wait for fonts to load
    console.log('🔤 Waiting for fonts to load...')
    await page.evaluate(() => {
      return document.fonts.ready
    })
    console.log('✅ Fonts loaded')

    // Check if page loaded correctly
    const pageTitle = await page.title()
    console.log('📄 Page title:', pageTitle)
    
    const pageContent = await page.content()
    console.log('📄 Page content length:', pageContent.length)
    console.log('📄 Page content preview:', pageContent.substring(0, 200) + '...')

    // Generate PDF
    console.log('🖨️ Generating PDF...')
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0in',
        right: '0in',
        bottom: '0in',
        left: '0in'
      },
      preferCSSPageSize: true
    })
    console.log('✅ PDF generated, buffer size:', pdfBuffer.length)

    console.log('🔒 Closing page...')
    await page.close()
    console.log('✅ Page closed')

    // Generate filename from personal info
    const name = resumeData.personalInfo.name
    const filename = `${name.replace(/\s+/g, '_')}_resume.pdf`
    console.log('📁 Generated filename:', filename)

    // Return PDF with proper headers
    console.log('📤 Returning PDF response...')
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString()
      }
    })

  } catch (error) {
    console.error('PDF generation error:', error)
    
    // Check if it's a Chrome binary issue
    if (error instanceof Error && error.message.includes('Could not find Chrome')) {
      console.error('Chrome binary not found. This is likely a deployment environment issue.')
      return NextResponse.json(
        { 
          error: 'PDF generation service temporarily unavailable. Please try again later.',
          details: 'Chrome binary not found in deployment environment'
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
} 