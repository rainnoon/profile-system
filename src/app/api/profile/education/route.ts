import { NextResponse } from 'next/server';

// 模拟数据 - 教育经历列表
const educationData = [
  {
    id: '1',
    school: '上海大学',
    degree: '计算机科学与技术学士',
    years: '2014 - 2018',
    description: '主修计算机科学与技术，辅修人工智能。参与多个校园技术项目，获得优秀毕业生称号。'
  }
];

// GET 请求处理函数 - 获取教育经历列表
export async function GET() {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 350));
  
  return NextResponse.json({ 
    success: true, 
    data: educationData 
  });
}

// POST 请求处理函数 - 添加新教育经历
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 550));
    
    // 验证提交的数据
    if (!body.school || !body.degree || !body.years) {
      return NextResponse.json(
        { success: false, message: '教育经历信息不完整' },
        { status: 400 }
      );
    }
    
    // 生成唯一ID (在实际应用中通常由数据库生成)
    const newId = (Math.max(...educationData.map(edu => parseInt(edu.id))) + 1).toString();
    
    // 模拟添加教育经历
    const newEducation = {
      id: newId,
      school: body.school,
      degree: body.degree,
      years: body.years,
      description: body.description || ''
    };
    
    // 在实际应用中，这里会更新数据库
    // 这里我们只是返回提交的数据作为模拟
    
    return NextResponse.json({ 
      success: true, 
      message: '教育经历添加成功',
      data: newEducation
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '添加失败，请检查提交的数据' },
      { status: 400 }
    );
  }
}

// PUT 请求处理函数 - 更新教育经历
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 480));
    
    // 验证提交的数据
    if (!body.id || !body.school || !body.degree || !body.years) {
      return NextResponse.json(
        { success: false, message: '教育经历信息不完整' },
        { status: 400 }
      );
    }
    
    // 在实际应用中，这里会更新数据库中的记录
    // 这里我们只是返回提交的数据作为模拟
    
    return NextResponse.json({ 
      success: true, 
      message: '教育经历更新成功',
      data: body
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '更新失败，请检查提交的数据' },
      { status: 400 }
    );
  }
}

// DELETE 请求处理函数 - 删除教育经历
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 420));
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: '请提供要删除的教育经历ID' },
        { status: 400 }
      );
    }
    
    // 在实际应用中，这里会从数据库中删除
    // 这里我们只是返回成功消息作为模拟
    
    return NextResponse.json({ 
      success: true, 
      message: `ID为 "${id}" 的教育经历已成功删除`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '删除失败，请稍后重试' },
      { status: 500 }
    );
  }
}
