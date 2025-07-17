'use client'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTemplateStore } from '@/lib/templateStore'
import { TemplateCategory } from '@/lib/templateTypes'
import { Palette, Briefcase, Sparkles, FileText } from 'lucide-react'

const categoryIcons = {
  professional: Briefcase,
  creative: Palette,
  minimal: FileText,
  academic: Sparkles
}

const categoryLabels = {
  professional: 'Professional',
  creative: 'Creative',
  minimal: 'Minimal',
  academic: 'Academic'
}

export default function TemplateSelector() {
  const { templates, selectedTemplate, applyTemplate, isTemplateDialogOpen, setTemplateDialogOpen } = useTemplateStore()
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all')

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const handleTemplateSelect = (templateId: string) => {
    applyTemplate(templateId)
    setTemplateDialogOpen(false)
  }

  return (
    <Dialog open={isTemplateDialogOpen} onOpenChange={setTemplateDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Palette className="w-4 h-4" />
          Change Template
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-6xl h-[90vh] max-h-[800px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <DialogHeader>
              <DialogTitle>Choose a Template</DialogTitle>
              <p className="text-sm text-gray-600">
                Select a template to change the look and feel of your resume
              </p>
            </DialogHeader>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Templates
              </Button>
              {Object.entries(categoryLabels).map(([category, label]) => {
                const Icon = categoryIcons[category as TemplateCategory]
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category as TemplateCategory)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Template Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => {
                const Icon = categoryIcons[template.category]
                const isSelected = selectedTemplate === template.id
                
                return (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md hover:scale-105 ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent className="p-4 flex flex-col justify-between gap-4">
                        {/* Preview Area */}
                          <div className="w-full h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">{template.name}</p>
                            </div>
                          </div>
                        
                        {/* Template Info */}
                        <div className="flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-sm truncate">{template.name}</h3>
                              {isSelected && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex-shrink-0">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-3">{template.description}</p>
                          
                          </div>
                          
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* No templates found */}
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <Palette className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No templates found for this category.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available</span>
              <span>Click any template to apply it</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 