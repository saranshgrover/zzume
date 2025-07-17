// Import generated types from templateGenerator.ts
import { 
  ProfessionalSettings, 
  CreativeSettings, 
  MinimalSettings, 
  TemplateSettings,
  TEMPLATE_DEFINITIONS 
} from './templateGenerator'

// Template registry for runtime use
export const TEMPLATE_NAMES = ['professional', 'creative', 'minimal'] as const
export type TemplateName = typeof TEMPLATE_NAMES[number]

// Template definition
export interface ResumeTemplate {
  id: string
  name: string
  description: string
  category: 'professional' | 'creative' | 'minimal' | 'academic'
  preview: string // URL to preview image
  settings: TemplateSettings
  data: {
    personalInfo: {
      name: string
      email: string
      phone: string
      location: string
      summary: string
      linkedin?: string
      portfolio?: string
    }
    experience: Array<{
      id: string
      company: string
      position: string
      location: string
      startDate: string
      endDate: string
      description: string[]
    }>
    education: Array<{
      id: string
      institution: string
      degree: string
      field: string
      startDate: string
      endDate: string
      gpa?: string
      honors?: string
    }>
    skills: string[]
    sectionOrder: string[]
    sectionNames: Record<string, string>
  }
}

// Template categories for filtering
export type TemplateCategory = 'professional' | 'creative' | 'minimal' | 'academic'

//
// Type-safe field configuration
export type FieldType = 'slider' | 'select' | 'color' | 'checkbox';

// Validation function to ensure settings structure compatibility
export function validateTemplateSettings(settings: TemplateSettings): settings is TemplateSettings {
  const baseFields = ['margin', 'typography', 'spacing', 'colors', 'layout'] as const;
  
  for (const field of baseFields) {
    if (!(field in settings)) {
      return false;
    }
  }
  
  return true;
}

 