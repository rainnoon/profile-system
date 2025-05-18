import { useState, useEffect } from 'react'
import { Profile, Skill, Experience, Education } from '@/components/profile'

// 定义保存编辑后的回调函数类型
type SaveCallback = (updatedProfile: Partial<Profile>) => void

export interface ProfileFormState {
  name: string
  title: string
  company: string
  location: string
  about: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}

export function useProfileForm(initialProfile: Profile | null, onSave?: SaveCallback) {
  // 编辑表单状态
  const [formState, setFormState] = useState<ProfileFormState>({
    name: '',
    title: '',
    company: '',
    location: '',
    about: '',
    experience: [],
    education: [],
    skills: [],
  })

  // 当个人资料数据加载完成后，更新编辑表单
  useEffect(() => {
    if (initialProfile) {
      setFormState({
        name: initialProfile.name,
        title: initialProfile.title,
        company: initialProfile.company,
        location: initialProfile.location,
        about: initialProfile.about,
        experience: [...initialProfile.experience],
        education: [...initialProfile.education],
        skills: [...initialProfile.skills] as Skill[],
      })
    }
  }, [initialProfile])

  // 处理表单输入变化
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, field?: string, index?: number) => {
    const { name, value } = e.target

    if (section === 'personal' || section === 'about') {
      setFormState({
        ...formState,
        [name]: value,
      })
    } else if (section === 'experience' && typeof index === 'number') {
      const updatedExperience = [...formState.experience]
      updatedExperience[index] = {
        ...updatedExperience[index],
        [name]: value,
      }
      setFormState({
        ...formState,
        experience: updatedExperience,
      })
    } else if (section === 'education' && typeof index === 'number') {
      const updatedEducation = [...formState.education]
      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      }
      setFormState({
        ...formState,
        education: updatedEducation,
      })
    }
  }

  // 添加新技能
  const addSkill = async () => {
    // 获取推荐技能列表
    try {
      const response = await fetch('/api/profile/skills')
      const data = await response.json()

      if (data.success && data.recommended) {
        // 这里可以显示推荐技能列表供用户选择
        // 简化起见，我们直接添加一个空技能
        const newSkill: Skill = {
          name: '',
          icon: 'Activity',
          color: 'blue',
        }
        setFormState({
          ...formState,
          skills: [...formState.skills, newSkill] as Skill[],
        })
      } else {
        // 如果获取推荐失败，使用默认值
        const newSkill: Skill = {
          name: '',
          icon: 'Activity',
          color: 'blue',
        }
        setFormState({
          ...formState,
          skills: [...formState.skills, newSkill] as Skill[],
        })
      }
    } catch (error) {
      console.error('获取推荐技能失败:', error)
      // 出错时使用默认值
      const newSkill: Skill = {
        name: '',
        icon: 'Activity',
        color: 'blue',
      }
      setFormState({
        ...formState,
        skills: [...formState.skills, newSkill] as Skill[],
      })
    }
  }

  // 删除技能
  const removeSkill = async (index: number) => {
    const skillToRemove = formState.skills[index]
    const updatedSkills = [...formState.skills] as Skill[]
    updatedSkills.splice(index, 1)
    setFormState({
      ...formState,
      skills: updatedSkills,
    })

    // 如果是已存在的技能，调用API删除
    if (skillToRemove.name) {
      try {
        await fetch(`/api/profile/skills?name=${encodeURIComponent(skillToRemove.name)}`, {
          method: 'DELETE',
        })
        // 注意：这里不需要处理响应，因为我们已经在UI中更新了状态
      } catch (error) {
        console.error('删除技能失败:', error)
      }
    }
  }

  // 删除工作经验
  const removeExperience = async (index: number) => {
    const experienceToRemove = formState.experience[index]
    const updatedExperience = [...formState.experience]
    updatedExperience.splice(index, 1)
    setFormState({
      ...formState,
      experience: updatedExperience,
    })

    // 如果是已存在的经验，调用API删除
    if (experienceToRemove.id) {
      try {
        await fetch(`/api/profile/experience?id=${experienceToRemove.id}`, {
          method: 'DELETE',
        })
      } catch (error) {
        console.error('删除工作经验失败:', error)
      }
    }
  }

  // 删除教育经历
  const removeEducation = async (index: number) => {
    const educationToRemove = formState.education[index]
    const updatedEducation = [...formState.education]
    updatedEducation.splice(index, 1)
    setFormState({
      ...formState,
      education: updatedEducation,
    })

    // 如果是已存在的教育经历，调用API删除
    if (educationToRemove.id) {
      try {
        await fetch(`/api/profile/education?id=${educationToRemove.id}`, {
          method: 'DELETE',
        })
      } catch (error) {
        console.error('删除教育经历失败:', error)
      }
    }
  }

  // 更新技能名称
  const updateSkillName = (index: number, name: string) => {
    const updatedSkills = [...formState.skills] as Skill[]
    updatedSkills[index] = {
      ...(updatedSkills[index] as Skill),
      name,
    }
    setFormState({
      ...formState,
      skills: updatedSkills,
    })
  }

  // 更新技能图标
  const updateSkillIcon = (index: number, icon: string) => {
    const updatedSkills = [...formState.skills] as Skill[]
    updatedSkills[index] = {
      ...(updatedSkills[index] as Skill),
      icon,
    }
    setFormState({
      ...formState,
      skills: updatedSkills,
    })
  }

  // 更新技能颜色
  const updateSkillColor = (index: number, color: string) => {
    const updatedSkills = [...formState.skills] as Skill[]
    updatedSkills[index] = {
      ...(updatedSkills[index] as Skill),
      color,
    }
    setFormState({
      ...formState,
      skills: updatedSkills,
    })
  }

  // 添加新经历
  const addExperience = () => {
    const newExperience: Experience = {
      title: '',
      company: '',
      duration: '',
      location: '',
      description: '',
    }
    const updatedExperience = [...formState.experience, newExperience]
    setFormState({
      ...formState,
      experience: updatedExperience,
    })
    return updatedExperience.length - 1 // 返回新添加的索引
  }

  // 添加新教育
  const addEducation = () => {
    const newEducation = {
      school: '',
      degree: '',
      years: '',
    }
    const updatedEducation = [...formState.education, newEducation]
    setFormState({
      ...formState,
      education: updatedEducation,
    })
    return updatedEducation.length - 1 // 返回新添加的索引
  }

  // 重置表单
  const resetForm = (profile: Profile | null) => {
    if (profile) {
      setFormState({
        name: profile.name,
        title: profile.title,
        company: profile.company,
        location: profile.location,
        about: profile.about,
        experience: [...profile.experience],
        education: [...profile.education],
        skills: [...profile.skills] as Skill[],
      })
    }
  }

  // 保存编辑
  const saveEdit = async (section: string) => {
    if (!initialProfile) return

    try {
      // 根据不同的部分更新个人资料
      if (section === 'personal') {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.name,
            title: formState.title,
            company: formState.company,
            location: formState.location,
          }),
        })

        const data = await response.json()
        if (data.success) {
          const updatedProfile = {
            ...initialProfile,
            name: formState.name,
            title: formState.title,
            company: formState.company,
            location: formState.location,
          }
          // 调用回调函数更新父组件中的状态
          onSave?.(updatedProfile)
        }
      } else if (section === 'about') {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            about: formState.about,
          }),
        })

        const data = await response.json()
        if (data.success) {
          const updatedProfile = {
            ...initialProfile,
            about: formState.about,
          }
          onSave?.(updatedProfile)
        }
      } else if (section.startsWith('experience-')) {
        // 获取经验ID
        const index = parseInt(section.split('-')[1])
        const experience = formState.experience[index]

        // 如果是更新现有经验
        if (experience.id) {
          const response = await fetch('/api/profile/experience', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(experience),
          })

          const data = await response.json()
          if (data.success) {
            const updatedProfile = {
              ...initialProfile,
              experience: [...formState.experience],
            }
            onSave?.(updatedProfile)
          }
        }
        // 如果是添加新经验
        else {
          const response = await fetch('/api/profile/experience', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(experience),
          })

          const data = await response.json()
          if (data.success) {
            const updatedExperience = [...formState.experience]
            updatedExperience[index] = data.data
            setFormState({
              ...formState,
              experience: updatedExperience,
            })
            
            const updatedProfile = {
              ...initialProfile,
              experience: updatedExperience,
            }
            onSave?.(updatedProfile)
          }
        }
      } else if (section.startsWith('education-')) {
        // 获取教育ID
        const index = parseInt(section.split('-')[1])
        const education = formState.education[index]

        // 如果是更新现有教育经历
        if (education.id) {
          const response = await fetch('/api/profile/education', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(education),
          })

          const data = await response.json()
          if (data.success) {
            const updatedProfile = {
              ...initialProfile,
              education: [...formState.education],
            }
            onSave?.(updatedProfile)
          }
        }
        // 如果是添加新教育经历
        else {
          const response = await fetch('/api/profile/education', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(education),
          })

          const data = await response.json()
          if (data.success) {
            const updatedEducation = [...formState.education]
            updatedEducation[index] = data.data
            setFormState({
              ...formState,
              education: updatedEducation,
            })
            
            const updatedProfile = {
              ...initialProfile,
              education: updatedEducation,
            }
            onSave?.(updatedProfile)
          }
        }
      } else if (section === 'skills') {
        // 更新技能列表
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skills: formState.skills,
          }),
        })

        const data = await response.json()
        if (data.success) {
          const updatedProfile = {
            ...initialProfile,
            skills: [...formState.skills],
          }
          onSave?.(updatedProfile)
        }
      }

      return true // 返回成功状态
    } catch (error) {
      console.error('保存编辑时出错:', error)
      return false // 返回失败状态
    }
  }

  return {
    formState,
    setFormState,
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
    saveEdit
  }
}
