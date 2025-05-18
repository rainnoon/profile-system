import { NextResponse } from 'next/server'
import { Profile } from '@/components/profile/types'

// 模拟数据库中的个人资料数据
const profiles: Profile[] = [
  // 第一个用户的资料
  
  {
    id: '1',
    name: '张伟',
    title: '高级AI工程师',
    company: '腾讯科技',
    location: '上海市, 中国',
    connections: '500+',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces',
    about:
      '我是一名拥有8年经验的高级软件工程师，专注于人工智能和机器学习领域。在腾讯科技工作期间，我负责开发和优化多个大型AI项目，包括自然语言处理和计算机视觉应用。我热衷于解决复杂问题，并致力于创建能够改善用户体验的创新技术解决方案。\n\n技术专长: Python, TensorFlow, PyTorch, Java, React, Node.js, 微服务架构, 云计算',
    skills: [
      { name: '设计师', icon: 'Pen', color: 'violet' },
      { name: 'UI/UX', icon: 'Film', color: 'indigo' },
      { name: '动效设计', icon: 'Video', color: 'blue' },
      { name: '摄影师', icon: 'Camera', color: 'sky' },
      { name: '视频创作', icon: 'Youtube', color: 'cyan' },
      { name: '短视频制作', icon: 'FileVideo', color: 'teal' },
      { name: '音频剪辑', icon: 'Music', color: 'green' },
      { name: '音频工程师', icon: 'Headphones', color: 'lime' },
      { name: '科技爱好者', icon: 'Cpu', color: 'amber' },
      { name: '健身', icon: 'Activity', color: 'orange' },
    ],
    experience: [
      {
        title: '高级AI工程师',
        company: '腾讯科技',
        duration: '2018年6月 - 至今',
        location: '上海市, 中国',
        description:
          '• 领导开发了公司核心AI平台，提高了模型训练效率30%\n• 设计并实现了自然语言处理系统，支持多语言文本分析\n• 优化了推荐算法，使用户参与度提高25%\n• 管理5人技术团队，指导初级工程师',
      },
      {
        title: '软件工程师',
        company: '阿里巴巴',
        duration: '2016年7月 - 2018年5月',
        location: '杭州市, 中国',
        description: '• 参与电商平台后端系统开发\n• 实现了高性能数据处理管道\n• 优化了数据库查询，提高了系统响应速度40%',
      },
    ],
    education: [
      {
        school: '上海交通大学',
        degree: '计算机科学与技术学士',
        years: '2012 - 2016',
      },
    ],
    activities: [
      {
        id: '1',
        profileId: '1',
        type: 'article',
        title: '分享了一篇文章：《人工智能在企业应用中的未来趋势》',
        likes: 45,
        comments: 12,
        shares: 8,
        timestamp: '2025-05-15T14:30:00Z'
      },
      {
        id: '4',
        profileId: '1',
        type: 'like',
        title: '赞了一篇文章：《前端开发的最佳实践》',
        timestamp: '2025-05-12T11:20:00Z'
      },
      {
        id: '7',
        profileId: '1',
        type: 'comment',
        title: '评论了文章：《Next.js 应用路由的最佳实践》',
        content: '这篇文章对我们团队的项目架构优化很有帮助，特别是关于路由分组的部分。',
        likes: 12,
        timestamp: '2025-05-08T10:20:00Z'
      }
    ]
  },
  {
    id: '2',
    name: '李明',
    title: '数据科学家',
    company: '阿里巴巴',
    location: '北京市, 中国',
    connections: '400+',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces',
    about:
      '我是一名数据科学家，专注于大数据分析和机器学习算法开发。在阿里巴巴工作期间，我负责开发预测模型和数据可视化工具，帮助业务团队做出数据驱动的决策。我擅长使用Python和R进行数据分析，并且熟悉Hadoop和Spark等大数据处理框架。\n\n技术专长: Python, R, SQL, Hadoop, Spark, 机器学习, 数据可视化',
    skills: [
      { name: '数据分析', icon: 'BarChart', color: 'violet' },
      { name: '机器学习', icon: 'Brain', color: 'indigo' },
      { name: '大数据', icon: 'Database', color: 'blue' },
      { name: 'Python', icon: 'Code', color: 'sky' },
      { name: 'R语言', icon: 'Code2', color: 'cyan' },
      { name: 'SQL', icon: 'Table', color: 'teal' },
      { name: '数据可视化', icon: 'LineChart', color: 'green' },
      { name: '预测分析', icon: 'TrendingUp', color: 'lime' },
      { name: '统计学', icon: 'PieChart', color: 'amber' },
      { name: '深度学习', icon: 'Network', color: 'orange' },
    ],
    experience: [
      {
        title: '高级数据科学家',
        company: '阿里巴巴',
        duration: '2019年3月 - 至今',
        location: '北京市, 中国',
        description:
          '• 开发了客户行为预测模型，提高了营销活动转化率45%\n• 设计并实现了实时数据分析平台，支持每日千万级数据处理\n• 优化了推荐系统算法，提高了点击率20%\n• 领导3人数据分析团队，制定数据分析标准和流程',
      },
      {
        title: '数据分析师',
        company: '百度',
        duration: '2017年5月 - 2019年2月',
        location: '北京市, 中国',
        description: '• 分析用户行为数据，为产品决策提供数据支持\n• 开发数据可视化仪表板，提高数据解读效率\n• 协助优化搜索算法，提高搜索结果相关性',
      },
    ],
    education: [
      {
        school: '北京大学',
        degree: '统计学硕士',
        years: '2015 - 2017',
      },
      {
        school: '清华大学',
        degree: '数学与应用数学学士',
        years: '2011 - 2015',
      },
    ],
    activities: [
      {
        id: '2',
        profileId: '2',
        type: 'share',
        title: '分享了一篇文章：《数据科学与机器学习的区别》',
        likes: 23,
        comments: 5,
        timestamp: '2025-05-14T09:15:00Z'
      },
      {
        id: '5',
        profileId: '2',
        type: 'article',
        title: '发表了文章：《React 18 新特性解析》',
        content: '本文详细介绍了 React 18 的并发渲染机制和自动批处理功能...',
        likes: 67,
        comments: 15,
        shares: 22,
        timestamp: '2025-05-10T08:30:00Z'
      }
    ]
  },
  {
    id: '3',
    name: '王芳',
    title: 'UI/UX设计师',
    company: '字节跳动',
    location: '上海市, 中国',
    connections: '350+',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces',
    about:
      '我是一名拥有6年经验的UI/UX设计师，专注于移动应用和网站界面设计。在字节跳动工作期间，我负责多个热门应用的用户界面设计和用户体验优化。我擅长使用Figma、Sketch和Adobe XD等设计工具，并且熟悉前端开发技术，能够与开发团队紧密合作。\n\n专长: UI设计, UX设计, 交互设计, 原型设计, 用户研究',
    skills: [
      { name: 'UI设计', icon: 'Palette', color: 'violet' },
      { name: 'UX设计', icon: 'Users', color: 'indigo' },
      { name: '交互设计', icon: 'MousePointer', color: 'blue' },
      { name: '原型设计', icon: 'Layers', color: 'sky' },
      { name: 'Figma', icon: 'Figma', color: 'cyan' },
      { name: 'Sketch', icon: 'PenTool', color: 'teal' },
      { name: 'Adobe XD', icon: 'Square', color: 'green' },
      { name: '用户研究', icon: 'Search', color: 'lime' },
      { name: '视觉设计', icon: 'Eye', color: 'amber' },
      { name: '品牌设计', icon: 'Award', color: 'orange' },
    ],
    experience: [
      {
        title: '高级UI/UX设计师',
        company: '字节跳动',
        duration: '2020年4月 - 至今',
        location: '上海市, 中国',
        description:
          '• 负责多个热门应用的界面设计和用户体验优化\n• 建立了公司设计系统，提高了设计一致性和开发效率\n• 主导用户研究项目，收集和分析用户反馈\n• 与产品和开发团队紧密合作，确保设计的高质量实现',
      },
      {
        title: 'UI设计师',
        company: '网易',
        duration: '2017年8月 - 2020年3月',
        location: '杭州市, 中国',
        description: '• 负责游戏界面和网站设计\n• 参与品牌视觉识别系统的开发\n• 创建了用户界面组件库，提高了设计效率',
      },
    ],
    education: [
      {
        school: '中国美术学院',
        degree: '视觉传达设计学士',
        years: '2013 - 2017',
      },
    ],
    activities: [
      {
        id: '3',
        profileId: '3',
        type: 'comment',
        title: '评论了文章：《云计算的未来发展方向》',
        content: '这篇文章提供了很多有价值的见解，特别是关于多云策略的部分。',
        likes: 8,
        timestamp: '2025-05-13T16:45:00Z'
      },
      {
        id: '6',
        profileId: '3',
        type: 'share',
        title: '分享了一篇文章：《TypeScript 5.0 新特性》',
        likes: 18,
        comments: 3,
        timestamp: '2025-05-09T13:45:00Z'
      }
    ]
  },
]

export async function GET() {
  // 模拟API延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    data: profiles,
  })
}
