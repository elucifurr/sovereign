export type HomepageLayout = "cover" | "archive" | "text"
export type RemoteImagePattern = {
  protocol: "https"
  hostname: string
}

function readPublicEnv(name: string): string | undefined {
  const importMetaEnv = (
    import.meta as ImportMeta & { env?: Record<string, string | undefined> }
  ).env
  const nodeEnv = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> }
    }
  ).process?.env

  return importMetaEnv?.[name] ?? nodeEnv?.[name]
}

function normalizePublicString(value: string | undefined): string {
  return (value ?? "").trim()
}

function hostnameFromUrl(value: string): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === "https:" ? url.hostname : undefined
  } catch {
    return undefined
  }
}

const publicAssetBaseUrl = normalizePublicString(
  readPublicEnv("PUBLIC_ASSET_BASE_URL")
).replace(/\/$/, "")
const publicAssetHost = hostnameFromUrl(publicAssetBaseUrl)
const socialMastodonUrl = "https://mastodon.social"

export const SITE_CONFIG = {
  name: "Mario Segundo",
  url: (
    readPublicEnv("PUBLIC_SITE_URL") ?? "https://m2by.me"
  ).replace(/\/$/, ""),
  description:
    "How software design, infrastructure, and regulation affect personal autonomy.",
  repository: "https://github.com/elucifurr/sovereign",
  social: {
    mastodon: socialMastodonUrl,
    bluesky: "https://bsky.app",
    github: "https://github.com/elucifurr",
  },
  defaultOgImage: "/open-graph.webp",
  assets: {
    publicBaseUrl: publicAssetBaseUrl,
    remotePatterns: [
      ...(publicAssetHost
        ? [{ protocol: "https", hostname: publicAssetHost } as const]
        : []),
      { protocol: "https", hostname: "*.unsplash.com" },
    ] satisfies RemoteImagePattern[],
    unsplashImageHost: "images.unsplash.com",
  },
  homepage: {
    layout: "cover" as HomepageLayout,
  },
}
