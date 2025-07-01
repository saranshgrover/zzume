import { create } from 'zustand'
import merge from 'lodash.merge'

export interface GlobalSettings {
  margin: {
    top: number
    bottom: number
    left: number
    right: number
  }
  typography: {
    heading: {
      fontFamily: string
      fontSize: number
    }
    body: {
      fontFamily: string
      fontSize: number
    }
    subheading: {
      fontFamily: string
      fontSize: number
    }
    sectionHeading: {
      fontFamily: string
      fontSize: number
    }
  }
  spacing: {
    sectionHeading: {
      top: number
      bottom: number
    }
    listItem: {
      bottom: number
    }
    list: {
      bottom: number
    }
    descriptionList: {
      spacing: number
    }
    header: {
      bottom: number
    }
  }
}

export interface ResumeData {
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
}

interface ResumeStore {
  resumeData: ResumeData
  globalSettings: GlobalSettings
  isHydrated: boolean
  hydrate: () => void
  setGlobalSettings: (settings: Partial<GlobalSettings>) => void
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void
  addExperience: (experience: ResumeData['experience'][0]) => void
  updateExperience: (id: string, experience: Partial<ResumeData['experience'][0]>) => void
  removeExperience: (id: string) => void
  reorderExperience: (items: ResumeData['experience']) => void
  addEducation: (education: ResumeData['education'][0]) => void
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void
  removeEducation: (id: string) => void
  reorderEducation: (items: ResumeData['education']) => void
  updateSkills: (skills: string[]) => void
  reorderSections: (sections: string[]) => void
}

const defaultSettings: GlobalSettings = {
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
      top: 24, // mt-6 = 24px
      bottom: 12  // mb-3 = 12px
    },
    listItem: {
      bottom: 12  // mb-3 = 12px
    },
    list: {
      bottom: 20 // mb-5 = 20px
    },
    descriptionList: {
      spacing: 8  // space-y-2 = 8px
    },
    header: {
      bottom: 16  // mb-4 = 16px
    }
  }
}

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  sectionOrder: ['personal', 'experience', 'education', 'skills']
}

function loadSettings(): GlobalSettings {
  const raw = localStorage.getItem('resume-global-settings')
  if (raw) {
    try {
      const savedSettings = JSON.parse(raw)
      // Ensure backward compatibility by merging with default settings
      return merge({}, defaultSettings, savedSettings)
    } catch {}
  }
  return defaultSettings
}

function loadResumeData(): ResumeData {
  const raw = localStorage.getItem('resume-data')
  if (raw) {
    try {
      const savedData = JSON.parse(raw)
      return merge({}, initialResumeData, savedData)
    } catch {}
  }
  return initialResumeData
}

function saveResumeData(data: ResumeData) {
  localStorage.setItem('resume-data', JSON.stringify(data))
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumeData: initialResumeData,
  globalSettings: defaultSettings,
  isHydrated: false,
  
  hydrate: () => {
    if (typeof window !== 'undefined') {
      set({
        resumeData: loadResumeData(),
        globalSettings: loadSettings(),
        isHydrated: true
      })
    }
  },

  setGlobalSettings: (settings) => {
    const newSettings = { ...get().globalSettings, ...settings }
    set({ globalSettings: newSettings })
    if (typeof window !== 'undefined') {
      localStorage.setItem('resume-global-settings', JSON.stringify(newSettings))
    }
  },
  
  updatePersonalInfo: (data) =>
    set((state) => {
      const newResumeData = {
        ...state.resumeData,
        personalInfo: { ...state.resumeData.personalInfo, ...data }
      }
      saveResumeData(newResumeData)
      return { resumeData: newResumeData }
    }),

  addExperience: (experience) =>
    set((state) => {
      const newResumeData = {
        ...state.resumeData,
        experience: [...state.resumeData.experience, experience]
      }
      saveResumeData(newResumeData)
      return { resumeData: newResumeData }
    }),

  updateExperience: (id, experience) =>
    set((state) => {
      const newResumeData = {
        ...state.resumeData,
        experience: state.resumeData.experience.map((exp) =>
          exp.id === id ? { ...exp, ...experience } : exp
        )
      }
      saveResumeData(newResumeData)
      return { resumeData: newResumeData }
    }),

  removeExperience: (id) =>
    set((state) => {
      const newResumeData = {
        ...state.resumeData,
        experience: state.resumeData.experience.filter((exp) => exp.id !== id)
      }
      saveResumeData(newResumeData)
      return { resumeData: newResumeData }
    }),

  reorderExperience: (items) => set((state) => {
    const newResumeData = { ...state.resumeData, experience: items }
    saveResumeData(newResumeData)
    return { resumeData: newResumeData }
  }),

  addEducation: (education) =>
    set((state) => {
      const newResumeData = {
        ...state.resumeData,
        education: [...state.resumeData.education, education]
      }
      saveResumeData(newResumeData)
      return { resumeData: newResumeData }
    }),

  updateEducation: (id, education) =>
    set((state) => {
      const newResumeData = {
        ...state.resumeData,
        education: state.resumeData.education.map((edu) =>
          edu.id === id ? { ...edu, ...education } : edu
        )
      }
      saveResumeData(newResumeData)
      return { resumeData: newResumeData }
    }),

  removeEducation: (id) =>
    set((state) => {
      const newResumeData = {
        ...state.resumeData,
        education: state.resumeData.education.filter((edu) => edu.id !== id)
      }
      saveResumeData(newResumeData)
      return { resumeData: newResumeData }
    }),

  reorderEducation: (items) => set((state) => {
    const newResumeData = { ...state.resumeData, education: items }
    saveResumeData(newResumeData)
    return { resumeData: newResumeData }
  }),

  updateSkills: (skills) =>
    set((state) => {
      const newResumeData = { ...state.resumeData, skills }
      saveResumeData(newResumeData)
      return { resumeData: newResumeData }
    }),

  reorderSections: (sections) => set((state) => {
    const newResumeData = { ...state.resumeData, sectionOrder: sections }
    saveResumeData(newResumeData)
    return { resumeData: newResumeData }
  })
})) 