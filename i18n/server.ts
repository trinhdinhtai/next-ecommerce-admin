import { createInstance } from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import { initReactI18next } from "react-i18next/initReactI18next"

import { getOptions } from "./settings"

const initI18next = async (locale: any, namespace: any) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: any, namespace: any) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(locale, namespace))
  return i18nInstance
}

export async function useTranslation(
  locale: any,
  namespace?: any,
  options?: any
) {
  const i18nextInstance = await initI18next(locale, namespace)
  return {
    t: i18nextInstance.getFixedT(
      locale,
      Array.isArray(namespace) ? namespace[0] : namespace,
      options?.keyPrefix
    ),
    i18n: i18nextInstance,
  }
}
