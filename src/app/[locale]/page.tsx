'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/navigation/Navbar'
import { Profile, Testimonial, Activity } from '@/components/profile/types'
import { ProfileCard } from '@/components/profile/ProfileCard'
import { TestimonialCard } from '@/components/profile/TestimonialCard'
import { ActivityCard } from '@/components/profile/ActivityCard'
import { Button } from '@/components/ui/button'
import { Loader2, BookOpen } from 'lucide-react'

export default function ProfilesPage() {
  // 状态管理
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [allActivities, setAllActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 当前选中的简历ID
  const [selectedProfileId, setSelectedProfileId] = useState<string>('')

  // 当前选中的评价和活动
  const [selectedTestimonials, setSelectedTestimonials] = useState<Testimonial[]>([])
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([])

  // 从API获取推荐的个人资料列表
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/profiles')

        if (!response.ok) {
          throw new Error('获取个人资料列表失败')
        }

        const data = await response.json()
        if (data.success) {
          setProfiles(data.data)
        } else {
          throw new Error(data.message || '获取个人资料列表失败')
        }

        // 获取推荐的评价
        const testimonialResponse = await fetch('/api/testimonials')
        if (!testimonialResponse.ok) {
          throw new Error('获取推荐评价失败')
        }

        const testimonialData = await testimonialResponse.json()
        if (testimonialData.success) {
          setTestimonials(testimonialData.data)
        }

        // 从个人资料中提取活动数据
        const extractedActivities: Activity[] = []
        data.data.forEach((profile: Profile) => {
          if (profile.activities && profile.activities.length > 0) {
            extractedActivities.push(...profile.activities)
          }
        })

        // 按时间排序活动，最新的在前
        extractedActivities.sort((a, b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        })

        setAllActivities(extractedActivities)
      } catch (err) {
        console.error('获取数据出错:', err)
        setError(err instanceof Error ? err.message : '获取数据时出错')
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  // 获取当前选中的简历
  const selectedProfile = selectedProfileId ? profiles.find((profile) => profile.id === selectedProfileId) : profiles[0]

  // 当 profiles 加载完成后，初始化选中的简历 ID
  useEffect(() => {
    if (profiles.length > 0 && !selectedProfileId) {
      setSelectedProfileId(profiles[0].id)
    }
  }, [profiles, selectedProfileId])

  // 当选择简历时，更新对应的评价和活动
  useEffect(() => {
    if (selectedProfile) {
      // 使用 profileId 字段获取与选中简历相关的评价
      const relatedTestimonials = testimonials.filter((t) => t.profileId === selectedProfile.id)
      setSelectedTestimonials(relatedTestimonials)

      // 获取与选中简历相关的活动
      if (selectedProfile.activities) {
        setSelectedActivities(selectedProfile.activities)
      } else {
        // 如果选中的简历没有活动数据，从所有活动中过滤
        const relatedActivities = allActivities.filter((a) => a.profileId === selectedProfile.id)
        setSelectedActivities(relatedActivities)
      }
    }
  }, [selectedProfile, testimonials, allActivities])

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container max-w-6xl mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-600">正在加载数据...</p>
          </div>
        </div>
      </div>
    )
  }

  // 如果出错，显示错误信息
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container max-w-6xl mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 font-medium">出错了</p>
            <p className="mt-2 text-gray-600">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              重试
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-black bg-[#f8f8f8] relative overflow-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* 左侧网格 */}
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-[linear-gradient(#e6e6e6_1px,transparent_1px),linear-gradient(90deg,#e6e6e6_1px,transparent_1px)] bg-[size:40px_40px] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(248,248,248,0.3)_0%,rgba(248,248,248,0.5)_30%,#f8f8f8_80%)]"></div>

      {/* 右侧网格 */}
      <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-[linear-gradient(#e6e6e6_1px,transparent_1px),linear-gradient(90deg,#e6e6e6_1px,transparent_1px)] bg-[size:40px_40px] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(270deg,rgba(248,248,248,0.3)_0%,rgba(248,248,248,0.5)_30%,#f8f8f8_80%)]"></div>
      <main className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧简历展示区域 */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* 简历展示 */}
              {selectedProfile ? (
                <ProfileCard profile={selectedProfile} isEditable={false} showEndorsements={false} />
              ) : (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">请选择一个简历查看</div>
              )}

              {/* 相关评价 */}
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">相关评价</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedTestimonials.length > 0 ? (
                    selectedTestimonials.map((testimonial) => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)
                  ) : (
                    <div className="col-span-3 py-10 text-center text-gray-500">暂无相关评价</div>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* 右侧候选人区域 */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold px-2">候选人</h2>

            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow ${selectedProfileId === profile.id ? 'border-2 border-[#cfe7ff]' : ''}`}
                  onClick={() => setSelectedProfileId(profile.id)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                      <Image src={profile.avatar || '/images/default-avatar.png'} alt={profile.name} width={60} height={60} className="w-full h-full object-cover" unoptimized={!profile.avatar} />
                    </div>
                    <div>
                      <h3 className="font-bold">{profile.name}</h3>
                      <p className="text-sm text-gray-600">
                        {profile.title}
                        {profile.company && ` at ${profile.company}`}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{profile.about}</p>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg p-4 text-center text-gray-500">暂无候选人</div>
            )}

            {/* 最近活动 */}
            <div className="mt-6">
              <h2 className="text-xl font-bold px-2 mb-3">最近活动</h2>
              <div className="space-y-3">
                {allActivities.length > 0 ? (
                  selectedProfileId ? (
                    // 显示选中候选人的活动
                    selectedActivities.length > 0 ? (
                      selectedActivities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)
                    ) : (
                      <div className="bg-white rounded-xl p-4 text-center text-gray-500">该候选人暂无活动</div>
                    )
                  ) : (
                    // 未选中候选人时显示所有活动
                    allActivities.slice(0, 3).map((activity) => <ActivityCard key={activity.id} activity={activity} />)
                  )
                ) : (
                  <div className="bg-white rounded-xl p-4 text-center text-gray-500">暂无活动</div>
                )}

                <div className="text-center">
                  <Button variant="ghost" className="text-[#0a66c2] hover:text-[#004182] hover:bg-[#e8f3ff] rounded-full text-sm mt-2">
                    查看所有活动
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
