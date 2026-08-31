# Jiya Prajapati — Portfolio (React + Vite)

A React/Vite rebuild of the original single-file HTML portfolio, restyled with a
dark, minimal, terminal-inspired design language (inspired by rubenmarcus.dev):
a scrolling status ticker, hairline grid texture, a Space Grotesk / Inter / IBM
Plex Mono type system, and a lime accent. No photos, video, or third-party
imagery are used anywhere.

## Structure
- `src/data.js` — all content (profile, projects, skills, etc.) in one place
- `src/components/` — one component per section (Hero, About, Experience, Projects, Skills, Achievements, Contact, etc.)
- `src/styles.css` — design tokens + all styling

## Run it

\`\`\`bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
\`\`\`
