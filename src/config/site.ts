export type HomepageLayout = "cover" | "archive" | "text"

function normalizeGoogleTagManagerId(value: string | undefined): string {
  const id = (value ?? "").trim()
  return /^GTM-[A-Z0-9]+$/i.test(id) ? id.toUpperCase() : ""
}

const googleTagManagerId = normalizeGoogleTagManagerId(
  import.meta.env.PUBLIC_GTM_ID ?? "GTM-5QW2732G"
)

export const SITE_CONFIG = {
  name: "Polyglow",
  url: (
    import.meta.env.PUBLIC_SITE_URL ?? "https://polyglow.realrip.com"
  ).replace(/\/$/, ""),
  description:
    "A multilingual Astro content site with glassmorphism cards and static publishing.",
  repository: "https://github.com/realriplab/Polyglow",
  social: {
    x: "https://x.com/realriplabs",
  },
  defaultOgImage: "/open-graph.webp",
  homepage: {
    layout: "cover" as HomepageLayout,
  },
  analytics: {
    googleTagManager: {
      enabled: import.meta.env.PUBLIC_GTM_ENABLED === "true",
      containerId: googleTagManagerId,
    },
  },
}
