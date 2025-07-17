import { 
  GlobalSettings
} from './store';
import { TEMPLATE_DEFINITIONS, TemplateDefinition } from './templateGenerator';

// Font options - moved to templateGenerator.ts to avoid duplication
export const fontFamilies = [
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Lato, sans-serif', label: 'Lato' },
];

export const fontSizes = [
  { value: 10, label: '10px' },
  { value: 12, label: '12px' },
  { value: 14, label: '14px' },
  { value: 16, label: '16px' },
  { value: 18, label: '18px' },
  { value: 20, label: '20px' },
  { value: 24, label: '24px' },
  { value: 28, label: '28px' },
  { value: 32, label: '32px' },
];

// Layout options
export const headerStyles = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'centered', label: 'Centered' },
  { value: 'left-aligned', label: 'Left Aligned' },
  { value: 'creative', label: 'Creative' },
] as const;

export const skillStyles = [
  { value: 'list', label: 'List' },
  { value: 'tags', label: 'Tags' },
  { value: 'bars', label: 'Progress Bars' },
] as const;

export const backgroundPatterns = [
  { value: 'none', label: 'None' },
  { value: 'dots', label: 'Dots' },
  { value: 'lines', label: 'Lines' },
] as const;

type SectionConfig = {
  icon: any;
  title: string;
  color: string;
  description?: string;
  fields: any[];
};

// Automatically generated settings structure from template definitions
export function getSettingsStructure(templateName: keyof typeof TEMPLATE_DEFINITIONS = 'professional'): TemplateDefinition['settings'] {
  return TEMPLATE_DEFINITIONS[templateName].settings;
}

// Type-safe helper functions
export function getNestedValue<T extends GlobalSettings>(obj: T, path: string): any {
  return path.split('.').reduce((current: any, key) => current?.[key], obj);
}

export function setNestedValue<T extends GlobalSettings>(obj: T, path: string, value: any): T {
  const keys = path.split('.');
  const newObj = { ...obj } as T;
  let current = newObj as any;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  return newObj;
}

export function fieldExists<T extends GlobalSettings>(settings: T, path: string): boolean {
  return getNestedValue(settings, path) !== undefined;
} 