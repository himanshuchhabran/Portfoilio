# Portfolio Website — Implementation Plan

A modern, animated, single-page portfolio website built with vanilla HTML, CSS, and JavaScript. The design follows a warm cream + sky blue + gold color system with clean typography, micro-animations, and a premium feel.

---

## Design System & Color Palette

| Token | Hex | Role |
|---|---|---|
| `--bg-cream` | `#F5EFE6` | Page background, hero, form inputs |
| `--bg-white` | `#FFFFFF` | Navbar, cards, form card |
| `--blue` | `#4AABCA` | Primary CTA, accent text |
| `--gold` | `#C49A2A` | Secondary CTA, eyebrow labels, active nav |
| `--dark` | `#1C1C2E` | Headings, body text, nav links |
| `--grey` | `#555555` | Subtitles, descriptions, disclaimers |
| `--decor` | `#E8DDD0` | Background ornament (opacity 0.4) |

### Typography
- **Primary font**: *Inter* (Google Fonts) — clean, modern sans-serif
- **Accent font**: *Playfair Display* (Google Fonts) — elegant serif for hero headline italic words

### Buttons

| Variant | Background | Text | Border | Radius |
|---|---|---|---|---|
| Blue Filled (Primary) | `#4AABCA` | `#FFFFFF` | none | `999px` |
| Outline (Secondary) | `#FFFFFF` | `#1C1C2E` | `1.5px solid #1C1C2E` | `999px` |
| Gold Filled (Header/Form) | `#C49A2A` | `#FFFFFF` | none | `8px` |

Hover: opacity `0.88` or darken by 10%, with a `0.3s` ease transition.

---

## Sections & Layout

The site is a **single-page** layout with smooth-scroll navigation. Each section is `100vh` or auto-height with generous padding.

### 1. Navigation Bar (sticky)
- **Background**: `#FFFFFF`, 1px bottom border `#1C1C2E` appears on scroll
- **Left**: Logo / name (text-based, styled)
- **Center**: Nav links — Home, About, Projects, Contact
- **Right**: Gold filled CTA button — "Get In Touch"
- **Active state**: Gold underline on current section link (tracked via Intersection Observer)
- **Mobile**: Hamburger menu with slide-in drawer + backdrop blur
- **Animation**: Navbar fades in on load, border appears on scroll with transition

### 2. Hero Section
- **Background**: `#F5EFE6` full-width
- **Layout**: Two-column on desktop (text left, visual right), stacked on mobile
- **Left column**:
  - Eyebrow label in gold: e.g. "CREATIVE DEVELOPER"
  - H1 heading with italic accent words styled differently:
    - *"mind"* in Sky Blue `#4AABCA` (Playfair Display italic)
    - *"body"* in Gold `#C49A2A` (Playfair Display italic)
    - Example: "Crafting digital experiences for *mind* and *body*"
  - Subtitle paragraph in `#555555`
  - Two buttons: Blue filled "View Projects" + Outline "Download CV"
- **Right column**:
  - Abstract decorative illustration / generated hero image
  - Decorative floral/ornament element at `opacity: 0.4` using `#E8DDD0`
- **Animations**:
  - Text slides in from left with staggered fade (`animation-delay`)
  - Image/visual scales in from 0.9 → 1.0 with fade
  - Floating star icon (⭐) in Sky Blue near the heading, gentle `infinite` float animation
  - Subtle parallax on decorative elements during scroll

### 3. About Section
- **Eyebrow**: Gold "ABOUT ME"
- **Layout**: Two-column — image left, text right (reversed on mobile)
- **Content**:
  - Professional photo placeholder (generated image)
  - Bio paragraphs in `#555555`
  - Key stats/highlights row (e.g. "5+ Years Experience", "50+ Projects", "20+ Happy Clients") — animated counter on scroll-into-view
  - Skill tags / tech stack badges with hover glow effect
- **Animations**:
  - Section fades + slides up on scroll (Intersection Observer)
  - Stat counters animate from 0 → value
  - Skill tags stagger in one by one

### 4. Projects Section
- **Eyebrow**: Gold "MY PROJECTS"
- **Layout**: Grid of project cards (2 columns desktop, 1 mobile)
- **Each card**:
  - Project thumbnail image (generated)
  - Project title (heading)
  - Short description in grey
  - Tech tags (small pills)
  - Hover: card lifts with `box-shadow` increase, image scales slightly, overlay with "View Details" appears
- **Card style**: White bg, `border-radius: 16px`, `box-shadow: 0 8px 32px rgba(0,0,0,0.08)`
- **Animations**:
  - Cards stagger in on scroll
  - Hover micro-animations (scale, shadow, overlay fade)
  - Smooth filtering animation if category tabs are added

### 5. Contact Section
- **Eyebrow**: Gold "GET IN TOUCH"
- **Layout**: Two-column — info left, form right
- **Left column**:
  - Heading + subtitle
  - Email, phone, location info with icons
  - Social media links with hover color transitions
- **Right column — Form Card**:
  - White card bg, `border-radius: 16px`, `box-shadow: 0 8px 32px rgba(0,0,0,0.08)`
  - Input fields: Cream `#F5EFE6` background, `border-radius: 8px`, no visible border
  - Fields: Name, Email, Service dropdown, Message textarea
  - Dropdown: `border: 1.5px solid #C49A2A`, bg `#F5EFE6`
  - Submit button: Gold filled `#C49A2A`
  - Disclaimer: `#555555`, 12px, italic — "Your details stay private. No spam — ever."
- **Animations**:
  - Form card slides up on scroll
  - Input focus: subtle border glow animation
  - Submit button: ripple effect on click
  - Success state: checkmark animation after submit

### 6. Footer
- **Background**: `#1C1C2E` (dark)
- **Content**: Name/logo, quick nav links, social icons, copyright
- **Text**: White / muted grey
- **Animation**: Fade in on scroll

---

## Animations & Interactions Inventory

| Animation | Trigger | CSS / JS |
|---|---|---|
| **Scroll reveal** (fade + slide up) | Intersection Observer | CSS `@keyframes` + JS class toggle |
| **Staggered entry** | Scroll into view | CSS `animation-delay` on children |
| **Floating star** | Continuous | CSS `@keyframes float` infinite |
| **Counter animation** | Scroll into view | JS `requestAnimationFrame` |
| **Navbar border** | Scroll > 50px | JS scroll listener |
| **Active nav highlight** | Scroll position | Intersection Observer |
| **Card hover lift** | `:hover` | CSS `transform` + `box-shadow` |
| **Button hover** | `:hover` | CSS `opacity` / `filter` transition |
| **Skill tag stagger** | Scroll into view | CSS staggered `animation-delay` |
| **Input focus glow** | `:focus-within` | CSS `box-shadow` transition |
| **Smooth scroll** | Nav click | CSS `scroll-behavior: smooth` |
| **Parallax decorative** | Scroll | JS `transform: translateY()` |
| **Page load entrance** | `DOMContentLoaded` | CSS keyframes with delays |
| **Cursor trail / glow** | Mouse move | JS canvas or DOM element |

---

## File Structure

```
portfolio/
├── index.html          ← Single-page HTML with all sections
├── css/
│   ├── reset.css       ← CSS reset / normalize
│   ├── variables.css   ← Design tokens (colors, fonts, spacing)
│   ├── base.css        ← Base typography, body, links
│   ├── layout.css      ← Grid, container, section spacing
│   ├── components.css  ← Buttons, cards, tags, form elements
│   ├── sections.css    ← Section-specific styles (hero, about, etc.)
│   └── animations.css  ← All keyframes and animation utilities
├── js/
│   ├── main.js         ← App init, scroll observer, nav logic
│   ├── animations.js   ← Scroll reveal, counters, parallax
│   └── form.js         ← Form validation + submit handling
├── assets/
│   └── images/         ← Generated images (hero, about, projects)
└── favicon.ico
```

---

## Proposed Changes

### [NEW] [index.html](file:///c:/Users/Admin/Desktop/portfolio/index.html)
Single-page HTML document containing:
- `<head>` with Google Fonts (Inter + Playfair Display), meta tags, Open Graph, favicon
- `<header>` — sticky navbar with links and CTA
- `<section id="hero">` — hero with two-column layout
- `<section id="about">` — about with image, bio, stats, skills
- `<section id="projects">` — project cards grid
- `<section id="contact">` — contact info + form card
- `<footer>` — dark footer with links and socials

---

### [NEW] [css/reset.css](file:///c:/Users/Admin/Desktop/portfolio/css/reset.css)
Minimal CSS reset (box-sizing, margin/padding reset, smooth scrolling on `html`).

### [NEW] [css/variables.css](file:///c:/Users/Admin/Desktop/portfolio/css/variables.css)
All CSS custom properties:
- Colors: `--bg-cream`, `--bg-white`, `--blue`, `--gold`, `--dark`, `--grey`, `--decor`
- Fonts: `--font-primary`, `--font-accent`
- Spacing scale: `--space-xs` through `--space-3xl`
- Shadows, radii, transitions

### [NEW] [css/base.css](file:///c:/Users/Admin/Desktop/portfolio/css/base.css)
Base styles for `body`, headings, paragraphs, links, and selection.

### [NEW] [css/layout.css](file:///c:/Users/Admin/Desktop/portfolio/css/layout.css)
`.container`, `.section`, `.grid-2`, `.grid-3`, responsive breakpoints.

### [NEW] [css/components.css](file:///c:/Users/Admin/Desktop/portfolio/css/components.css)
- `.btn-primary`, `.btn-outline`, `.btn-gold` — with hover states
- `.card` — project card styles
- `.tag` — tech/skill tag pills
- `.form-card`, `.form-input`, `.form-select`, `.form-textarea`
- `.eyebrow` — gold uppercase label
- `.stat-item` — stat counter block

### [NEW] [css/sections.css](file:///c:/Users/Admin/Desktop/portfolio/css/sections.css)
Section-specific layout and styling for hero, about, projects, contact, and footer.

### [NEW] [css/animations.css](file:///c:/Users/Admin/Desktop/portfolio/css/animations.css)
- `@keyframes fadeInUp`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `float`, `glow`
- `.reveal` — base class (opacity 0, translateY 30px)
- `.reveal.active` — animated state
- `.stagger-1` through `.stagger-6` — animation delays
- Parallax utility classes
- Cursor glow effect styles

---

### [NEW] [js/main.js](file:///c:/Users/Admin/Desktop/portfolio/js/main.js)
- DOM ready initialization
- **Scroll Observer**: `IntersectionObserver` to add `.active` class to `.reveal` elements
- **Navbar**: scroll border toggle, active link highlighting, mobile menu toggle
- **Smooth scroll**: click handler for nav links
- Import and init animation + form modules

### [NEW] [js/animations.js](file:///c:/Users/Admin/Desktop/portfolio/js/animations.js)
- `animateCounters()` — animate stat numbers from 0 → target on scroll
- `initParallax()` — subtle parallax on decorative elements
- `initCursorGlow()` — custom cursor glow trail following mouse (desktop only)
- Stagger reveal helper

### [NEW] [js/form.js](file:///c:/Users/Admin/Desktop/portfolio/js/form.js)
- Client-side validation (name, email format, required fields)
- Submit handler with loading state animation
- Success/error feedback with animated checkmark
- Note: No backend — form submits to a placeholder or uses `mailto:`

---

## Generated Assets

The following images will be created using the `generate_image` tool during execution:

1. **Hero illustration** — Abstract, modern geometric/blob art in cream, sky blue, and gold tones
2. **About photo** — Professional headshot placeholder (or abstract avatar)
3. **Project thumbnails** (3–4) — Modern UI mockup screenshots for portfolio cards
4. **Favicon** — Simple geometric icon in sky blue

---

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Desktop | `≥ 1024px` | Two-column layouts, full nav |
| Tablet | `768px – 1023px` | Adjusted grid, slightly smaller text |
| Mobile | `< 768px` | Single column, hamburger nav, stacked sections |

---

## SEO & Performance

- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- Proper heading hierarchy (single `<h1>` in hero, `<h2>` per section)
- Meta description, Open Graph tags, viewport meta
- Lazy loading on images (`loading="lazy"`)
- Preconnect to Google Fonts
- Minimal JS, no frameworks — fast load

---

## Verification Plan

### Manual Verification
- Open `index.html` in browser and verify:
  - All sections render correctly with proper colors
  - Animations trigger on scroll
  - Navbar sticky behavior and active states work
  - Mobile hamburger menu functions
  - Form validation works
  - Responsive layout at all breakpoints
  - Hover states on buttons and cards
  - Counter animation in About section

### Visual Checks
- Screenshot each section to verify design fidelity
- Test in browser at 1440px, 768px, and 375px widths

---

## Open Questions

> [!IMPORTANT]
> **Personal details needed**: Before execution, please provide:
> 1. Your **name** (for the navbar logo and hero heading)
> 2. Your **job title / role** (e.g. "Full-Stack Developer", "UI/UX Designer")
> 3. **About me** bio text (2–3 paragraphs, or I can write placeholder text)
> 4. **Project details** — names, descriptions, and tech stacks for 3–4 projects (or I'll use realistic placeholders)
> 5. **Contact info** — email, phone, location, social links (or placeholders)
> 6. **Resume/CV file** — do you have one to link, or should the "Download CV" button be a placeholder?

> [!NOTE]
> If you'd like to proceed with placeholder content first and fill in real details later, just let me know and I'll use professional-looking dummy data.  
