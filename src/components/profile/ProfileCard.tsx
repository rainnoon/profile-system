'use client'

import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { PencilIcon, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Profile } from './types'
import { ProfileHeader } from './ProfileHeader'
import { AboutSection } from './AboutSection'
import { ExperienceSection } from './ExperienceSection'
import { EducationSection } from './EducationSection'
import { SkillsSection } from './SkillsSection'
import bgImg from '/public/images/bg.webp'
interface ProfileCardProps {
  profile: Profile
  isEditable?: boolean
  onEdit?: (section: string, index?: number) => void
  onAddExperience?: () => void
  onAddEducation?: () => void
  onAddSkill?: () => void
  showEndorsements?: boolean
}

export function ProfileCard({ profile, isEditable = false, onEdit, onAddExperience, onAddEducation, onAddSkill, showEndorsements = false }: ProfileCardProps) {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setBackgroundImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <Card className="bg-white overflow-hidden text-black">
      {/* 封面图片 */}
      <div
        className="h-48 relative"
        style={{
          background: backgroundImage ? `url(${backgroundImage}) center/cover no-repeat` : `url(${bgImg.src}) center/cover no-repeat`,
        }}
      >
        {isEditable && (
          <>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white rounded-full" onClick={handleUploadClick}>
              <ImageIcon className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* 个人信息 */}
      <ProfileHeader profile={profile} isEditable={isEditable} onEdit={onEdit} />

      {/* 技能部分 */}
      <SkillsSection skills={profile.skills} isEditable={isEditable} onEdit={onEdit} onAddSkill={onAddSkill} showEndorsements={showEndorsements} />
      {/* 关于部分 */}
      <AboutSection about={profile.about} isEditable={isEditable} onEdit={onEdit} />

      {/* 工作经历部分 */}
      <ExperienceSection experiences={profile.experience} isEditable={isEditable} onEdit={onEdit} onAdd={onAddExperience} />

      {/* 教育经历部分 */}
      <EducationSection educations={profile.education} isEditable={isEditable} onEdit={onEdit} onAdd={onAddEducation} />
    </Card>
  )
}
