"use client"
import { useResumeStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, Plus } from 'lucide-react'

interface SkillsFormProps {
  onClose?: () => void
}

export default function SkillsForm({ onClose }: SkillsFormProps) {
  const { resumeData, updateSkills } = useResumeStore()
  const [skills, setSkills] = useState<string[]>(resumeData.skills || [])
  const [inputValue, setInputValue] = useState('')
  const [bulkInput, setBulkInput] = useState('')

  useEffect(() => {
    setSkills(resumeData.skills || [])
    setBulkInput(resumeData.skills?.join(', ') || '')
  }, [resumeData.skills])

  function handleAddSkill() {
    const trimmedSkill = inputValue.trim()
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      const newSkills = [...skills, trimmedSkill]
      setSkills(newSkills)
      setInputValue('')
    }
  }

  function handleRemoveSkill(skillToRemove: string) {
    const newSkills = skills.filter(skill => skill !== skillToRemove)
    setSkills(newSkills)
    setBulkInput(newSkills.join(', '))
  }

  function handleBulkInputChange(value: string) {
    setBulkInput(value)
    const skillArray = value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)
    setSkills(skillArray)
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  function handleBulkKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      // Update the skills from bulk input
      const skillArray = bulkInput
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
      setSkills(skillArray)
    }
  }

  function handleSave() {
    updateSkills(skills)
    onClose?.()
  }

  function handleClearAll() {
    setSkills([])
    setBulkInput('')
  }

  return (
    <div className="space-y-6">
      {/* Bulk Input Section */}
      <div className="space-y-2">
        <div className="font-medium text-sm text-gray-700">Add Skills (comma-separated)</div>
        <Input
          placeholder="e.g., JavaScript, React, TypeScript, Node.js"
          value={bulkInput}
          onChange={e => handleBulkInputChange(e.target.value)}
          onKeyPress={handleBulkKeyPress}
        />
        <div className="text-xs text-gray-500">
          Type skills separated by commas and press Enter to save
        </div>
      </div>

      {/* Individual Skill Input */}
      <div className="space-y-2">
        <div className="font-medium text-sm text-gray-700">Add Individual Skill</div>
        <div className="flex gap-2">
          <Input
            placeholder="Enter a skill"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={handleAddSkill}
            disabled={!inputValue.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Skills Display */}
      {skills.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-medium text-sm text-gray-700">
              Skills ({skills.length})
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handleClearAll}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 justify-end pt-4">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button onClick={handleSave} type="button">
          Save Skills
        </Button>
      </div>
    </div>
  )
} 