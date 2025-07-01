"use client"
import { useResumeStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ExperienceFormProps {
  experience?: {
    id: string
    position: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string[]
  }
  onClose?: () => void
}

interface ExperienceFormState {
  position: string
  company: string
  location: string
  startDate: string
  endDate: string
  descriptions: string[]
}

export default function ExperienceForm({ experience, onClose }: ExperienceFormProps) {
  const { addExperience, updateExperience } = useResumeStore()
  const [form, setForm] = useState<ExperienceFormState>({
    position: experience?.position || '',
    company: experience?.company || '',
    location: experience?.location || '',
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    descriptions: experience?.description?.length ? experience.description : [''],
  })

  useEffect(() => {
    if (experience) {
      setForm({
        position: experience.position,
        company: experience.company,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        descriptions: experience.description.length ? experience.description : [''],
      })
    } else {
      setForm({ position: '', company: '', location: '', startDate: '', endDate: '', descriptions: [''] })
    }
  }, [experience])

  function handleChange(field: keyof ExperienceFormState, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleDescriptionChange(idx: number, value: string) {
    setForm(f => ({
      ...f,
      descriptions: f.descriptions.map((desc, i) => (i === idx ? value : desc)),
    }))
  }

  function addDescriptionField() {
    setForm(f => ({ ...f, descriptions: [...f.descriptions, ''] }))
  }

  function removeDescriptionField(idx: number) {
    setForm(f => ({
      ...f,
      descriptions: f.descriptions.filter((_, i) => i !== idx),
    }))
  }

  function handleSubmit() {
    if (!form.position || !form.company) return
    
    if (experience) {
      updateExperience(experience.id, {
        position: form.position,
        company: form.company,
        location: form.location,
        startDate: form.startDate,
        endDate: form.endDate,
        description: form.descriptions.filter(d => d.trim() !== ''),
      })
    } else {
      addExperience({
        id: Date.now().toString(),
        position: form.position,
        company: form.company,
        location: form.location,
        startDate: form.startDate,
        endDate: form.endDate,
        description: form.descriptions.filter(d => d.trim() !== ''),
      })
    }
    onClose?.()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Input 
          placeholder="Job Title" 
          value={form.position} 
          onChange={e => handleChange('position', e.target.value)} 
        />
        <Input 
          placeholder="Company" 
          value={form.company} 
          onChange={e => handleChange('company', e.target.value)} 
        />
        <Input 
          placeholder="Location" 
          value={form.location} 
          onChange={e => handleChange('location', e.target.value)} 
        />
        <div className="flex gap-3">
          <Input 
            type="text" 
            placeholder="Start Date" 
            value={form.startDate} 
            onChange={e => handleChange('startDate', e.target.value)} 
            className="flex-1" 
          />
          <Input 
            type="text" 
            placeholder="End Date" 
            value={form.endDate} 
            onChange={e => handleChange('endDate', e.target.value)} 
            className="flex-1" 
          />
        </div>
        <div>
          <div className="font-medium mb-2 text-sm">Description (one bullet per line):</div>
          {form.descriptions.map((desc, idx) => (
            <div key={idx} className="flex items-start gap-2 mb-2">
              <Textarea
                placeholder={`Bullet point ${idx + 1}`}
                value={desc}
                onChange={e => handleDescriptionChange(idx, e.target.value)}
                className="flex-1 min-h-[60px] resize-none"
                rows={2}
                onInput={e => {
                  const target = e.currentTarget
                  target.style.height = 'auto'
                  target.style.height = Math.max(60, target.scrollHeight) + 'px'
                }}
                onPaste={e => {
                  const paste = e.clipboardData.getData('text')
                  const bulletRegex = /(?:^|\n)[\s\u2022\-\*]+/g
                  let points: string[] = []
                  if (paste.match(bulletRegex)) {
                    points = paste
                      .split(bulletRegex)
                      .map(s => s.trim())
                      .filter(Boolean)
                  } else if (paste.includes('\n\n')) {
                    points = paste.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
                  }
                  if (points.length > 1) {
                    e.preventDefault()
                    setForm(f => {
                      const before = f.descriptions.slice(0, idx)
                      const after = f.descriptions.slice(idx + 1)
                      return {
                        ...f,
                        descriptions: [
                          ...before,
                          ...points,
                          ...after,
                        ],
                      }
                    })
                  }
                }}
              />
              {form.descriptions.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeDescriptionField(idx)} 
                  type="button"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  ×
                </Button>
              )}
            </div>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addDescriptionField} 
            type="button"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            + Add bullet
          </Button>
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="button">
          {experience ? 'Save Changes' : 'Add Experience'}
        </Button>
      </div>
    </div>
  )
} 