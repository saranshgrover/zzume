import { create } from 'zustand'
import { TEMPLATE_DEFINITIONS, TemplateDefinition, TemplateSettings } from './templateGenerator'
import { useResumeStore } from './store'

interface TemplateStore {
  templates: TemplateDefinition[]
  selectedTemplate: string
  isTemplateDialogOpen: boolean
  isHydrated: boolean
  
  // Actions
  hydrate: () => void
  setSelectedTemplate: (templateId: string) => void
  applyTemplate: (templateId: string) => void
  setTemplateDialogOpen: (open: boolean) => void
  getCurrentTemplate: () => TemplateDefinition | undefined
  getTemplateSettings: (templateId: string) => TemplateSettings | undefined
}

// Load template state from localStorage
function loadTemplateState() {
  if (typeof window === 'undefined') return { selectedTemplate: 'minimal', isTemplateDialogOpen: false }
  
  const raw = localStorage.getItem('resume-template-state')
  if (raw) {
    try {
      const savedState = JSON.parse(raw)
      return {
        selectedTemplate: savedState.selectedTemplate || 'minimal',
        isTemplateDialogOpen: savedState.isTemplateDialogOpen || false
      }
    } catch {}
  }
  return { selectedTemplate: 'minimal', isTemplateDialogOpen: false }
}

// Save template state to localStorage
function saveTemplateState(state: { selectedTemplate: string; isTemplateDialogOpen: boolean }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('resume-template-state', JSON.stringify(state))
  }
}

// Convert TEMPLATE_DEFINITIONS to array format
const templateDefinitionsArray = Object.entries(TEMPLATE_DEFINITIONS).map(([id, template]) => ({
  id,
  ...template
}));

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: templateDefinitionsArray,
  selectedTemplate: 'minimal', // Default to minimal template
  isTemplateDialogOpen: false,
  isHydrated: false,
  
  hydrate: () => {
    if (typeof window !== 'undefined') {
      const savedState = loadTemplateState()
      set({
        selectedTemplate: savedState.selectedTemplate,
        isTemplateDialogOpen: savedState.isTemplateDialogOpen,
        isHydrated: true
      })
    }
  },
  
  setSelectedTemplate: (templateId: string) => {
    set({ selectedTemplate: templateId })
    saveTemplateState({ 
      selectedTemplate: templateId, 
      isTemplateDialogOpen: get().isTemplateDialogOpen 
    })
  },
  
  applyTemplate: (templateId: string) => {
    const template = TEMPLATE_DEFINITIONS[templateId as keyof typeof TEMPLATE_DEFINITIONS]
    if (!template) return
    
    // Get the resume store
    const resumeStore = useResumeStore.getState()
    
    // For now, we'll use default settings since the new structure has field configs, not values
    // TODO: Implement proper template application with default values
    const defaultSettings = {
      margin: {
        top: 48,
        bottom: 48,
        left: 48,
        right: 48
      },
      typography: {
        heading: {
          fontFamily: 'Inter, sans-serif',
          fontSize: 24
        },
        body: {
          fontFamily: 'Inter, sans-serif',
          fontSize: 14
        },
        subheading: {
          fontFamily: 'Inter, sans-serif',
          fontSize: 18
        },
        sectionHeading: {
          fontFamily: 'Inter, sans-serif',
          fontSize: 14
        }
      },
      spacing: {
        sectionHeading: {
          top: 24,
          bottom: 12
        },
        listItem: {
          bottom: 12
        },
        list: {
          bottom: 20
        },
        descriptionList: {
          spacing: 8
        },
        header: {
          bottom: 16
        }
      },
      colors: {
        primary: '#000000',
        secondary: '#333333'
      },
      layout: {
        headerStyle: 'minimal' as const,
        compactSpacing: false
      }
    }
    
    resumeStore.setGlobalSettings(defaultSettings)
    
    set({ selectedTemplate: templateId })
    saveTemplateState({ 
      selectedTemplate: templateId, 
      isTemplateDialogOpen: get().isTemplateDialogOpen 
    })
  },
  
  setTemplateDialogOpen: (open: boolean) => {
    set({ isTemplateDialogOpen: open })
    saveTemplateState({ 
      selectedTemplate: get().selectedTemplate, 
      isTemplateDialogOpen: open 
    })
  },
  
  getCurrentTemplate: () => {
    const { selectedTemplate } = get()
    return TEMPLATE_DEFINITIONS[selectedTemplate as keyof typeof TEMPLATE_DEFINITIONS]
  },
  
  getTemplateSettings: (templateId: string) => {
    const template = TEMPLATE_DEFINITIONS[templateId as keyof typeof TEMPLATE_DEFINITIONS]
    return template?.settings as any
  }
})) 