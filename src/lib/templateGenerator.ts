export interface FieldConfig {
  type: 'slider' | 'select' | 'color' | 'checkbox'
  min?: number
  max?: number
  step?: number
  options?: string
}

export type NestedFieldConfig = {
  [key: string]: FieldConfig | NestedFieldConfig
}


export interface TemplateDefinition {
  id?: string
  name: string
  description: string
  category: string
  settings: Record<string, NestedFieldConfig>
}
export const TEMPLATE_DEFINITIONS: Record<string, TemplateDefinition> = {
  professional: {
    name: 'Professional',
    description: 'Clean and traditional resume template',
    category: 'professional' as const,
    settings: {
      margin: {
        top: { type: 'slider', min: 24, max: 144, step: 4 },
        bottom: { type: 'slider', min: 24, max: 144, step: 4 },
        left: { type: 'slider', min: 24, max: 144, step: 4 },
        right: { type: 'slider', min: 24, max: 144, step: 4 },
      },
      typography: {
        heading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        body: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        subheading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        sectionHeading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
      },
      spacing: {
        sectionHeading: {
          top: { type: 'slider', min: 0, max: 48, step: 4 },
          bottom: { type: 'slider', min: 0, max: 48, step: 4 },
        },
        listItem: {
          bottom: { type: 'slider', min: 0, max: 24, step: 2 },
        },
        list: {
          bottom: { type: 'slider', min: 0, max: 32, step: 2 },
        },
        descriptionList: {
          spacing: { type: 'slider', min: 0, max: 16, step: 2 },
        },
        header: {
          bottom: { type: 'slider', min: 0, max: 24, step: 2 },
        },
      },
      colors: {
        primary: { type: 'color' },
        secondary: { type: 'color' },
        accent: { type: 'color' },
      },
      layout: {
        headerStyle: { type: 'select', options: 'headerStyles' },
        sectionDividers: { type: 'checkbox' },
      },
    },
  },
  creative: {
    name: 'Creative',
    description: 'Modern and creative resume template',
    category: 'creative' as const,
    settings: {
      margin: {
        top: { type: 'slider', min: 24, max: 144, step: 4 },
        bottom: { type: 'slider', min: 24, max: 144, step: 4 },
        left: { type: 'slider', min: 24, max: 144, step: 4 },
        right: { type: 'slider', min: 24, max: 144, step: 4 },
      },
      typography: {
        heading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        body: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        subheading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        sectionHeading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
      },
      spacing: {
        sectionHeading: {
          top: { type: 'slider', min: 0, max: 48, step: 4 },
          bottom: { type: 'slider', min: 0, max: 48, step: 4 },
        },
        listItem: {
          bottom: { type: 'slider', min: 0, max: 24, step: 2 },
        },
        list: {
          bottom: { type: 'slider', min: 0, max: 32, step: 2 },
        },
        descriptionList: {
          spacing: { type: 'slider', min: 0, max: 16, step: 2 },
        },
        header: {
          bottom: { type: 'slider', min: 0, max: 24, step: 2 },
        },
      },
      colors: {
        primary: { type: 'color' },
        secondary: { type: 'color' },
        accent: { type: 'color' },
      },
      layout: {
        headerStyle: { type: 'select', options: 'headerStyles' },
        backgroundPattern: { type: 'select', options: 'backgroundPatterns' },
        skillStyle: { type: 'select', options: 'skillStyles' },
      },
    },
  },
  minimal: {
    name: 'Minimal',
    description: 'Simple and clean resume template',
    category: 'minimal' as const,
    settings: {
      margin: {
        top: { type: 'slider', min: 24, max: 144, step: 4 },
        bottom: { type: 'slider', min: 24, max: 144, step: 4 },
        left: { type: 'slider', min: 24, max: 144, step: 4 },
        right: { type: 'slider', min: 24, max: 144, step: 4 },
      },
      typography: {
        heading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        body: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        subheading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        sectionHeading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
      },
      spacing: {
        sectionHeading: {
          top: { type: 'slider', min: 0, max: 48, step: 4 },
          bottom: { type: 'slider', min: 0, max: 48, step: 4 },
        },
        listItem: {
          bottom: { type: 'slider', min: 0, max: 24, step: 2 },
        },
        list: {
          bottom: { type: 'slider', min: 0, max: 32, step: 2 },
        },
        descriptionList: {
          spacing: { type: 'slider', min: 0, max: 16, step: 2 },
        },
        header: {
          bottom: { type: 'slider', min: 0, max: 24, step: 2 },
        },
      },
      colors: {
        primary: { type: 'color' },
        secondary: { type: 'color' },
      },
      layout: {
        headerStyle: { type: 'select', options: 'headerStyles' },
        compactSpacing: { type: 'checkbox' },
      },
    },
  },
  academic: {
    name: 'Academic',
    description: 'Scholarly and research-focused resume template',
    category: 'academic' as const,
    settings: {
      margin: {
        top: { type: 'slider', min: 24, max: 144, step: 4 },
        bottom: { type: 'slider', min: 24, max: 144, step: 4 },
        left: { type: 'slider', min: 24, max: 144, step: 4 },
        right: { type: 'slider', min: 24, max: 144, step: 4 },
      },
      typography: {
        heading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        body: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        subheading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
        sectionHeading: {
          fontFamily: { type: 'select', options: 'fontFamilies' },
          fontSize: { type: 'select', options: 'fontSizes' },
        },
      },
      spacing: {
        sectionHeading: {
          top: { type: 'slider', min: 0, max: 48, step: 4 },
          bottom: { type: 'slider', min: 0, max: 48, step: 4 },
        },
        listItem: {
          bottom: { type: 'slider', min: 0, max: 24, step: 2 },
        },
        list: {
          bottom: { type: 'slider', min: 0, max: 32, step: 2 },
        },
        descriptionList: {
          spacing: { type: 'slider', min: 0, max: 16, step: 2 },
        },
        header: {
          bottom: { type: 'slider', min: 0, max: 24, step: 2 },
        },
      },
      colors: {
        primary: { type: 'color' },
        secondary: { type: 'color' },
      },
      layout: {
        headerStyle: { type: 'select', options: 'headerStyles' },
        compactSpacing: { type: 'checkbox' },
        publicationStyle: { type: 'select', options: 'publicationStyles' },
      },
    },
  },
} as const

export interface BaseSettings {
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

export interface ProfessionalSettings extends BaseSettings {
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  layout: {
    headerStyle: 'centered' | 'left-aligned'
    sectionDividers: boolean
  }
}

export interface CreativeSettings extends BaseSettings {
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  layout: {
    headerStyle: 'creative' | 'minimal'
    backgroundPattern: 'none' | 'dots' | 'lines'
    skillStyle: 'tags' | 'bars' | 'list'
  }
}

export interface MinimalSettings extends BaseSettings {
  colors: {
    primary: string
    secondary: string
  }
  layout: {
    headerStyle: 'minimal'
    compactSpacing: boolean
  }
}

export interface AcademicSettings extends BaseSettings {
  colors: {
    primary: string
    secondary: string
  }
  layout: {
    headerStyle: 'minimal'
    compactSpacing: boolean
    publicationStyle: 'apa' | 'mla' | 'chicago'
  }
}

export type TemplateSettings = ProfessionalSettings | CreativeSettings | MinimalSettings | AcademicSettings

