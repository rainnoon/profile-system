'use client'

import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'

interface AboutSectionProps {
  about: string
  isEditable?: boolean
  onEdit?: (section: string) => void
}

export function AboutSection({ about, isEditable = false, onEdit }: AboutSectionProps) {
  return (
    <div className="p-6 border-t border-gray-200 text-black relative">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">关于</h2>
        {isEditable && (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => onEdit && onEdit('about')}>
            <PencilIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className="text-gray-600 whitespace-pre-line">{about}</p>
    </div>
  )
}
