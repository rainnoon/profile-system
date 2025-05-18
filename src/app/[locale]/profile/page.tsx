'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Navbar } from '@/components/navigation/Navbar'
import { Pen, Film, Video, Camera, Youtube, FileVideo, Music, Headphones, Cpu, Activity, Dumbbell, X, Plus, Loader2 } from 'lucide-react'
import { ProfileCard, Profile, Skill, Experience, Education, PersonalInfoDialog, AboutDialog, ExperienceDialog, EducationDialog, SkillsDialog } from '@/components/profile'
import { useProfileForm } from '@/hooks/useProfileForm'

export default function ProfilePage() {
  // 个人简历数据
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 编辑状态
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [showMore, setShowMore] = useState(false)

  // 使用自定义 hook 管理表单状态和操作
  const {
    formState: editForm,
    setFormState: setEditForm,
    handleFormChange,
    addSkill,
    removeSkill,
    removeExperience,
    removeEducation,
    updateSkillName,
    updateSkillIcon,
    updateSkillColor,
    addExperience,
    addEducation,
    resetForm,
    saveEdit,
  } = useProfileForm(profile, (updatedProfile) => {
    // 更新父组件中的 profile 状态
    if (profile) {
      setProfile({
        ...profile,
        ...updatedProfile,
      })
    }
  })

  // 从API获取个人资料数据
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/profile')

        if (!response.ok) {
          throw new Error('获取个人资料失败')
        }

        const data = await response.json()
        if (data.success) {
          setProfile(data.data)
        } else {
          throw new Error(data.message || '获取个人资料失败')
        }
      } catch (err) {
        console.error('获取个人资料出错:', err)
        setError(err instanceof Error ? err.message : '获取个人资料时出错')
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container max-w-3xl mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-600">正在加载个人资料...</p>
          </div>
        </div>
      </div>
    )
  }

  // 如果出错，显示错误信息
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container max-w-3xl mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 font-medium">出错了</p>
            <p className="mt-2 text-gray-600">{error || '无法加载个人资料'}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              重试
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 开始编辑
  const startEditing = (section: string, index?: number, isNew: boolean = false) => {
    if (section === 'experience' || section === 'education') {
      setEditingSection(`${section}-${index}`)
    } else {
      setEditingSection(section)
    }
    setDialogOpen(true)
    setIsAddingNew(isNew) // 设置是否为添加新项目
  }

  // 保存编辑的包装函数
  const handleSaveEdit = async (section: string) => {
    // 调用 hook 中的 saveEdit 函数
    const success = await saveEdit(section)

    // 无论成功与否，都重置编辑状态
    setEditingSection(null)
    setDialogOpen(false)

    return success
  }

  // 取消编辑
  const cancelEdit = () => {
    setEditingSection(null)
    setDialogOpen(false)
    // 重置编辑表单为当前个人资料状态
    resetForm(profile)
  }

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Navigation Bar */}
      <Navbar />
      {/* 左侧网格 */}
      <div className="absolute z-0 top-0 bottom-0 left-0 w-1/2 bg-[linear-gradient(#e6e6e6_1px,transparent_1px),linear-gradient(90deg,#e6e6e6_1px,transparent_1px)] bg-[size:40px_40px] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(248,248,248,0.3)_0%,rgba(248,248,248,0.5)_30%,#f8f8f8_80%)]"></div>

      {/* 右侧网格 */}
      <div className="absolute z-0 top-0 bottom-0 right-0 w-1/2 bg-[linear-gradient(#e6e6e6_1px,transparent_1px),linear-gradient(90deg,#e6e6e6_1px,transparent_1px)] bg-[size:40px_40px] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(270deg,rgba(248,248,248,0.3)_0%,rgba(248,248,248,0.5)_30%,#f8f8f8_80%)]"></div>

      <main className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        <div className="grid grid-cols-1 gap-6">
          {/* 个人资料展示区域 */}
          <div>
            <ProfileCard
              profile={profile}
              isEditable={true}
              onEdit={startEditing}
              onAddExperience={() => {
                const newIndex = addExperience()
                startEditing(`experience-${newIndex}`, undefined, true) // 添加isNew=true参数
              }}
              onAddEducation={() => {
                const newIndex = addEducation()
                startEditing(`education-${newIndex}`, undefined, true) // 添加isNew=true参数
              }}
              onAddSkill={() => {
                startEditing('skills')
              }}
            />
          </div>
        </div>
      </main>

      {/* 个人信息编辑对话框 */}
      <PersonalInfoDialog
        open={dialogOpen && editingSection === 'personal'}
        onOpenChange={setDialogOpen}
        formData={{
          name: editForm.name,
          title: editForm.title,
          company: editForm.company,
          location: editForm.location,
        }}
        onFormChange={(e) => handleFormChange(e, 'personal')}
        onSave={() => handleSaveEdit('personal')}
        onCancel={cancelEdit}
      />

      {/* 关于部分编辑对话框 */}
      <AboutDialog
        open={dialogOpen && editingSection === 'about'}
        onOpenChange={setDialogOpen}
        about={editForm.about}
        onFormChange={(e) => handleFormChange(e, 'about')}
        onSave={() => handleSaveEdit('about')}
        onCancel={cancelEdit}
      />

      {/* 工作经历编辑对话框 */}
      {editForm.experience.map((exp, index) => (
        <ExperienceDialog
          key={`experience-dialog-${index}`}
          open={dialogOpen && editingSection === `experience-${index}`}
          onOpenChange={(open) => {
            if (!open) cancelEdit()
            setDialogOpen(open)
          }}
          experience={editForm.experience[index]}
          index={index}
          onFormChange={(e, idx) => handleFormChange(e, 'experience', undefined, idx)}
          onSave={() => handleSaveEdit(`experience-${index}`)}
          onCancel={cancelEdit}
          // 使用isAddingNew状态来判断是否为添加模式
          isNew={isAddingNew}
          onDelete={async () => {
            try {
              // 先创建一个新的经验数组，移除指定索引的项
              const updatedExperiences = [...editForm.experience]
              updatedExperiences.splice(index, 1)
              
              // 使用 hook 中的 removeExperience 函数
              await removeExperience(index)
              
              // 关闭对话框
              setEditingSection(null)
              setDialogOpen(false)

              // 直接使用我们刚刚创建的更新后的数组来更新 profile 状态
              if (profile) {
                setProfile({
                  ...profile,
                  experience: updatedExperiences,
                })
              }
              
              console.log('删除后的工作经历:', updatedExperiences)
            } catch (error) {
              console.error('删除工作经历失败:', error)
            }
          }}
        />
      ))}

      {/* 教育经历编辑对话框 */}
      {editForm.education.map((edu, index) => (
        <EducationDialog
          key={`education-dialog-${index}`}
          open={dialogOpen && editingSection === `education-${index}`}
          onOpenChange={(open) => {
            if (!open) cancelEdit()
            setDialogOpen(open)
          }}
          education={editForm.education[index]}
          index={index}
          onFormChange={(e, idx) => handleFormChange(e, 'education', undefined, idx)}
          onSave={() => handleSaveEdit(`education-${index}`)}
          onCancel={cancelEdit}
          // 使用isAddingNew状态来判断是否为添加模式
          isNew={isAddingNew}
          onDelete={async () => {
            try {
              // 先创建一个新的教育经历数组，移除指定索引的项
              const updatedEducations = [...editForm.education]
              updatedEducations.splice(index, 1)
              
              // 使用 hook 中的 removeEducation 函数
              await removeEducation(index)
              
              // 关闭对话框
              setEditingSection(null)
              setDialogOpen(false)

              // 直接使用我们刚刚创建的更新后的数组来更新 profile 状态
              if (profile) {
                setProfile({
                  ...profile,
                  education: updatedEducations,
                })
              }
              
              console.log('删除后的教育经历:', updatedEducations)
            } catch (error) {
              console.error('删除教育经历失败:', error)
            }
          }}
        />
      ))}

      {/* 技能编辑对话框 */}
      <SkillsDialog
        open={dialogOpen && editingSection === 'skills'}
        onOpenChange={(open) => {
          if (!open) cancelEdit()
          setDialogOpen(open)
        }}
        skills={editForm.skills as Skill[]}
        onUpdateSkillName={updateSkillName}
        onUpdateSkillIcon={updateSkillIcon}
        onUpdateSkillColor={updateSkillColor}
        onAddSkill={addSkill}
        onRemoveSkill={removeSkill}
        onSave={() => handleSaveEdit('skills')}
        onCancel={cancelEdit}
      />
    </div>
  )
}
