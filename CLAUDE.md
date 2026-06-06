# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

This is a **no-build static site** — there is no npm, bundler, or test runner. Open `index.html` directly in a browser to develop. All vendor libraries (Bootstrap 5, AOS, Lucide) are committed locally under `assets/vendor/`.

To preview: open `index.html` in any browser. No server required.

## Architecture

### Single-page main site (`index.html`)
All sections (Home, About, Timeline, Skills, Projects, Contact) live in one HTML file. JS files are loaded at the bottom and each owns a specific responsibility:

- **`script.js`** — AOS init, starry background generation, `TypeWriter` class, scroll-spy (highlights active nav link), mobile nav collapse.
- **`skills.js`** — Reads the `skillsData` array and DOM-renders the skills grid into `#skills-container` using Lucide icons.
- **`projects.js`** — Reads the `projectsData` static array and renders cards into `#projects-grid`. Despite the README saying "dynamic GitHub fetch", it is now a **static JSON array** — add projects by editing that array directly.
- **`theme-switcher.js`** — Injects the color-picker dropdown into the navbar, applies 7 accent color themes, and persists the choice in `localStorage`. Light/dark mode toggle exists in code but is **commented out** because the hero SVG (`solar-system-ai-visual-color-filled.svg`) has hard-coded black fills that break on a light background.

### Theming system
All colors are CSS custom properties on `:root` in `style.css` (`--background-color`, `--foreground-color`, `--accent-color`, `--glow-color`, etc.). `theme-switcher.js` mutates these at runtime via `setProperty`. To change the default accent, update the `:root` block in `style.css` AND the `colorThemes` array default in `theme-switcher.js`.

### Adding content
- **New project** → add an entry to the `projectsData` array in `assets/js/projects.js`.
- **New skill category** → add an object to `skillsData` in `assets/js/skills.js`; icon names come from [Lucide](https://lucide.dev/icons/).
- **Timeline entry** → edit the `.timeline` div in `index.html` directly.
