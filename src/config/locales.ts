export const LOCALES = [
  "en",
  "es",
] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"

export type LocaleMeta = {
  code: Locale
  nativeName: string
  label: string
  hreflang: string
  ogLocale: string
  dir: "ltr" | "rtl"
  searchHint: string
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: {
    code: "en",
    nativeName: "English",
    label: "English",
    hreflang: "en-US",
    ogLocale: "en_US",
    dir: "ltr",
    searchHint: "Search across posts and pages.",
  },
  es: {
    code: "es",
    nativeName: "Español",
    label: "Spanish",
    hreflang: "es-ES",
    ogLocale: "es_ES",
    dir: "ltr",
    searchHint: "Buscar en artículos y páginas.",
  },
}

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale)
}

export function getLocaleMeta(locale: Locale): LocaleMeta {
  return LOCALE_META[locale]
}
