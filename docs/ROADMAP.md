# Roadmap: sovereign — De plantilla Polyglow a blog personal

**Proyecto:** sovereign  
**Autor:** M. Segundo  
**Origen:** Polyglow (plantilla editorial Astro 6)  
**Repositorio:** `https://github.com/elucifurr/sovereign`  
**Propósito editorial:** Cómo las decisiones de diseño de software, infraestructura y regulación afectan a la autonomía de las personas.

---

## Hecho

### Fase 0 — Configuración Base ✅

- [x] **package.json**: `name` → `"sovereign"`. `repository`, `bugs`, `homepage` → `elucifurr/sovereign`.
- [x] **src/config/site.ts**:
  - `name` → `"M. Segundo"`
  - `description` → `"How software design, infrastructure, and regulation affect personal autonomy."`
  - `url` → `https://sovereign.zbz.ai` (placeholder)
  - `repository` → `https://github.com/elucifurr/sovereign`
  - `social.x` → limpiado (placeholder pendiente de Mastodon/Bluesky)
- [x] **src/config/locales.ts**: Reducido a solo `["en", "es"]`.
- [x] **src/i18n/**: Eliminados 9 archivos de idiomas. Solo `en.json` y `es.json`.
- [x] **astro.config.mjs**:
  - `i18n.locales` → `["en", "es"]`
  - `sitemapLocaleMap` → solo `en`, `es`
  - `sitemapExcludedPathPatterns` → limpiado (sin market/placeholder)
- [x] **.env.example**: `PUBLIC_SITE_URL` actualizado.
- [x] **src/content.config.ts**: Se adapta automáticamente al nuevo `LOCALES`.
- [x] Eliminados archivos de contenido de 9 idiomas (posts, pages, authors).
- [x] Limpiados `LanguageSwitcher.astro` y `TableOfContents.astro` (flags/titles hardcodeados).

### Fase 1 — Taxonomía ✅

- [x] **src/config/taxonomy.ts**: Reemplazado completamente.

  Categorías:
  | slug | labelEn | labelEs | order |
  |------|---------|---------|-------|
  | soberania | Sovereignty | Soberanía | 0 |
  | sistemas | Systems | Sistemas | 1 |
  | entornos | Environments | Entornos | 2 |

  Tags:
  - `soberania` → regulacion, privacidad, plataformas, protocolos-abiertos, dependencia-tecnologica
  - `sistemas` → linux, infraestructura, devops, arquitectura, protocolos, automatizacion
  - `entornos` → herramientas, self-hosting, ia-aplicada, workflow, grapheneos

- [x] **src/i18n/en.json** y **src/i18n/es.json**:
  - `site.name`, `site.titleTemplate`, `site.description` actualizados
  - `site.twitter.*` → placeholder @msegundo
  - `categories.*` → soberania, sistemas, entornos
  - `tags.*` → nuevas 16 tags
  - `headings.*` → nuevos títulos y subtítulos
  - `navigation.*` → las 3 categorías

### Fase 2 — Autor y Páginas Estáticas ✅

- [x] **src/content/authors/en/default.md**: Mario Segundo, bio, GitHub y RSS.
- [x] **src/content/authors/es/default.md**: Ídem traducido.
- [x] **src/content/pages/en/about.md**: Bio real del autor.
- [x] **src/content/pages/es/about.md**: Bio traducida.
- [x] **src/content/pages/en/contact.md**: Email hello@msegundo.dev.
- [x] **src/content/pages/es/contact.md**: Email hello@msegundo.dev.
- [x] **src/content/pages/en/privacy-policy.md**: Actualizada.
- [x] **src/content/pages/es/privacy-policy.md**: Actualizada.
- [x] **src/content/pages/en/terms-of-service.md**: Actualizados.
- [x] **src/content/pages/es/terms-of-service.md**: Actualizados.
- [x] Eliminadas páginas de los 9 idiomas eliminados.
- [x] `src/pages/[lang]/author.astro`: Limpiado SEO hardcodeado ("Rip").

### Fase 3 — Revisión de Posts Demo ✅

- [x] **20 artículos editoriales**: Marcados como `draft: true`. Ninguno se adapta al nuevo eje editorial (eran demo sobre agricultura/startup china).
- [x] **10 placeholders**: Eliminados.
- [x] Posts de 9 idiomas eliminados.

---

## Por hacer

### Fase 4 — Branding y Documentación ✅

- [x] **README.md**: Reescribir para sovereign.
- [x] **readme-zh.md**: Eliminar.
- [x] **AGENTS.md**: Actualizar propósito y descripción (locales en/es, sin readme-zh).
- [x] **DESIGN.md**: Actualizar frontmatter (`name`, `description`), limpiar referencias CJK/RTL/11 locales.
- [x] **public/favicon.svg**: Reemplazar con monograma "S" minimalista.
- [ ] **public/open-graph.webp**: Conservar temporalmente.
- [x] **src/assets/logo.svg**: Reemplazar con monograma "S" minimalista.
- [ ] **src/assets/author.avif**: Conservar temporalmente.
- [x] **public/lighthouse-score-*.svg**: Eliminar.
- [x] **public/agent-readiness-*.avif**: Eliminar.

### Fase 5 — Contenido Real ✅

- [x] **Post inaugural**: "Sovereignty in Software" / "Soberanía en el software" (en/es, publicado, featured).
- [x] **4 posts adicionales**:
  - "Platform Risk" / "Riesgo de plataforma" — soberania (18 jun)
  - "Linux and the Architecture of Autonomy" / "Linux y la arquitectura de la autonomía" — sistemas (22 jun)
  - "Self-Hosting as Infrastructure" / "El autohosting como infraestructura" — entornos (25 jun)
  - "The Protocol Layer" / "La capa de protocolos" — sistemas (29 jun)
- [ ] Escribir siguientes posts.
- [ ] Configurar dominio definitivo.
- [ ] Despliegue y CI/CD.

---

## Pendiente de Decidir

| Tema | Estado |
|------|--------|
| Red social (Mastodon vs Bluesky) | Sin decidir |
| Dominio | Sin decidir |
| x402, AdSense, GTM, well-known | Mantener por ahora, revisar después |
| Cloudflare Workers vs static hosting | Pendiente de explorar |
| Email de contacto | Usar hello@msegundo.dev mientras tanto |

---

## Notas

- No eliminar infraestructura x402, GTM, AdSense, well-known hasta nueva decisión.
- No eliminar partytown, wrangler, solana, hono, x402 de dependencias aún.
- El despliegue con Cloudflare Workers se discutirá más adelante.
- Build verificado: 62 páginas, 0 errores.
