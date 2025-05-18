'use client'

import { ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18next from './client'
import { useRouter, usePathname } from 'next/navigation'

interface I18nProviderProps {
  children: ReactNode
  locale: string
}

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 当语言变化时，更新i18next实例的语言
    if (i18next.language !== locale) {
      i18next.changeLanguage(locale)
    }

    // 更新localStorage中的语言设置
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', locale)
    }
  }, [locale])

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}
