'use client'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Testimonial } from './types'

interface TestimonialCardProps {
  testimonial: Testimonial
  isSelected?: boolean
  onClick?: () => void
}

export function TestimonialCard({ testimonial, isSelected = false, onClick }: TestimonialCardProps) {
  return (
    <Card
      className={`p-4 transition-all bg-white ${isSelected ? 'border-[#0a66c2] shadow-md' : 'hover:shadow-sm'} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3 mb-3">
        <Image src={testimonial.avatar || '/images/default-avatar.png'} alt={testimonial.name} width={60} height={60} className="rounded-full" />
        <div>
          <h3 className="font-bold">{testimonial.name}</h3>
          <p className="text-sm text-gray-600">
            {testimonial.title}
            {testimonial.company && ` at ${testimonial.company}`}
          </p>
        </div>
      </div>
      <p className="text-gray-700">{testimonial.quote}</p>
    </Card>
  )
}
