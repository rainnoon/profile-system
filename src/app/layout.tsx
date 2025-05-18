import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { dir } from 'i18next'
import { languages } from '@/i18n/settings'
import { Footer } from '@/components/layout'

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

export function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params?: { locale?: string }
}>) {
  // 获取当前语言，如果没有则使用默认语言
  const locale = params?.locale || 'zh'

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`antialiased min-h-screen flex flex-col`}>
        <main className="flex-grow pt-[60px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
