import { NextRequest, NextResponse } from 'next/server'
import { languages, fallbackLng } from './i18n/settings'

// 获取请求的语言
function getLocale(request: NextRequest) {
  // 从 cookie 或 localStorage 中获取语言设置
  const cookieLang = request.cookies.get('i18nextLng')?.value
  
  // 如果有 cookie 设置并且是支持的语言，则使用它
  if (cookieLang && languages.includes(cookieLang)) {
    return cookieLang
  }
  
  // 否则，尝试从 Accept-Language 头部获取语言
  const acceptLang = request.headers.get('Accept-Language')
  if (acceptLang) {
    const parsedLangs = acceptLang.split(',').map(lang => lang.split(';')[0].trim())
    
    // 查找第一个支持的语言
    for (const lang of parsedLangs) {
      const shortLang = lang.substring(0, 2) // 取前两个字符作为语言代码
      if (languages.includes(shortLang)) {
        return shortLang
      }
    }
  }
  
  // 如果都没有匹配，返回默认语言
  return fallbackLng
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 忽略静态资源和API路由
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/static/') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg')
  ) {
    return
  }
  
  // 检查路径是否已经包含语言前缀
  const pathnameIsMissingLocale = languages.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  
  // 如果路径已经包含语言前缀，则不做任何处理
  if (!pathnameIsMissingLocale) return
  
  // 获取请求的语言
  const locale = getLocale(request)
  
  // 创建新的 URL，添加语言前缀
  const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url)
  
  // 保留查询参数
  newUrl.search = request.nextUrl.search
  
  // 重定向到新 URL
  return NextResponse.redirect(newUrl)
}

// 配置中间件匹配的路径
export const config = {
  // 匹配所有路径，除了 _next 和 api 路由，以及静态文件
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)']
}
