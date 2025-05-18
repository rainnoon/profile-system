'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ImageIcon, MapPinIcon, MessageCircleIcon, PencilIcon } from 'lucide-react'
import Image from 'next/image'
import { Profile } from './types'

interface ProfileHeaderProps {
  profile: Profile
  isEditable?: boolean
  onEdit?: (section: string) => void
}

export function ProfileHeader({ profile, isEditable = false, onEdit }: ProfileHeaderProps) {
  const [hovering, setHovering] = useState(false)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    if (isEditable && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 创建本地预览URL
      const objectUrl = URL.createObjectURL(file)
      setPreviewAvatar(objectUrl)

      // 在实际应用中，这里应该上传文件到服务器

      if (onEdit) {
        // 通知父组件头像已更改
        onEdit('avatar')
      }

      // 清除文件输入，以便同一文件可以再次选择
      e.target.value = ''
    }
  }

  return (
    <div className="p-6 pt-0 relative">
      <div
        className="absolute -top-[10rem] left-6 border-4 border-white rounded-full overflow-hidden group"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={handleAvatarClick}
        style={{ width: 150, height: 150, borderRadius: '50%' }}
      >
        <Image
          src={previewAvatar || profile.avatar || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces'}
          alt={profile.name}
          width={150}
          height={150}
          className="bg-gray-200 rounded-full object-cover w-full h-full"
          style={{ borderRadius: '50%' }}
          unoptimized={true}
        />
        {isEditable && hovering && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white cursor-pointer">
            <ImageIcon className="h-6 w-6 mb-1" />
            <span className="text-xs">更换头像</span>
          </div>
        )}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      </div>

      <div className="mt-16 flex justify-between items-start relative">
        {isEditable && (
          <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-8 w-8 rounded-full" onClick={() => onEdit && onEdit('personal')}>
            <PencilIcon className="h-4 w-4" />
          </Button>
        )}

        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-lg text-gray-600">
            {profile.title}
            {profile.company ? ` at ${profile.company}` : ''}
          </p>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MapPinIcon className="h-3 w-3 mr-1" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MessageCircleIcon className="h-3 w-3 mr-1" />
            <span>{profile.connections} 位关系</span>
          </div>
        </div>

        {!isEditable && (
          <div className="flex items-center gap-2">
            <Button className="bg-[#3995f1] rounded-[0.4rem] text-white hover:bg-[#1f87ef]">
              <MessageCircleIcon className="h-4 w-4 mr-2 " />
              消息
            </Button>
            <Button variant="outline" className="border-[#0a66c2] rounded-[0.4rem] text-[#0a66c2] hover:bg-[#0a66c2]/10">
              关注
            </Button>
          </div>
        )}
      </div>

      {/* 当前公司 */}
      {/* <div className="mt-4 flex items-start space-x-3">
        <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">{profile.company.slice(0, 2)}</div>
        <div>
          <p className="font-medium">{profile.company}</p>
          <p className="text-sm text-gray-500">全职</p>
        </div>
      </div> */}

      {/* 教育经历 */}
      {/* {profile.education.length > 0 && (
        <div className="mt-3 flex items-start space-x-3">
          <div className="w-12 h-12 rounded bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">{profile.education[0].school.slice(0, 2)}</div>
          <div>
            <p className="font-medium">{profile.education[0].school}</p>
            <p className="text-sm text-gray-500">
              {profile.education[0].degree} · {profile.education[0].years}
            </p>
          </div>
        </div>
      )} */}
    </div>
  )
}
