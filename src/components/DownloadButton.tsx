'use client'

import { useResumeStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useState } from 'react'

export default function DownloadButton() {
  const { resumeData, globalSettings } = useResumeStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    if (!resumeData.personalInfo.name) {
      alert('Please add your name to the personal information section first.')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData, globalSettings }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      // Get the filename from the response headers
      const contentDisposition = response.headers.get('Content-Disposition')
      const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || 'resume.pdf'

      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download PDF. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleDownload} 
      disabled={isLoading || !resumeData.personalInfo.name}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      <Download className="w-4 h-4 mr-2" />
      {isLoading ? 'Generating PDF...' : 'Download PDF'}
    </Button>
  )
} 