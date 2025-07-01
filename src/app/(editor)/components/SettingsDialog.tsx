'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResumeStore, GlobalSettings } from '@/lib/store';
import { useState, useEffect } from 'react';
import { Settings, Type, Ruler, ChevronDown, MoveVertical } from 'lucide-react';

const fontFamilies = [
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Lato, sans-serif', label: 'Lato' },
];

const fontSizes = [
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

function ResumeLayoutChart({ globalSettings }: { globalSettings: GlobalSettings }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center" style={{ width: '90%', height: '400px' }}>
      <h4 className="text-sm font-medium text-gray-900 mb-3">Layout Preview</h4>
      <div className="relative bg-gray-50 border-2 border-gray-300 rounded" style={{ width: '100%', height: '320px' }}>
        {/* Margins */}
        <div className="absolute inset-0 border-2 border-blue-200 m-2">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-100 px-2 py-1 rounded text-xs">
            Top: {globalSettings.margin.top}px
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-100 px-2 py-1 rounded text-xs">
            Bottom: {globalSettings.margin.bottom}px
          </div>
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 -rotate-90 bg-blue-100 px-2 py-1 rounded text-xs">
            Left: {globalSettings.margin.left}px
          </div>
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 rotate-90 bg-blue-100 px-2 py-1 rounded text-xs">
            Right: {globalSettings.margin.right}px
          </div>
          {/* Content area */}
          <div className="absolute inset-0 bg-white m-1">
            {/* Header */}
            <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center justify-center">
              <div className="text-base font-bold">Name</div>
            </div>
            {/* Section */}
            <div className="mt-4">
              <div className="h-6 bg-gray-200 mx-2 mb-2 flex items-center justify-center">
                <div className="text-sm font-semibold">Section Heading</div>
              </div>
              <div className="h-4 bg-gray-100 mx-2 mb-2"></div>
              <div className="h-4 bg-gray-100 mx-2 mb-2"></div>
            </div>
            {/* Another section */}
            <div className="mt-4">
              <div className="h-6 bg-gray-200 mx-2 mb-2 flex items-center justify-center">
                <div className="text-sm font-semibold">Section Heading</div>
              </div>
              <div className="h-4 bg-gray-100 mx-2 mb-2"></div>
              <div className="h-4 bg-gray-100 mx-2 mb-2"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Spacing indicators */}
      <div className="mt-3 space-y-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 rounded"></div>
          <span className="text-xs text-gray-600">Section spacing: {globalSettings.spacing.sectionHeading.top}px</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span className="text-xs text-gray-600">Item spacing: {globalSettings.spacing.listItem.bottom}px</span>
        </div>
      </div>
    </div>
  );
}

function TypographyChart({ globalSettings }: { globalSettings: GlobalSettings }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Typography Preview</h4>
      <div className="space-y-2">
        <div 
          className="font-bold border-b border-gray-200 pb-1"
          style={{ 
            fontFamily: globalSettings.typography.heading.fontFamily,
            fontSize: `${globalSettings.typography.heading.fontSize}px`
          }}
        >
          Heading ({globalSettings.typography.heading.fontSize}px)
        </div>
        <div 
          className="font-semibold border-b border-gray-200 pb-1"
          style={{ 
            fontFamily: globalSettings.typography.subheading.fontFamily,
            fontSize: `${globalSettings.typography.subheading.fontSize}px`
          }}
        >
          Subheading ({globalSettings.typography.subheading.fontSize}px)
        </div>
        <div 
          className="font-semibold border-b border-gray-200 pb-1"
          style={{ 
            fontFamily: globalSettings.typography.sectionHeading.fontFamily,
            fontSize: `${globalSettings.typography.sectionHeading.fontSize}px`
          }}
        >
          Section ({globalSettings.typography.sectionHeading.fontSize}px)
        </div>
        <div 
          className="text-gray-700"
          style={{ 
            fontFamily: globalSettings.typography.body.fontFamily,
            fontSize: `${globalSettings.typography.body.fontSize}px`
          }}
        >
          Body text ({globalSettings.typography.body.fontSize}px)
        </div>
      </div>
    </div>
  );
}

export default function SettingsDialog() {
  const { globalSettings, setGlobalSettings } = useResumeStore();
  const [open, setOpen] = useState(false);

  const updateSettings = (path: string, value: string | number) => {
    const keys = path.split('.');
    const newSettings = { ...globalSettings };
    let current: Record<string, unknown> = newSettings;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i] as keyof typeof current] as Record<string, unknown>;
    }
    current[keys[keys.length - 1]] = value;
    setGlobalSettings(newSettings);
  };

  const handleClose = () => {
    setOpen(false);
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
          <p className="text-sm text-gray-600 mt-1">Customize your resume layout and typography</p>
        </DialogHeader>
        
        <div className="grid grid-cols-[1fr_2fr] gap-6">
          {/* Left column - Controls */}
          <div className="space-y-6">
            {/* Margins Section */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Ruler className="w-4 h-4 text-blue-600" />
                  Margins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Top</label>
                    <div className="flex items-center gap-3">
                      <Slider 
                        min={24} 
                        max={144} 
                        step={4} 
                        value={[globalSettings.margin.top]} 
                        onValueChange={([v]) => updateSettings('margin.top', v)} 
                        className="flex-1" 
                      />
                      <Input
                        type="number"
                        value={globalSettings.margin.top}
                        onChange={(e) => updateSettings('margin.top', parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min={24}
                        max={144}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bottom</label>
                    <div className="flex items-center gap-3">
                      <Slider 
                        min={24} 
                        max={144} 
                        step={4} 
                        value={[globalSettings.margin.bottom]} 
                        onValueChange={([v]) => updateSettings('margin.bottom', v)} 
                        className="flex-1" 
                      />
                      <Input
                        type="number"
                        value={globalSettings.margin.bottom}
                        onChange={(e) => updateSettings('margin.bottom', parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min={24}
                        max={144}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Left</label>
                    <div className="flex items-center gap-3">
                      <Slider 
                        min={24} 
                        max={144} 
                        step={4} 
                        value={[globalSettings.margin.left]} 
                        onValueChange={([v]) => updateSettings('margin.left', v)} 
                        className="flex-1" 
                      />
                      <Input
                        type="number"
                        value={globalSettings.margin.left}
                        onChange={(e) => updateSettings('margin.left', parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min={24}
                        max={144}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Right</label>
                    <div className="flex items-center gap-3">
                      <Slider 
                        min={24} 
                        max={144} 
                        step={4} 
                        value={[globalSettings.margin.right]} 
                        onValueChange={([v]) => updateSettings('margin.right', v)} 
                        className="flex-1" 
                      />
                      <Input
                        type="number"
                        value={globalSettings.margin.right}
                        onChange={(e) => updateSettings('margin.right', parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min={24}
                        max={144}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Margins are in pixels (1 inch = 96px). Minimum 24px, maximum 144px.
                </div>
              </CardContent>
            </Card>

            {/* Spacing Section */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <MoveVertical className="w-4 h-4 text-green-600" />
                  Spacing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Heading Top</label>
                    <div className="flex items-center gap-3">
                      <Slider 
                        min={0} 
                        max={48} 
                        step={4} 
                        value={[globalSettings.spacing.sectionHeading.top]} 
                        onValueChange={([v]) => updateSettings('spacing.sectionHeading.top', v)} 
                        className="flex-1" 
                      />
                      <Input
                        type="number"
                        value={globalSettings.spacing.sectionHeading.top}
                        onChange={(e) => updateSettings('spacing.sectionHeading.top', parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min={0}
                        max={48}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Heading Bottom</label>
                    <div className="flex items-center gap-3">
                      <Slider 
                        min={0} 
                        max={24} 
                        step={2} 
                        value={[globalSettings.spacing.sectionHeading.bottom]} 
                        onValueChange={([v]) => updateSettings('spacing.sectionHeading.bottom', v)} 
                        className="flex-1" 
                      />
                      <Input
                        type="number"
                        value={globalSettings.spacing.sectionHeading.bottom}
                        onChange={(e) => updateSettings('spacing.sectionHeading.bottom', parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min={0}
                        max={24}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">List Item Bottom</label>
                    <div className="flex items-center gap-3">
                      <Slider 
                        min={0} 
                        max={24} 
                        step={2} 
                        value={[globalSettings.spacing.listItem.bottom]} 
                        onValueChange={([v]) => updateSettings('spacing.listItem.bottom', v)} 
                        className="flex-1" 
                      />
                      <Input
                        type="number"
                        value={globalSettings.spacing.listItem.bottom}
                        onChange={(e) => updateSettings('spacing.listItem.bottom', parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min={0}
                        max={24}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">List Bottom</label>
                    <div className="flex items-center gap-3">
                      <Slider 
                        min={0} 
                        max={32} 
                        step={2} 
                        value={[globalSettings.spacing.list.bottom]} 
                        onValueChange={([v]) => updateSettings('spacing.list.bottom', v)} 
                        className="flex-1" 
                      />
                      <Input
                        type="number"
                        value={globalSettings.spacing.list.bottom}
                        onChange={(e) => updateSettings('spacing.list.bottom', parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min={0}
                        max={32}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Header Bottom</label>
                    <div className="flex items-center gap-3">
                      <Slider 
                        min={0} 
                        max={24} 
                        step={2} 
                        value={[globalSettings.spacing.header?.bottom || 0]} 
                        onValueChange={([v]) => updateSettings('spacing.header.bottom', v)} 
                        className="flex-1" 
                      />
                      <Input
                        type="number"
                        value={globalSettings.spacing.header?.bottom || 0}
                        onChange={(e) => updateSettings('spacing.header.bottom', parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min={0}
                        max={24}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Spacing controls the gaps between elements. All values are in pixels.
                </div>
              </CardContent>
            </Card>

            {/* Typography Section */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Type className="w-4 h-4 text-purple-600" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Heading Typography */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Heading</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Family</label>
                      <Select
                        value={globalSettings.typography.heading.fontFamily}
                        onValueChange={(value) => updateSettings('typography.heading.fontFamily', value)}
                        options={fontFamilies}
                        placeholder="Select font"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Size</label>
                      <Select
                        value={globalSettings.typography.heading.fontSize}
                        onValueChange={(value) => updateSettings('typography.heading.fontSize', value)}
                        options={fontSizes}
                        placeholder="Select size"
                      />
                    </div>
                  </div>
                </div>

                {/* Subheading Typography */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Subheading</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Family</label>
                      <Select
                        value={globalSettings.typography.subheading.fontFamily}
                        onValueChange={(value) => updateSettings('typography.subheading.fontFamily', value)}
                        options={fontFamilies}
                        placeholder="Select font"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Size</label>
                      <Select
                        value={globalSettings.typography.subheading.fontSize}
                        onValueChange={(value) => updateSettings('typography.subheading.fontSize', value)}
                        options={fontSizes}
                        placeholder="Select size"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Heading Typography */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Section Heading</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Family</label>
                      <Select
                        value={globalSettings.typography.sectionHeading.fontFamily}
                        onValueChange={(value) => updateSettings('typography.sectionHeading.fontFamily', value)}
                        options={fontFamilies}
                        placeholder="Select font"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Size</label>
                      <Select
                        value={globalSettings.typography.sectionHeading.fontSize}
                        onValueChange={(value) => updateSettings('typography.sectionHeading.fontSize', value)}
                        options={fontSizes}
                        placeholder="Select size"
                      />
                    </div>
                  </div>
                </div>

                {/* Body Typography */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Body Text</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Family</label>
                      <Select
                        value={globalSettings.typography.body.fontFamily}
                        onValueChange={(value) => updateSettings('typography.body.fontFamily', value)}
                        options={fontFamilies}
                        placeholder="Select font"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Size</label>
                      <Select
                        value={globalSettings.typography.body.fontSize}
                        onValueChange={(value) => updateSettings('typography.body.fontSize', value)}
                        options={fontSizes}
                        placeholder="Select size"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Visual charts (wider) */}
          <div className="flex flex-col items-center">
            <ResumeLayoutChart globalSettings={globalSettings} />
            <div className="mt-8 w-4/5">
              <TypographyChart globalSettings={globalSettings} />
            </div>
          </div>
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