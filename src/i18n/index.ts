import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

export default async function initTranslations(locale: string, namespaces: string[]) {
  const i18nInstance = createInstance()

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        return import(`../../public/locales/${language}/${namespace}.json`)
      })
    )
    .init(getOptions(locale, namespaces))

  return {
    i18n: i18nInstance,
    t: i18nInstance.getFixedT(locale, namespaces[0]),
  }
}
