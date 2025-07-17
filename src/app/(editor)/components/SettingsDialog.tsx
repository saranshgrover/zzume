'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResumeStore, GlobalSettings } from '@/lib/store';
import { useTemplateStore } from '@/lib/templateStore';
import { 
  getSettingsStructure, 
  getNestedValue, 
  setNestedValue, 
  fieldExists,
  fontFamilies,
  fontSizes,
  headerStyles,
  skillStyles,
  backgroundPatterns
} from '@/lib/settingsConfig';
import { useState, useEffect } from 'react';
import { Settings, ChevronDown, Type, Palette, Layout, Ruler } from 'lucide-react';
import { TEMPLATE_DEFINITIONS } from '@/lib/templateGenerator';

function Select({ value, onValueChange, options, placeholder }: {
  value: string | number;
  onValueChange: (value: string | number) => void;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.select-dropdown')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative select-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto transform translate-z-0">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md focus:outline-none focus:bg-gray-50"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SettingsDialog() {
  const { globalSettings, setGlobalSettings } = useResumeStore();
  const { selectedTemplate, getCurrentTemplate } = useTemplateStore();
  const [open, setOpen] = useState(false);

  const currentTemplate = getCurrentTemplate();
  const templateKey = selectedTemplate as keyof typeof TEMPLATE_DEFINITIONS;
  const settingsStructure = getSettingsStructure(templateKey);

  // Debug logging
  console.log('Selected template:', selectedTemplate);
  console.log('Template key:', templateKey);
  console.log('Settings structure:', settingsStructure);
  console.log('Available templates:', Object.keys(TEMPLATE_DEFINITIONS));

  const updateSettings = (path: string, value: string | number | boolean) => {
    const newSettings = setNestedValue(globalSettings, path, value);
    setGlobalSettings(newSettings);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Render a single field based on its type
  const renderField = (field: any, fieldPath: string) => {
    const value = getNestedValue(globalSettings, fieldPath);
    
    console.log(`Rendering field ${fieldPath}:`, { value, field, globalSettings });
    
    if (value === undefined) {
      console.log(`Field ${fieldPath} has undefined value, skipping`);
      return null;
    }

    switch (field.type) {
      case 'slider':
        return (
          <div key={fieldPath}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{fieldPath.split('.').pop()}</label>
            <div className="flex items-center gap-3">
              <Slider 
                min={field.min} 
                max={field.max} 
                step={field.step} 
                value={[value]} 
                onValueChange={([v]) => updateSettings(fieldPath, v)} 
                className="flex-1" 
              />
              <Input
                type="number"
                value={value}
                onChange={(e) => updateSettings(fieldPath, parseInt(e.target.value) || 0)}
                className="w-16 text-center"
                min={field.min}
                max={field.max}
              />
            </div>
          </div>
        );

      case 'select':
        let options: Array<{ value: string | number; label: string }> = [];
        if (field.options === 'fontFamilies') {
          options = fontFamilies;
        } else if (field.options === 'fontSizes') {
          options = fontSizes;
        } else if (field.options === 'headerStyles') {
          options = headerStyles as unknown as Array<{ value: string | number; label: string }>;
        } else if (field.options === 'skillStyles') {
          options = skillStyles as unknown as Array<{ value: string | number; label: string }>;
        } else if (field.options === 'backgroundPatterns') {
          options = backgroundPatterns as unknown as Array<{ value: string | number; label: string }>;
        }

        return (
          <div key={fieldPath}>
            <label className="block text-xs text-gray-600 mb-1">{fieldPath.split('.').pop()}</label>
            <Select
              value={value}
              onValueChange={(val) => updateSettings(fieldPath, val)}
              options={options}
              placeholder="Select option"
            />
          </div>
        );

      case 'color':
        return (
          <div key={fieldPath}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{fieldPath.split('.').pop()}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value}
                onChange={(e) => updateSettings(fieldPath, e.target.value)}
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <Input
                value={value}
                onChange={(e) => updateSettings(fieldPath, e.target.value)}
                className="flex-1"
                placeholder="#000000"
              />
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div key={fieldPath}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{fieldPath.split('.').pop()}</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => updateSettings(fieldPath, e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Enable {fieldPath.split('.').pop()?.toLowerCase()}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Helper function to flatten nested settings structure
  const flattenSettings = (obj: any, prefix = ''): Array<{ path: string; config: any }> => {
    const result: Array<{ path: string; config: any }> = [];
    
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      
      if (value && typeof value === 'object' && 'type' in value) {
        // This is a field configuration
        result.push({ path: currentPath, config: value });
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        // This is a nested object, recurse
        result.push(...flattenSettings(value, currentPath));
      }
    }
    
    return result;
  };

  // Get all sections from settings structure
  const sections = Object.entries(settingsStructure).map(([sectionName, sectionConfig]) => ({
    name: sectionName,
    config: sectionConfig,
    fields: flattenSettings(sectionConfig, sectionName)
  }));

  // Debug logging for sections
  console.log('Sections:', sections);
  sections.forEach(section => {
    console.log(`Section ${section.name}:`, section.fields.length, 'fields');
    section.fields.forEach(field => {
      console.log(`  Field ${field.path}:`, field.config);
    });
  });

  const getSectionIcon = (sectionName: string) => {
    switch (sectionName) {
      case 'typography': return <Type className="w-4 h-4" />;
      case 'colors': return <Palette className="w-4 h-4" />;
      case 'layout': return <Layout className="w-4 h-4" />;
      case 'margin': return <Ruler className="w-4 h-4" />;
      case 'spacing': return <Ruler className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getSectionTitle = (sectionName: string) => {
    return sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-gray-100 transition ml-2" aria-label="Settings">
          <Settings className="w-5 h-5 text-gray-700" />
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="w-[95vw] max-w-none max-h-[90vh] overflow-y-auto bg-gray-50"
        style={{ width: '95vw', maxWidth: 'none', margin: '0 auto', padding: "2rem", zIndex: 50 }}
      >
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="w-5 h-5" />
            Document Settings
          </DialogTitle>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-600">Customize your resume appearance</p>
            {currentTemplate && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Template: {currentTemplate.name}
              </span>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {sections.map((section) => (
            <Card key={section.name} className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  {getSectionIcon(section.name)}
                  {getSectionTitle(section.name)} Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {section.fields.map(({ path, config }) => 
                    renderField(config, path)
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 bg-white -mx-6 -mb-6 px-6 py-4">
          <Button onClick={handleClose} className="px-6 bg-blue-600 hover:bg-blue-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 