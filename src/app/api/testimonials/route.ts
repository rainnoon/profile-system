import { NextResponse } from 'next/server'
import { Testimonial } from '@/components/profile/types'

// 模拟数据库中的推荐评价数据
const testimonials: Testimonial[] = [
  // 张伟的评价 - 只保疘3个
  {
    id: '1',
    name: '王芳',
    title: 'UI/UX设计师',
    company: '字节跳动',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces',
    quote: '张伟是我合作过的最优秀的工程师之一。他不仅技术精湛，而且能够深入理解业务需求，提供创新的技术解决方案。他开发的AI模型大大提高了我们产品的用户体验。',
    relation: '前同事',
    profileId: '1',
  },
  {
    id: '2',
    name: '陈强',
    title: '技术总监',
    company: '腾讯科技',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces',
    quote: '作为张伟的直接上级，我对他的工作表现非常满意。他不仅能够独立完成复杂的技术任务，还能够带领团队攻克难题。他的代码质量和文档编写都很出色，是团队中的技术核心。',
    relation: '上级',
    profileId: '1',
  },
  {
    id: '6',
    name: '张明',
    title: '创始人兼CEO',
    company: '星辰科技',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    quote: '张伟在我们公司担任技术顾问期间，为我们的AI战略提供了宝贵的指导。他的专业知识和行业洞察力帮助我们避开了许多潜在的技术陷阱，加速了我们产品的开发进程。',
    relation: '客户',
    profileId: '1',
  },

  // 李明的评价 - 只保疘3个
  {
    id: '3',
    name: '刘洋',
    title: 'UI设计师',
    company: '阿里巴巴',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    quote: '李明是一位出色的数据科学家。他能够将复杂的数据分析结果转化为直观的可视化，帮助我们更好地理解用户行为。他的专业知识和耐心解释使我们的产品设计更加数据驱动。',
    relation: '合作伙伴',
    profileId: '2',
  },
  {
    id: '5',
    name: '林伟',
    title: '产品总监',
    company: '百度',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
    quote: '李明的数据分析能力令人印象深刻。他能够从海量数据中提取有价值的见解，为我们的产品决策提供了坚实的数据支持。他的工作直接促成了我们产品转化率的显著提升。',
    relation: '客户',
    profileId: '2',
  },
  {
    id: '9',
    name: '王健',
    title: '数据工程师',
    company: '阿里巴巴',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces',
    quote: '作为李明的同事，我见证了他在数据科学领域的专业素养。他总是能够从复杂的数据中找出关键洞察，并将其转化为可行的业务策略。他的团队协作能力也非常强，总是乐于分享知识和经验。',
    relation: '同事',
    profileId: '2',
  },

  // 王芳的评价 - 只保疘3个
  {
    id: '4',
    name: '赵静',
    title: '前端开发主管',
    company: '网易',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    quote: '王芳是一位才华横溢的设计师，她的设计不仅美观，而且考虑了用户体验的各个方面。她能够理解开发的限制，提供既美观又可实现的设计方案。与她合作是一种享受。',
    relation: '同事',
    profileId: '3',
  },
  {
    id: '10',
    name: '李强',
    title: '产品经理',
    company: '字节跳动',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces',
    quote: '王芳的设计作品总是能够准确地传达产品理念，并且兼顾美观和实用。她对用户需求有着敏锐的洞察力，能够设计出既符合品牌调性又满足用户需求的界面。她的专业态度和创新精神让她在团队中脱颖而出。',
    relation: '同事',
    profileId: '3',
  },
  {
    id: '11',
    name: '陈丽',
    title: '市场专员',
    company: '字节跳动',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
    quote: '王芳为我们的营销活动设计了一系列视觉材料，这些设计不仅吸引了大量用户关注，还提升了品牌形象。她对细节的关注和对品牌一致性的把握让我印象深刻。她的设计为我们的活动成功做出了重要贡献。',
    relation: '同事',
    profileId: '3',
  },
]

export async function GET() {
  // 模拟API延迟
  await new Promise((resolve) => setTimeout(resolve, 800))

  return NextResponse.json({
    success: true,
    data: testimonials,
  })
}
