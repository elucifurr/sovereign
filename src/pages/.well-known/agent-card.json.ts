import { SITE_CONFIG } from "@/config/site"

export async function GET() {
  const body = {
    name: "M2 Content",
    version: "1.0.0",
    description:
      "Read-only public content discovery for M2, a personal blog about digital sovereignty.",
    url: SITE_CONFIG.url,
    supportedInterfaces: [
      {
        transport: "https",
        url: `${SITE_CONFIG.url}/llms.txt`,
      },
    ],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    skills: [
      {
        id: "m2-content",
        name: "M2 Content Discovery",
        description:
          "Find public posts, locale routes, RSS feeds, and machine-readable content indexes.",
      },
    ],
  }

  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/json" },
  })
}
