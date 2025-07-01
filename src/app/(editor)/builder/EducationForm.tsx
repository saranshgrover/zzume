"use client"
import { useResumeStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface EducationFormProps {
  education?: {
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
  }
  onClose?: () => void
}

interface EducationFormState {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export default function EducationForm({ education, onClose }: EducationFormProps) {
  const { addEducation, updateEducation } = useResumeStore()
  const [form, setForm] = useState<EducationFormState>({
    institution: education?.institution || '',
    degree: education?.degree || '',
    field: education?.field || '',
    startDate: education?.startDate || '',
    endDate: education?.endDate || '',
  })

  useEffect(() => {
    if (education) {
      setForm({
        institution: education.institution,
        degree: education.degree,
        field: education.field,
        startDate: education.startDate,
        endDate: education.endDate,
      })
    } else {
      setForm({ institution: '', degree: '', field: '', startDate: '', endDate: '' })
    }
  }, [education])

  function handleChange(field: keyof EducationFormState, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSubmit() {
    if (!form.institution || !form.degree) return
    if (education) {
      updateEducation(education.id, form)
    } else {
      addEducation({
        id: Date.now().toString(),
        ...form,
      })
    }
    onClose?.()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Input 
          placeholder="School/University" 
          value={form.institution} 
          onChange={e => handleChange('institution', e.target.value)} 
        />
        <Input 
          placeholder="Degree" 
          value={form.degree} 
          onChange={e => handleChange('degree', e.target.value)} 
        />
        <Input 
          placeholder="Field of Study" 
          value={form.field} 
          onChange={e => handleChange('field', e.target.value)} 
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
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="button">
          {education ? 'Save Changes' : 'Add Education'}
        </Button>
      </div>
    </div>
  )
} 