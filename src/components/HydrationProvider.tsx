'use client'

import { useEffect } from 'react'
import { useResumeStore } from '@/lib/store'

export function HydrationProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useResumeStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return <>{children}</>
} 