import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../globals.css'
import { dir } from 'i18next'
import { languages } from '@/i18n/settings'

// 导入客户端i18n实例
import '@/i18n/client'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '简历',
  description: '简历',
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  // 获取当前语言
  const locale = params.locale

  return <div className="locale-layout  ">{children}</div>
}

// 生成静态参数，用于预渲染
export function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}
