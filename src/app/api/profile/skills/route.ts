import { NextResponse } from 'next/server';

// 模拟数据 - 技能列表
const skillsData = [
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
];

// 推荐技能列表 - 用于"添加技能"功能
const recommendedSkills = [
  { name: 'React', icon: 'Code', color: 'blue' },
  { name: 'Vue.js', icon: 'Code', color: 'green' },
  { name: 'TypeScript', icon: 'FileCode', color: 'indigo' },
  { name: 'JavaScript', icon: 'FileCode', color: 'yellow' },
  { name: 'HTML/CSS', icon: 'Layout', color: 'orange' },
  { name: 'Node.js', icon: 'Server', color: 'green' },
  { name: 'Next.js', icon: 'Code', color: 'black' },
  { name: '微信小程序', icon: 'MessageSquare', color: 'green' },
  { name: '前端性能优化', icon: 'Zap', color: 'yellow' },
  { name: '响应式设计', icon: 'Smartphone', color: 'purple' },
  { name: 'UI设计', icon: 'Palette', color: 'pink' },
  { name: '用户体验', icon: 'Users', color: 'blue' },
];

// GET 请求处理函数 - 获取技能列表
export async function GET() {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json({ 
    success: true, 
    data: skillsData,
    recommended: recommendedSkills
  });
}

// POST 请求处理函数 - 添加新技能
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 验证提交的数据
    if (!body.name || !body.icon || !body.color) {
      return NextResponse.json(
        { success: false, message: '技能信息不完整' },
        { status: 400 }
      );
    }
    
    // 模拟添加技能
    const newSkill = {
      name: body.name,
      icon: body.icon,
      color: body.color
    };
    
    // 在实际应用中，这里会更新数据库
    // 这里我们只是返回提交的数据作为模拟
    
    return NextResponse.json({ 
      success: true, 
      message: '技能添加成功',
      data: newSkill
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '添加失败，请检查提交的数据' },
      { status: 400 }
    );
  }
}

// DELETE 请求处理函数 - 删除技能
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const skillName = searchParams.get('name');
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (!skillName) {
      return NextResponse.json(
        { success: false, message: '请提供要删除的技能名称' },
        { status: 400 }
      );
    }
    
    // 在实际应用中，这里会从数据库中删除
    // 这里我们只是返回成功消息作为模拟
    
    return NextResponse.json({ 
      success: true, 
      message: `技能 "${skillName}" 已成功删除`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '删除失败，请稍后重试' },
      { status: 500 }
    );
  }
}
