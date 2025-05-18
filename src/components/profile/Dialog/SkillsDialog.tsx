'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Skill } from '../types'
import React from 'react'
import { Pen, Film, Video, Camera, Youtube, FileVideo, Music, Headphones, Cpu, Activity, Dumbbell, X, Plus } from 'lucide-react'

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
    violet: '#f3e5f5',
    sky: '#e1f5fe',
    amber: '#fff8e1',
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
    violet: '#6a1b9a',
    sky: '#0277bd',
    amber: '#ff8f00',
  }
  return colorMap[color] || '#0066cc' // 默认为蓝色
}

interface SkillsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  skills: Skill[]
  onUpdateSkillName: (index: number, name: string) => void
  onUpdateSkillIcon: (index: number, icon: string) => void
  onUpdateSkillColor: (index: number, color: string) => void
  onAddSkill: () => void
  onRemoveSkill: (index: number) => void
  onSave: () => void
  onCancel: () => void
}

export function SkillsDialog({ open, onOpenChange, skills, onUpdateSkillName, onUpdateSkillIcon, onUpdateSkillColor, onAddSkill, onRemoveSkill, onSave, onCancel }: SkillsDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onCancel()
        onOpenChange(open)
      }}
    >
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="text-black w-[95vw] max-w-[550px] p-0 overflow-hidden bg-white rounded-xl max-h-[80vh] flex flex-col">
        <div className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-xl font-semibold text-[#1f1f1f]">技能</DialogTitle>
          <p className="text-sm text-gray-600 mt-1">展示重要技能 — 最多可添加您想展示的技能。</p>
        </div>

        <div className="px-6 py-5 flex-1 overflow-hidden flex flex-col">
          <div className="space-y-3 mb-5 overflow-y-auto max-h-[50vh] pr-1">
            {skills.map((skill, index) => {
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
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 border border-gray-300 rounded-md p-2 sm:p-3 bg-white">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: getColorBackground(skill.color || 'blue'),
                        color: getColorText(skill.color || 'blue'),
                      }}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => onUpdateSkillName(index, e.target.value)}
                      className="flex-1 border-none p-0 focus:ring-0 outline-none min-w-0"
                      placeholder="技能名称"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-wrap sm:flex-nowrap">
                    <select
                      value={skill.icon}
                      onChange={(e) => onUpdateSkillIcon(index, e.target.value)}
                      className="border-none bg-transparent text-gray-500 text-sm focus:ring-0 outline-none flex-shrink-0 w-20 sm:w-auto"
                    >
                      <option value="Pen">设计图标</option>
                      <option value="Film">UI图标</option>
                      <option value="Video">动效图标</option>
                      <option value="Camera">摄影图标</option>
                      <option value="Youtube">视频图标</option>
                      <option value="FileVideo">短视频图标</option>
                      <option value="Music">音频图标</option>
                      <option value="Headphones">音频工程图标</option>
                      <option value="Cpu">科技图标</option>
                      <option value="Activity">健身图标</option>
                      <option value="Dumbbell">健身器材图标</option>
                    </select>
                    <select
                      value={skill.color}
                      onChange={(e) => onUpdateSkillColor(index, e.target.value)}
                      className="border-none bg-transparent text-gray-500 text-sm focus:ring-0 outline-none flex-shrink-0 w-20 sm:w-auto"
                    >
                      <option value="violet">紫色</option>
                      <option value="indigo">青紫色</option>
                      <option value="blue">蓝色</option>
                      <option value="sky">天蓝色</option>
                      <option value="cyan">青色</option>
                      <option value="teal">蓝绿色</option>
                      <option value="green">绿色</option>
                      <option value="lime">青柿色</option>
                      <option value="amber">琥珀色</option>
                      <option value="orange">橙色</option>
                      <option value="red">红色</option>
                      <option value="pink">粉色</option>
                    </select>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 flex-shrink-0 ml-auto" onClick={() => onRemoveSkill(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          <Button variant="outline" className="rounded-full border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2]/10 hover:border-[#004182] w-full justify-center" onClick={onAddSkill}>
            <Plus className="h-4 w-4 mr-2" />
            添加技能
          </Button>
        </div>

        <div className="px-6 py-3 flex justify-end border-t border-gray-200">
          <Button className="bg-[#0a66c2] hover:bg-[#004182] rounded-full text-white" onClick={onSave}>
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
