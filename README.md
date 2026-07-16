# Interact Technology Solutions — 2026 Redesign

A premium, enterprise-grade redesign of [interactts.com](https://www.interactts.com/).
**Presentation layer only** — 100% of the original content, data, numbers, clients,
partners, services, products, awards and contact information are preserved verbatim.

## Tech
Static, dependency-free HTML/CSS/JS — chosen for top-tier performance (fast LCP,
zero framework hydration, near-zero JS), perfect Lighthouse potential, and easy hosting.

- **CSS**: `assets/css/styles.css` — design-system tokens, components, responsive rules.
- **JS**: `assets/js/main.js` — sticky nav, mobile menu, scroll reveal (IntersectionObserver),
  animated counters, progressive form validation. Respects `prefers-reduced-motion`.
- **Fonts**: Inter (body) + Space Grotesk (headings) via Google Fonts.
- **Icons**: inline SVG (Lucide-style), no icon font.

## Design system
| Token | Value |
|-------|-------|
| Primary | `#0F172A` |
| Secondary | `#1E3A8A` |
| Accent | `#2563EB` |
| Success | `#10B981` |
| Background | `#F8FAFC` |
| Cards | `#FFFFFF` |
| Borders | `#E2E8F0` |
| Radius | 10–24px |

## Pages (13)
`index.html`, `corporate-profile.html`, `solutions.html`, `products.html`,
`services.html`, `industries.html`, `partners.html`, `clients.html`,
`certificates-and-awards.html`, `contact.html`, `news.html`, `events.html`,
`case-studies.html`. Careers and Open Ticket link to the original external destinations.

## Build
Shared header/footer/head are partials in `build/`. To regenerate the interior pages:

```bash
node build/build.js
```

`index.html` and `corporate-profile.html` are authored directly. The `build/` folder is
source only — the deliverable is the static files at the project root.

## Local preview
```bash
python -m http.server 8099
# open http://localhost:8099/index.html
```

## Content integrity
- Client logos: 50 · Partner logos: 19 · Certificates: 11 · Industries: 24 · Timeline: 1996–2017
- Fact Sheet: Partnerships 25 · Solutions 64 · Industries 35 · Customers 1200 · Products 500
- All logos/certificates reference the original Interact media URLs (not replaced).
