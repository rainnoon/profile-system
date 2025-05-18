'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PencilIcon, ThumbsUpIcon } from 'lucide-react'
import { Skill } from './types'
import { Pen, Film, Video, Camera, Youtube, FileVideo, Music, Headphones, Cpu, Activity, Dumbbell } from 'lucide-react'

// 颜色转换函数
// 将颜色名称转换为背景色
const getColorBackground = (color: string): string => {
  const colorMap: Record<string, string> = {
    blue: '#e6f2ff',
    red: '#ffebee',
    green: '#e8f5e9',
    yellow: '#fffde7',
    purple: '#f3e5f5',
    pink: '#fce4ec',
    indigo: '#e8eaf6',
    teal: '#e0f2f1',
    orange: '#fff3e0',
    cyan: '#e0f7fa',
    lime: '#f9fbe7',
    brown: '#efebe9',
    gray: '#f5f5f5',
  }
  return colorMap[color] || '#e6f2ff' // 默认为浅蓝色
}

// 将颜色名称转换为文本颜色
const getColorText = (color: string): string => {
  const colorMap: Record<string, string> = {
    blue: '#0066cc',
    red: '#c62828',
    green: '#2e7d32',
    yellow: '#f9a825',
    purple: '#6a1b9a',
    pink: '#ad1457',
    indigo: '#283593',
    teal: '#00695c',
    orange: '#e65100',
    cyan: '#00838f',
    lime: '#9e9d24',
    brown: '#4e342e',
    gray: '#424242',
  }
  return colorMap[color] || '#0066cc' // 默认为蓝色
}

interface SkillsSectionProps {
  skills: string[] | Skill[]
  isEditable?: boolean
  onEdit?: (section: string) => void
  onAddSkill?: () => void
  showEndorsements?: boolean
}

export function SkillsSection({ skills, isEditable = false, onEdit, onAddSkill, showEndorsements = false }: SkillsSectionProps) {
  const [showMore, setShowMore] = useState(false)

  // 渲染复杂技能对象数组
  const renderComplexSkills = () => {
    const complexSkills = skills as Skill[]
    return (
      <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-2">
          {complexSkills.slice(0, showMore ? complexSkills.length : 6).map((skill, index) => {
            // 动态选择图标组件
            let IconComponent
            switch (skill.icon) {
              case 'Pen':
                IconComponent = Pen
                break
              case 'Film':
                IconComponent = Film
                break
              case 'Video':
                IconComponent = Video
                break
              case 'Camera':
                IconComponent = Camera
                break
              case 'Youtube':
                IconComponent = Youtube
                break
              case 'FileVideo':
                IconComponent = FileVideo
                break
              case 'Music':
                IconComponent = Music
                break
              case 'Headphones':
                IconComponent = Headphones
                break
              case 'Cpu':
                IconComponent = Cpu
                break
              case 'Activity':
                IconComponent = Activity
                break
              case 'Dumbbell':
                IconComponent = Dumbbell
                break
              default:
                IconComponent = Activity
            }

            return (
              <div key={index} className="flex flex-col">
                <Badge
                  className="border-none py-2 px-3 text-sm font-medium rounded-xl"
                  style={{
                    backgroundColor: getColorBackground(skill.color || 'blue'),
                    color: getColorText(skill.color || 'blue'),
                  }}
                >
                  {IconComponent && <IconComponent className="h-4 w-4 mr-2" />} {skill.name}
                </Badge>
              </div>
            )
          })}

          {complexSkills.length > 6 && (
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 font-medium" onClick={() => setShowMore(!showMore)}>
              {showMore ? '显示更少' : '显示更多'}
            </Button>
          )}
        </div>
      </div>
    )
  }

  // 生成随机认可数
  const getRandomEndorsements = () => {
    return Math.floor(Math.random() * 50) + 10
  }

  // 渲染技能
  const renderSkills = () => {
    // 无论什么类型的技能数据，都使用 renderComplexSkills 方法来渲染
    if (typeof skills[0] === 'string') {
      // 如果是字符串数组，将其转换为 Skill 对象数组
      const convertedSkills: Skill[] = (skills as string[]).map((name) => ({
        name,
        icon: 'Activity',
        color: 'blue',
      }))

      // 临时替换技能数据并渲染
      const originalSkills = skills
      ;(skills as any) = convertedSkills
      const result = renderComplexSkills()
      ;(skills as any) = originalSkills
      return result
    } else {
      return renderComplexSkills()
    }
  }

  return (
    <div className="p-6 border-t border-gray-200 text-black">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">技能</h2>
        {isEditable && (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => onEdit && onEdit('skills')}>
            <PencilIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      {renderSkills()}
    </div>
  )
}
