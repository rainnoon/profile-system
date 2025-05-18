import { NextResponse } from 'next/server';

// 模拟数据 - 工作经验列表
const experienceData = [
  {
    id: '1',
    title: '高级前端开发工程师',
    company: 'ABC科技有限公司',
    duration: '2020年 - 至今',
    location: '上海市',
    description:
      '负责公司核心产品的前端开发工作，使用React和TypeScript构建高性能的Web应用。\n\n主导了多个前端项目，优化了应用性能，提高了用户体验。\n\n与设计师和后端开发密切合作，确保产品的高质量交付。',
  },
  {
    id: '2',
    title: '前端开发工程师',
    company: 'XYZ互联网有限公司',
    duration: '2018年 - 2020年',
    location: '北京市',
    description: '使用Vue.js和Webpack开发和维护多个前端项目。\n\n实现了响应式设计，确保应用在各种设备上的良好体验。\n\n参与了前端框架的迁移和升级工作。',
  },
];

// GET 请求处理函数 - 获取工作经验列表
export async function GET() {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return NextResponse.json({ 
    success: true, 
    data: experienceData 
  });
}

// POST 请求处理函数 - 添加新工作经验
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // 验证提交的数据
    if (!body.title || !body.company || !body.duration) {
      return NextResponse.json(
        { success: false, message: '工作经验信息不完整' },
        { status: 400 }
      );
    }
    
    // 生成唯一ID (在实际应用中通常由数据库生成)
    const newId = (Math.max(...experienceData.map(exp => parseInt(exp.id))) + 1).toString();
    
    // 模拟添加工作经验
    const newExperience = {
      id: newId,
      title: body.title,
      company: body.company,
      duration: body.duration,
      location: body.location || '',
      description: body.description || ''
    };
    
    // 在实际应用中，这里会更新数据库
    // 这里我们只是返回提交的数据作为模拟
    
    return NextResponse.json({ 
      success: true, 
      message: '工作经验添加成功',
      data: newExperience
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '添加失败，请检查提交的数据' },
      { status: 400 }
    );
  }
}

// PUT 请求处理函数 - 更新工作经验
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 验证提交的数据
    if (!body.id || !body.title || !body.company || !body.duration) {
      return NextResponse.json(
        { success: false, message: '工作经验信息不完整' },
        { status: 400 }
      );
    }
    
    // 在实际应用中，这里会更新数据库中的记录
    // 这里我们只是返回提交的数据作为模拟
    
    return NextResponse.json({ 
      success: true, 
      message: '工作经验更新成功',
      data: body
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '更新失败，请检查提交的数据' },
      { status: 400 }
    );
  }
}

// DELETE 请求处理函数 - 删除工作经验
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 450));
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: '请提供要删除的工作经验ID' },
        { status: 400 }
      );
    }
    
    // 在实际应用中，这里会从数据库中删除
    // 这里我们只是返回成功消息作为模拟
    
    return NextResponse.json({ 
      success: true, 
      message: `ID为 "${id}" 的工作经验已成功删除`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '删除失败，请稍后重试' },
      { status: 500 }
    );
  }
}
