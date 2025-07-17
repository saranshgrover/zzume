'use client'

import { useEffect } from 'react'
import { useResumeStore } from '@/lib/store'
import { useTemplateStore } from '@/lib/templateStore'

export function HydrationProvider({ children }: { children: React.ReactNode }) {
  const hydrateResume = useResumeStore((state) => state.hydrate)
  const hydrateTemplate = useTemplateStore((state) => state.hydrate)

  useEffect(() => {
    hydrateResume()
    hydrateTemplate()
  }, [hydrateResume, hydrateTemplate])

  return <>{children}</>
} 