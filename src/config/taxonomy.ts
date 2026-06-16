import type { Locale } from "./locales"

type LocalizedText = Record<Locale, string>

export type TaxonomyItem = {
  slug: string
  order: number
  labelByLocale: LocalizedText
  descriptionByLocale: LocalizedText
}

const localized = (text: LocalizedText): LocalizedText => text

export const TAXONOMY = {
  categories: [
    {
      slug: "soberania",
      order: 0,
      labelByLocale: localized({
        en: "Sovereignty",
        es: "Soberanía",
      }),
      descriptionByLocale: localized({
        en: "Impact, consequences, and analysis of technological and regulatory decisions.",
        es: "Impacto, consecuencias y análisis de las decisiones tecnológicas y regulatorias.",
      }),
    },
    {
      slug: "sistemas",
      order: 1,
      labelByLocale: localized({
        en: "Systems",
        es: "Sistemas",
      }),
      descriptionByLocale: localized({
        en: "Architecture, protocols, and design decisions in software and infrastructure.",
        es: "Arquitectura, protocolos y decisiones de diseño en software e infraestructura.",
      }),
    },
    {
      slug: "entornos",
      order: 2,
      labelByLocale: localized({
        en: "Environments",
        es: "Entornos",
      }),
      descriptionByLocale: localized({
        en: "Practical implementation, tools, and real-world experience.",
        es: "Implementación práctica, herramientas y experiencia real.",
      }),
    },
  ],
  tags: [
    {
      slug: "regulacion",
      order: 0,
      labelByLocale: localized({
        en: "Regulation",
        es: "Regulación",
      }),
      descriptionByLocale: localized({
        en: "Technology regulation, digital rights, and legal frameworks.",
        es: "Regulación tecnológica, derechos digitales y marcos legales.",
      }),
    },
    {
      slug: "privacidad",
      order: 1,
      labelByLocale: localized({
        en: "Privacy",
        es: "Privacidad",
      }),
      descriptionByLocale: localized({
        en: "Privacy, data protection, and surveillance.",
        es: "Privacidad, protección de datos y vigilancia.",
      }),
    },
    {
      slug: "plataformas",
      order: 2,
      labelByLocale: localized({
        en: "Platforms",
        es: "Plataformas",
      }),
      descriptionByLocale: localized({
        en: "Platform dependency, vendor lock-in, and ecosystem effects.",
        es: "Dependencia de plataformas, vendor lock-in y efectos de ecosistema.",
      }),
    },
    {
      slug: "linux",
      order: 5,
      labelByLocale: localized({
        en: "Linux",
        es: "Linux",
      }),
      descriptionByLocale: localized({
        en: "Linux, kernels, distributions, and the open-source ecosystem.",
        es: "Linux, kernels, distribuciones y el ecosistema open-source.",
      }),
    },
    {
      slug: "infraestructura",
      order: 6,
      labelByLocale: localized({
        en: "Infrastructure",
        es: "Infraestructura",
      }),
      descriptionByLocale: localized({
        en: "Infrastructure design, networking, and systems architecture.",
        es: "Diseño de infraestructura, redes y arquitectura de sistemas.",
      }),
    },
    {
      slug: "devops",
      order: 7,
      labelByLocale: localized({
        en: "DevOps",
        es: "DevOps",
      }),
      descriptionByLocale: localized({
        en: "DevOps practices, CI/CD, automation, and operations.",
        es: "Prácticas DevOps, CI/CD, automatización y operaciones.",
      }),
    },
    {
      slug: "arquitectura",
      order: 8,
      labelByLocale: localized({
        en: "Architecture",
        es: "Arquitectura",
      }),
      descriptionByLocale: localized({
        en: "Software architecture, system design, and technical decisions.",
        es: "Arquitectura de software, diseño de sistemas y decisiones técnicas.",
      }),
    },
    {
      slug: "protocolos",
      order: 9,
      labelByLocale: localized({
        en: "Protocols",
        es: "Protocolos",
      }),
      descriptionByLocale: localized({
        en: "Network protocols, encryption, and communication standards.",
        es: "Protocolos de red, cifrado y estándares de comunicación.",
      }),
    },
    {
      slug: "automatizacion",
      order: 10,
      labelByLocale: localized({
        en: "Automation",
        es: "Automatización",
      }),
      descriptionByLocale: localized({
        en: "Automation, scripting, and workflow optimization.",
        es: "Automatización, scripting y optimización de flujos de trabajo.",
      }),
    },
    {
      slug: "herramientas",
      order: 11,
      labelByLocale: localized({
        en: "Tools",
        es: "Herramientas",
      }),
      descriptionByLocale: localized({
        en: "Tools, software, and practical utilities for daily work.",
        es: "Herramientas, software y utilidades para el trabajo diario.",
      }),
    },
    {
      slug: "self-hosting",
      order: 12,
      labelByLocale: localized({
        en: "Self-Hosting",
        es: "Self-Hosting",
      }),
      descriptionByLocale: localized({
        en: "Self-hosting, personal servers, and running your own infrastructure.",
        es: "Self-hosting, servidores personales e infraestructura propia.",
      }),
    },
    {
      slug: "ia-aplicada",
      order: 13,
      labelByLocale: localized({
        en: "Applied AI",
        es: "IA Aplicada",
      }),
      descriptionByLocale: localized({
        en: "Applied AI, LLMs, and practical machine learning in daily work.",
        es: "IA aplicada, LLMs y machine learning práctico en el trabajo diario.",
      }),
    },
    {
      slug: "workflow",
      order: 14,
      labelByLocale: localized({
        en: "Workflow",
        es: "Workflow",
      }),
      descriptionByLocale: localized({
        en: "Personal workflows, productivity, and digital organization.",
        es: "Flujos de trabajo personales, productividad y organización digital.",
      }),
    },
    {
      slug: "grapheneos",
      order: 15,
      labelByLocale: localized({
        en: "GrapheneOS",
        es: "GrapheneOS",
      }),
      descriptionByLocale: localized({
        en: "GrapheneOS, mobile privacy, and secure smartphones.",
        es: "GrapheneOS, privacidad móvil y smartphones seguros.",
      }),
    },
  ],
} as const

const PRIMARY_CATEGORY_SLUGS = ["soberania", "sistemas", "entornos"] as const

const TAGS_BY_CATEGORY: Record<
  (typeof PRIMARY_CATEGORY_SLUGS)[number],
  string[]
> = {
  soberania: ["regulacion", "privacidad", "plataformas", "protocolos"],
  sistemas: ["linux", "infraestructura", "devops", "arquitectura", "protocolos", "automatizacion"],
  entornos: ["herramientas", "self-hosting", "ia-aplicada", "workflow", "grapheneos"],
}

export function getCategory(slug: string): TaxonomyItem | undefined {
  return TAXONOMY.categories.find((item) => item.slug === slug)
}

export function getTag(slug: string): TaxonomyItem | undefined {
  return TAXONOMY.tags.find((item) => item.slug === slug)
}

const normalizeKey = (value: string): string =>
  value.trim().toLowerCase().replace(/[\s_]+/g, "-")

const categoryAliases: Record<string, string> = {}

const tagAliases: Record<string, string> = {}

function buildTaxonomyLookup(
  items: readonly TaxonomyItem[],
  aliases: Record<string, string>
): Map<string, string> {
  const lookup = new Map<string, string>()

  for (const item of items) {
    lookup.set(normalizeKey(item.slug), item.slug)
    lookup.set(normalizeKey(item.labelByLocale.en), item.slug)
  }

  for (const [alias, slug] of Object.entries(aliases)) {
    lookup.set(normalizeKey(alias), slug)
  }

  return lookup
}

const categoryLookup = buildTaxonomyLookup(TAXONOMY.categories, categoryAliases)
const tagLookup = buildTaxonomyLookup(TAXONOMY.tags, tagAliases)

export function normalizeCategorySlug(value: string): string {
  return categoryLookup.get(normalizeKey(value)) ?? normalizeKey(value)
}

export function normalizeTagSlug(value: string): string {
  return tagLookup.get(normalizeKey(value)) ?? normalizeKey(value)
}

export function getPrimaryCategories(): TaxonomyItem[] {
  return PRIMARY_CATEGORY_SLUGS.map((slug) => getCategory(slug)).filter(
    (item): item is TaxonomyItem => Boolean(item)
  )
}

export function getTagsForCategory(slug: string): TaxonomyItem[] {
  const tagSlugs =
    TAGS_BY_CATEGORY[slug as (typeof PRIMARY_CATEGORY_SLUGS)[number]] ?? []
  return tagSlugs
    .map((tagSlug) => getTag(tagSlug))
    .filter((item): item is TaxonomyItem => Boolean(item))
}
