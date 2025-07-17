'use client'

import { Suspense, useEffect, useState } from 'react'
import ResumeContent from '@/components/ResumeContent'
import { ResumeData, GlobalSettings } from '@/lib/store'


function PDFTemplateContent({ resumeData, globalSettings }: { 
  resumeData: ResumeData
  globalSettings: GlobalSettings 
}) {
  return (
    <div className="w-full">
      <div
        className="bg-white"
        style={{
          width: 816,
          height: 1056,
          minWidth: 816,
          minHeight: 1056,
          maxWidth: 816,
          maxHeight: 1056,
          overflow: 'hidden',
          transformOrigin: 'top center',
          boxSizing: 'border-box',
        }}
      >
        <main className="w-full h-full">
          <ResumeContent 
            resumeData={resumeData} 
            globalSettings={globalSettings} 
            isPDF={true}
          />
        </main>
      </div>
    </div>
  )
}

export default function PDFTemplate() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if data is available in window object (injected by Puppeteer)
    const checkForData = () => {
      const windowAny = window as unknown as Record<string, unknown>
      if (windowAny.resumeData && windowAny.globalSettings) {
        setResumeData(windowAny.resumeData as ResumeData)
        setGlobalSettings(windowAny.globalSettings as GlobalSettings)
        setIsLoading(false)
      } else {
        // If no data found, try again after a short delay
        setTimeout(checkForData, 100)
      }
    }

    checkForData()
  }, [])

  // Don't render anything until we have data
  if (isLoading || !resumeData || !globalSettings) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {resumeData?.personalInfo?.name ? `${resumeData.personalInfo.name} Resume` : 'Resume PDF Template'}
          </h1>
          <p className="text-gray-600">Loading resume data...</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {resumeData?.personalInfo?.name ? `${resumeData.personalInfo.name} Resume` : 'Resume PDF Template'}
          </h1>
          <p className="text-gray-600">Loading resume data...</p>
        </div>
      </div>
    }>
      <PDFTemplateContent resumeData={resumeData} globalSettings={globalSettings} />
    </Suspense>
  )
} 