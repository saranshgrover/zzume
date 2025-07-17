import { ResumeTemplate } from '../templateTypes'

// Professional Template
export const professionalTemplate: ResumeTemplate = {
  id: 'professional',
  name: 'Executive',
  description: 'Bold and professional for senior roles',
  category: 'professional',
  preview: '/templates/professional-preview.png',
  settings: {
    margin: {
      top: 48,
      bottom: 48,
      left: 48,
      right: 48
    },
    typography: {
      heading: {
        fontFamily: 'Georgia, serif',
        fontSize: 28
      },
      body: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 12
      },
      subheading: {
        fontFamily: 'Georgia, serif',
        fontSize: 16
      },
      sectionHeading: {
        fontFamily: 'Georgia, serif',
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
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#3b82f6'
    },
    layout: {
      headerStyle: 'centered',
      sectionDividers: true
    }
  },
  data: {
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
    sectionOrder: ['personal', 'experience', 'education', 'skills'],
    sectionNames: {
      personal: 'Professional Summary',
      experience: 'Professional Experience',
      education: 'Education',
      skills: 'Core Competencies'
    }
  }
}

// Creative Template
export const creativeTemplate: ResumeTemplate = {
  id: 'creative',
  name: 'Portfolio',
  description: 'Modern and creative for design roles',
  category: 'creative',
  preview: '/templates/creative-preview.png',
  settings: {
    margin: {
      top: 48,
      bottom: 48,
      left: 48,
      right: 48
    },
    typography: {
      heading: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 32
      },
      body: {
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 14
      },
      subheading: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 18
      },
      sectionHeading: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 16
      }
    },
    spacing: {
      sectionHeading: {
        top: 32,
        bottom: 16
      },
      listItem: {
        bottom: 16
      },
      list: {
        bottom: 24
      },
      descriptionList: {
        spacing: 12
      },
      header: {
        bottom: 20
      }
    },
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#ff6b6b'
    },
    layout: {
      headerStyle: 'creative',
      backgroundPattern: 'dots',
      skillStyle: 'tags'
    }
  },
  data: {
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
    sectionOrder: ['personal', 'experience', 'education', 'skills'],
    sectionNames: {
      personal: 'About',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills & Tools'
    }
  }
}

// Minimal Template
export const minimalTemplate: ResumeTemplate = {
  id: 'minimal',
  name: 'Clean',
  description: 'Simple and clean for any industry',
  category: 'minimal',
  preview: '/templates/minimal-preview.png',
  settings: {
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
      headerStyle: 'minimal',
      compactSpacing: false
    }
  },
  data: {
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
    sectionOrder: ['personal', 'experience', 'education', 'skills'],
    sectionNames: {
      personal: 'Personal Info',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills'
    }
  }
}

// Export all templates
export const templates: ResumeTemplate[] = [
  professionalTemplate,
  creativeTemplate,
  minimalTemplate
]

// Helper function to get template by ID
export function getTemplateById(id: string): ResumeTemplate | undefined {
  return templates.find(template => template.id === id)
}

// Helper function to get templates by category
export function getTemplatesByCategory(category: string): ResumeTemplate[] {
  return templates.filter(template => template.category === category)
} 