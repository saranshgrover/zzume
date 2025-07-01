'use client'
import { useResumeStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ExperienceForm from './ExperienceForm'
import EducationForm from './EducationForm'
import PersonalInfoForm from './PersonalInfoForm'
import SkillsForm from './SkillsForm'
import ResumePreview from '@/components/ResumePreview'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Pencil, X } from 'lucide-react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { GripVertical } from 'lucide-react'
import DownloadButton from '@/components/DownloadButton'


import '../../globals.css'



export default function ResumeBuilderPage() {
  const { resumeData, removeExperience, removeEducation, reorderExperience, reorderEducation, reorderSections, updateSkills } = useResumeStore()
  const [open, setOpen] = useState<{ personal: boolean; exp: boolean; edu: boolean; skills: boolean }>({ personal: false, exp: false, edu: false, skills: false })
  const [expanded, setExpanded] = useState<string | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [editEduId, setEditEduId] = useState<string | null>(null)
  
  // Resizable divider state
  const [leftPanelWidth, setLeftPanelWidth] = useState(50) // percentage
  const [isDragging, setIsDragging] = useState(false)
  
  // Load saved width from localStorage
  useEffect(() => {
    const savedWidth = localStorage.getItem('resume-builder-left-panel-width')
    if (savedWidth) {
      setLeftPanelWidth(parseFloat(savedWidth))
    }
  }, [])
  
  // Save width to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('resume-builder-left-panel-width', leftPanelWidth.toString())
  }, [leftPanelWidth])
  
  // Handle mouse events for resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      const container = document.querySelector('.resume-builder-container') as HTMLElement
      if (!container) return
      
      const containerRect = container.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100
      
      // Limit the width between 30% and 70%
      const clampedWidth = Math.max(30, Math.min(70, newLeftWidth))
      setLeftPanelWidth(clampedWidth)
    }
    
    const handleMouseUp = () => {
      setIsDragging(false)
    }
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging])

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return
    if (result.type === 'experience') {
      const items = Array.from(resumeData.experience)
      const [removed] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, removed)
      reorderExperience(items)
    } else if (result.type === 'education') {
      const items = Array.from(resumeData.education)
      const [removed] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, removed)
      reorderEducation(items)
    } else if (result.type === 'sections') {
      const sections = Array.from(resumeData.sectionOrder)
      const [removed] = sections.splice(result.source.index, 1)
      sections.splice(result.destination.index, 0, removed)
      reorderSections(sections)
    }
  }

  function renderSection(sectionId: string) {
    switch (sectionId) {
      case 'personal':
        return (
          <Card className="p-4 flex flex-col gap-2">
            <div className="flex items-center mb-2 justify-between">
              <h2 className="font-semibold text-lg">{resumeData.personalInfo.name || 'Your Name'}</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setOpen(o => ({ ...o, personal: true }))}
                className="text-blue-600 hover:text-blue-700"
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="text-sm">
              <div className="text-gray-600">
                {[
                  resumeData.personalInfo.email,
                  resumeData.personalInfo.phone,
                  resumeData.personalInfo.location
                ].filter(Boolean).join(' • ') || 'Add your contact information'}
              </div>
              {resumeData.personalInfo.summary && (
                <div className="text-gray-700">{resumeData.personalInfo.summary}</div>
              )}
            </div>
          </Card>
        )
      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Experience</h2>
              <Dialog open={open.exp} onOpenChange={v => { setOpen(o => ({ ...o, exp: v })); if (!v) setEditId(null) }}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    + Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl w-full overflow-y-auto max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>{editId ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
                  </DialogHeader>
                  <ExperienceForm 
                    experience={editId ? resumeData.experience.find(e => e.id === editId) : undefined} 
                    onClose={() => { setOpen(o => ({ ...o, exp: false })); setEditId(null) }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <Droppable droppableId="experience" type="experience">
              {(provided) => (
                <div className="space-y-4" ref={provided.innerRef} {...provided.droppableProps}>
                  {resumeData.experience.map((exp, idx) => {
                    const isExpanded = expanded === exp.id
                    return (
                      <Draggable key={exp.id} draggableId={exp.id} index={idx}>
                        {(dragProvided) => (
                          <Card className="p-4" ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                            <div className="flex flex-col">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-lg mb-1">{exp.position}</div>
                                  <div className="text-gray-700 mb-1">{exp.company}</div>
                                  <div className="text-sm text-gray-500">
                                    {[exp.location, exp.startDate, exp.endDate].filter(Boolean).join(' • ')}
                                  </div>
                                </div>
                                <div className="flex gap-1 items-center flex-shrink-0">
                                  <span {...dragProvided.dragHandleProps} className="cursor-grab p-1 hover:bg-gray-100 rounded">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                  </span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setExpanded(isExpanded ? null : exp.id)} 
                                    className="text-gray-600 hover:text-gray-800"
                                  >
                                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => { setEditId(exp.id); setOpen(o => ({ ...o, exp: true })) }}
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              {isExpanded && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                  {exp.description.length > 0 ? (
                                    <ul className="list-disc ml-5 text-sm space-y-1 mb-4">
                                      {exp.description.map((d, i) => <li key={i} className="text-gray-700">{d}</li>)}
                                    </ul>
                                  ) : (
                                    <div className="text-sm text-gray-500 mb-4">No description added</div>
                                  )}
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => removeExperience(exp.id)} 
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                  >
                                    Remove Experience
                                  </Button>
                                </div>
                              )}
                            </div>
                          </Card>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )
      case 'education':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Education</h2>
              <Dialog open={open.edu} onOpenChange={v => { setOpen(o => ({ ...o, edu: v })); if (!v) setEditEduId(null) }}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    + Add Education
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl w-full overflow-y-auto max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>{editEduId ? 'Edit Education' : 'Add Education'}</DialogTitle>
                  </DialogHeader>
                  <EducationForm 
                    education={editEduId ? resumeData.education.find(e => e.id === editEduId) : undefined} 
                    onClose={() => { setOpen(o => ({ ...o, edu: false })); setEditEduId(null) }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <Droppable droppableId="education" type="education">
              {(provided) => (
                <div className="space-y-4" ref={provided.innerRef} {...provided.droppableProps}>
                  {resumeData.education.map((edu, idx) => {
                    const isExpanded = expanded === edu.id
                    return (
                      <Draggable key={edu.id} draggableId={edu.id} index={idx}>
                        {(dragProvided) => (
                          <Card className="p-4" ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                            <div className="flex flex-col">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-lg mb-1">{edu.institution}</div>
                                  <div className="text-gray-700 mb-1">{edu.degree} in {edu.field}</div>
                                  <div className="text-sm text-gray-500">
                                    {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                                  </div>
                                </div>
                                <div className="flex gap-1 items-center flex-shrink-0">
                                  <span {...dragProvided.dragHandleProps} className="cursor-grab p-1 hover:bg-gray-100 rounded">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                  </span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setExpanded(isExpanded ? null : edu.id)} 
                                    className="text-gray-600 hover:text-gray-800"
                                  >
                                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => { setEditEduId(edu.id); setOpen(o => ({ ...o, edu: true })) }}
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              {isExpanded && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => removeEducation(edu.id)} 
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                  >
                                    Remove Education
                                  </Button>
                                </div>
                              )}
                            </div>
                          </Card>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )
      case 'skills':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Skills</h2>
              <Dialog open={open.skills} onOpenChange={v => setOpen(o => ({ ...o, skills: v }))}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    + Add Skills
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-full overflow-y-auto max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>Add Skills</DialogTitle>
                  </DialogHeader>
                  <SkillsForm onClose={() => setOpen(o => ({ ...o, skills: false }))} />
                </DialogContent>
              </Dialog>
            </div>
            <Card className="p-4">
              {resumeData.skills.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {resumeData.skills.length} skill{resumeData.skills.length !== 1 ? 's' : ''}
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateSkills([])}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm group"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newSkills = resumeData.skills.filter((_, i) => i !== index)
                            updateSkills(newSkills)
                          }}
                          className="hover:bg-blue-200 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove skill"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">No skills added yet</div>
              )}
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="resume-builder-container flex flex-col md:flex-row p-6 max-w-7xl mx-auto h-screen">
        <div 
          className="w-full flex flex-col gap-6 overflow-y-auto p-6 bg-gray-50 rounded-lg shadow-lg border border-gray-200 custom-scrollbar"
          style={{ width: `${leftPanelWidth}%` }}
        >
          {/* Sections */}
          <Droppable droppableId="sections" type="sections">
            {(provided) => (
              <div className="space-y-6" ref={provided.innerRef} {...provided.droppableProps}>
                {resumeData.sectionOrder.map((sectionId, idx) => (
                  <Draggable key={sectionId} draggableId={sectionId} index={idx}>
                    {(dragProvided) => (
                      <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                        <div className="flex items-center gap-2 mb-3">
                          <span {...dragProvided.dragHandleProps} className="cursor-grab p-1 hover:bg-gray-100 rounded">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </span>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {sectionId === 'personal' ? 'Personal Information' : 
                             sectionId === 'experience' ? 'Work Experience' :
                             sectionId === 'education' ? 'Education' :
                             sectionId === 'skills' ? 'Skills' : sectionId}
                          </div>
                        </div>
                        {renderSection(sectionId)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Personal Info Dialog */}
          <Dialog open={open.personal} onOpenChange={v => setOpen(o => ({ ...o, personal: v }))}>
            <DialogContent className="max-w-xl w-full">
              <DialogHeader>
                <DialogTitle>Edit Personal Information</DialogTitle>
              </DialogHeader>
              <PersonalInfoForm onClose={() => setOpen(o => ({ ...o, personal: false }))} />
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Resizable Vertical Divider */}
        <div 
          className="hidden md:block w-1 bg-gray-300 mx-3 cursor-col-resize hover:bg-gray-400 transition-colors relative"
          onMouseDown={handleMouseDown}
          style={{ 
            cursor: isDragging ? 'col-resize' : 'col-resize',
            backgroundColor: isDragging ? '#9ca3af' : '#d1d5db'
          }}
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
        </div>
        
        <div 
          className="w-full flex flex-col justify-start items-center p-6"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <div className="mb-6 mt-4">
            <DownloadButton />
          </div>
          <ResumePreview />
        </div>
      </div>
    </DragDropContext>
  )
}
