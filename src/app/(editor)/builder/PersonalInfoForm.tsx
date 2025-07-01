"use client"
import { useResumeStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface PersonalInfoFormProps {
  onClose?: () => void
}

interface PersonalInfoFormState {
  name: string
  email: string
  phone: string
  location: string
  summary: string
  linkedin: string
  portfolio: string
}

export default function PersonalInfoForm({ onClose }: PersonalInfoFormProps) {
  const { resumeData, updatePersonalInfo } = useResumeStore()
  const [form, setForm] = useState<PersonalInfoFormState>({
    name: resumeData.personalInfo.name || '',
    email: resumeData.personalInfo.email || '',
    phone: resumeData.personalInfo.phone || '',
    location: resumeData.personalInfo.location || '',
    summary: resumeData.personalInfo.summary || '',
    linkedin: resumeData.personalInfo.linkedin || '',
    portfolio: resumeData.personalInfo.portfolio || '',
  })

  useEffect(() => {
    setForm({
      name: resumeData.personalInfo.name || '',
      email: resumeData.personalInfo.email || '',
      phone: resumeData.personalInfo.phone || '',
      location: resumeData.personalInfo.location || '',
      summary: resumeData.personalInfo.summary || '',
      linkedin: resumeData.personalInfo.linkedin || '',
      portfolio: resumeData.personalInfo.portfolio || '',
    })
  }, [resumeData.personalInfo])

  function handleChange(field: keyof PersonalInfoFormState, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSave() {
    updatePersonalInfo(form)
    onClose?.()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input 
          placeholder="Full Name" 
          value={form.name} 
          onChange={e => handleChange('name', e.target.value)} 
        />
        <Input 
          placeholder="Email" 
          type="email"
          value={form.email} 
          onChange={e => handleChange('email', e.target.value)} 
        />
        <Input 
          placeholder="Phone" 
          value={form.phone} 
          onChange={e => handleChange('phone', e.target.value)} 
        />
        <Input 
          placeholder="Location (City, State)" 
          value={form.location} 
          onChange={e => handleChange('location', e.target.value)} 
        />
        <Input 
          placeholder="LinkedIn URL" 
          type="url"
          value={form.linkedin} 
          onChange={e => handleChange('linkedin', e.target.value)} 
        />
        <Input 
          placeholder="Portfolio URL" 
          type="url"
          value={form.portfolio} 
          onChange={e => handleChange('portfolio', e.target.value)} 
        />
        <div>
          <div className="font-medium mb-1">Professional Summary</div>
          <Textarea
            placeholder="Brief professional summary or objective..."
            value={form.summary}
            onChange={e => handleChange('summary', e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button onClick={handleSave} type="button">
          Save Changes
        </Button>
      </div>
    </div>
  )
} 