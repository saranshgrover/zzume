'use client'
import { useResumeStore } from '@/lib/store'
import { useState, useEffect, useRef } from 'react'
import ResumeContent from './ResumeContent'
import { AlertTriangle } from 'lucide-react'

export default function ResumePreview() {
  const { resumeData, globalSettings } = useResumeStore()
  // Letter size: 816x1056px, 1in = 96px, so 1in margin = 96px
  // We'll scale the preview to fit 80vh max height
  // Calculate scale based on window height (client-side only)
  const [scale, setScale] = useState(1)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [overflowAmount, setOverflowAmount] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const measurementRef = useRef<HTMLDivElement>(null)
  
  
  
  useEffect(() => {
    function handleResize() {
      const maxHeight = window.innerHeight * 0.8
      const scaleVal = Math.min(1, maxHeight / 1056)
      setScale(scaleVal)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Check for overflow when content changes
  useEffect(() => {
    const checkOverflow = () => {
      if (measurementRef.current) {
        // Use the hidden measurement div to get accurate unscaled height
        const contentHeight = measurementRef.current.scrollHeight
        const availableContentHeight = 1056 
        setIsOverflowing(contentHeight > availableContentHeight)
        setOverflowAmount(contentHeight - availableContentHeight)
      } else {
      }
    }

    // Check immediately
    checkOverflow()
    
    // Check after a short delay to ensure content is rendered
    const timeoutId = setTimeout(checkOverflow, 100)
    
    // Check again after a longer delay to ensure all content is fully rendered
    const timeoutId2 = setTimeout(checkOverflow, 500)
    
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
    }
  }, [resumeData, globalSettings])

  return (
    <div className="w-full">
      {/* Hidden measurement div for accurate overflow detection */}
      <div 
        ref={measurementRef}
        className="absolute -left-[9999px] top-0 invisible"
        style={{ 
          width: 816, 
          height: 1056,
          // Ensure the measurement div has the same styling as the actual content container
          backgroundColor: 'white',
          boxSizing: 'border-box'
        }}
      >
        <ResumeContent 
          resumeData={resumeData} 
          globalSettings={globalSettings} 
          isPDF={false}
        />
      </div>
      
      {isOverflowing && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-yellow-800">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <div className="text-sm">
            <div className="font-medium">Resume may not fit on one page by {Math.round(overflowAmount)}px</div>
            <div className="text-yellow-700 mt-1">
              Consider: reducing text, removing items, or adjusting spacing in settings.
            </div>
          </div>
        </div>
      )}
      <div
        className="bg-white shadow-xl rounded border relative"
        style={{
          width: 816,
          height: 1056,
          minWidth: 816,
          minHeight: 1056,
          maxWidth: 816,
          maxHeight: 1056,
          overflow: 'hidden',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          boxSizing: 'border-box',
        }}
      >
        <div ref={contentRef} className="w-full h-full">
          <ResumeContent 
            resumeData={resumeData} 
            globalSettings={globalSettings} 
            isPDF={false}
          />
        </div>
      </div>
    </div>
  )
} 