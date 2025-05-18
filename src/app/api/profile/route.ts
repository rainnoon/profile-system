import { NextResponse } from 'next/server';

// 模拟数据 - 个人资料
const profileData = {
  id: '0',
  name: '张三',
  title: '高级前端工程师',
  company: 'ABC科技有限公司',
  location: '上海市',
  connections: '500+',
  about:
    '我是一名具有五年经验的前端开发工程师，专注于构建高性能、可访问的Web应用。我的技能包括 React、Vue、TypeScript 和现代前端工具链。\n\n我喜欢解决复杂的技术问题，并且有强烈的团队协作精神。在业余时间，我喜欢探索新的前端技术和开源项目。',
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
      title: '高级前端开发工程师',
      company: 'ABC科技有限公司',
      duration: '2020年 - 至今',
      location: '上海市',
      description:
        '负责公司核心产品的前端开发工作，使用React和TypeScript构建高性能的Web应用。\n\n主导了多个前端项目，优化了应用性能，提高了用户体验。\n\n与设计师和后端开发密切合作，确保产品的高质量交付。',
    },
    {
      title: '前端开发工程师',
      company: 'XYZ互联网有限公司',
      duration: '2018年 - 2020年',
      location: '北京市',
      description: '使用Vue.js和Webpack开发和维护多个前端项目。\n\n实现了响应式设计，确保应用在各种设备上的良好体验。\n\n参与了前端框架的迁移和升级工作。',
    },
  ],
  education: [
    {
      school: '上海大学',
      degree: '计算机科学与技术学士',
      years: '2014 - 2018',
    },
  ],
};

// GET 请求处理函数 - 获取个人资料
export async function GET() {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({ 
    success: true, 
    data: profileData 
  });
}

// PUT 请求处理函数 - 更新个人资料
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 在实际应用中，这里会更新数据库
    // 这里我们只是返回提交的数据作为模拟
    
    return NextResponse.json({ 
      success: true, 
      message: '个人资料更新成功',
      data: { ...profileData, ...body } 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '更新失败，请检查提交的数据' },
      { status: 400 }
    );
  }
}
