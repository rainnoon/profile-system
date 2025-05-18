'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, MapPinIcon, PencilIcon, Plus } from 'lucide-react'
import { Experience } from './types'

interface ExperienceSectionProps {
  experiences: Experience[]
  isEditable?: boolean
  onEdit?: (section: string, index?: number) => void
  onAdd?: () => void
}

export function ExperienceSection({ experiences, isEditable = false, onEdit, onAdd }: ExperienceSectionProps) {
  return (
    <div className="p-6 border-t border-gray-200 text-black">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">工作经历</h2>
        {isEditable && (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {experiences.map((exp, index) => (
        <div key={index}>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{exp.company.slice(0, 2)}</div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{exp.title}</h3>
              <p className="text-gray-600">{exp.company} · 全职</p>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <CalendarIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>{exp.duration}</span>
              </div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <MapPinIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>{exp.location}</span>
              </div>
              <div className="mt-3 relative">
                {isEditable && (
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full absolute right-0 top-0" onClick={() => onEdit && onEdit('experience', index)}>
                    <PencilIcon className="h-3 w-3" />
                  </Button>
                )}

                <p className="text-gray-600 whitespace-pre-line">{exp.description}</p>
              </div>
            </div>
          </div>
          {index < experiences.length - 1 && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  )
}
