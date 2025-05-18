// 定义技能数据类型
export type Skill = {
  name: string
  icon?: string
  color?: string
}

// 定义工作经历数据类型
export type Experience = {
  id?: string
  title: string
  company: string
  duration: string
  location: string
  description: string
}

// 定义教育经历数据类型
export type Education = {
  id?: string
  school: string
  degree: string
  years: string
  description?: string
}

// 定义简历数据类型
export type Profile = {
  id: string
  name: string
  title: string
  company: string
  location: string
  connections: string
  about: string
  avatar?: string
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  activities?: Activity[]
}

// 定义推荐人数据类型
export type Testimonial = {
  id: string
  name: string
  title: string
  company: string
  avatar: string
  quote: string
  profileId: string
  relation: string
}

// 定义活动数据类型
export type Activity = {
  id: string
  profileId: string
  type: 'article' | 'share' | 'like' | 'comment' | 'post'
  title: string
  content?: string
  likes?: number
  comments?: number
  shares?: number
  timestamp: string
}
