import type { InitOptions } from 'i18next'

export const fallbackLng = 'zh'
export const languages = ['zh', 'en', 'ja']
export const defaultNS = 'common'

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS): InitOptions {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
