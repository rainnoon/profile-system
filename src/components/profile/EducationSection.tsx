'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, PencilIcon, Plus } from 'lucide-react'
import { Education } from './types'

interface EducationSectionProps {
  educations: Education[]
  isEditable?: boolean
  onEdit?: (section: string, index?: number) => void
  onAdd?: () => void
}

export function EducationSection({ educations, isEditable = false, onEdit, onAdd }: EducationSectionProps) {
  return (
    <div className="p-6 border-t text-black border-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">教育经历</h2>
        {isEditable && (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {educations.map((edu, index) => (
        <div key={index}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded bg-purple-100 flex items-center justify-center text-purple-600 font-bold">{edu.school.slice(0, 2)}</div>
            </div>
            <div className="flex-1 relative">
              {isEditable && (
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full absolute right-0 top-0" onClick={() => onEdit && onEdit('education', index)}>
                  <PencilIcon className="h-3 w-3" />
                </Button>
              )}

              <h3 className="font-bold text-lg">{edu.school}</h3>
              <p className="text-gray-600">{edu.degree}</p>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <CalendarIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>{edu.years}</span>
              </div>
            </div>
          </div>
          {index < educations.length - 1 && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  )
}
