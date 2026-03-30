# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows the project phases: `0.PHASE.STEP`.

---

## [Unreleased]

---

## [0.1.0] — 2026-03-30

### Phase 1 — Step 1: Project scaffold, i18n system, CSS design system

#### Added
- `index.html` — semantic HTML5 skeleton with ARIA roles and `data-i18n` attribute system
- `css/main.css` — full design system: CSS variables, typography, layout, header, sidebar navigation, footer, modal, animations, responsive breakpoints
- `css/components.css` — reusable component library: buttons, form elements, cards, empty states, notices, tags, list items
- `js/main.js` — application entry point: bootstraps i18n, navigation, language toggle, and privacy modal
- `js/i18n.js` — bilingual language system (FR/EN) with embedded locales, DOM translation via `data-i18n` attributes, and `localStorage` persistence
- `locales/fr.json` — complete French UI strings for all phases (all 12 question types pre-written)
- `locales/en.json` — complete English UI strings for all phases (all 12 question types pre-written)
- `README.md` — project documentation: features, supported question types, usage guide, privacy statement, project structure, deployment instructions
- Privacy modal: auto-displayed on first visit, re-openable via header badge and footer link, keyboard accessible (Escape to close), bilingual checklist
- Sidebar navigation with section routing (Categories, Questions, Export XML) and live badge counters
- Responsive layout: sidebar on desktop, horizontal tab bar on mobile (breakpoint: 768px)
- Footer with privacy notice and GitHub link
- GitHub Pages deployment

#### Fixed
- Replaced `fetch()`-based locale loading with embedded locales in `js/i18n.js` to resolve 404 errors on GitHub Pages subdirectory deployments
- Replaced TinyMCE Tiny Cloud CDN (requires API key) with jsDelivr open-source build (no API key, no restrictions)
- Added privacy checklist strings (`privacy.check1/2/3`) to both locale files
- Wired privacy checklist DOM population and language-switch refresh in `js/main.js`
- "En savoir plus / Learn more" in footer reopens the modal

---

*Versions use the format `0.PHASE.STEP` during development (e.g. `0.1.0` = Phase 1, Step 1).*
*A `1.0.0` release will be tagged when Phase 1 is complete and all tests pass.*
