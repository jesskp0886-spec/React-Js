# Register Form — React + Vite + Flowbite

This is the original Next.js registration form, converted to a plain **React.js (Vite)** app and rebuilt with **Flowbite / Flowbite React** components on top of Tailwind CSS v4. The original cream/ink/coral/mustard theme is preserved.

## What changed from the Next.js version

- **Framework:** Next.js (`app/` router) → Vite + React (`src/`). No more `page.tsx` / `layout.tsx` / server components — this is a standard client-side single-page app (`src/main.jsx` -> `src/App.jsx` -> `src/components/RegisterForm.jsx`).
- **UI library:** Plain hand-rolled inputs → Flowbite React components (`TextInput`, `Select`, `Radio`, `Checkbox`, `Button`, `Table`, `Modal`, `Badge`, `Label`), themed to match the original design via Flowbite's `theme` prop / `className` overrides.
- **New: Edit & Delete actions.** The "Registered Users" table now has an **Actions** column (last column) with:
  - Edit — loads that row back into the form above (the form switches to "Update" mode, with a "Cancel" option), and saves changes in place on submit.
  - Delete — opens a Flowbite confirmation modal before permanently removing the row.
- Data is still persisted to the browser's `localStorage` (key: `registeredUsers`), same as before.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build (outputs to dist/)
npm run preview   # preview the production build
```

## Project structure

```
├── index.html
├── package.json
├── vite.config.js              # Vite + @tailwindcss/vite + flowbite-react plugin
├── .flowbite-react/            # auto-generated Flowbite React config (do not edit by hand)
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Renders <RegisterForm />
    ├── index.css                 # Tailwind + Flowbite imports + custom theme tokens
    └── components/
        └── RegisterForm.jsx      # The form + registered-users table (with edit/delete)
```

## Tech stack

- React 19 + Vite
- Tailwind CSS v4
- Flowbite / Flowbite React
- lucide-react for the edit/delete/close icons

## Demo Video

https://drive.google.com/file/d/1GOnHRzbzqKrpzeN-eBE2cd4Goj8aetS2/view?usp=sharing

## Explanation Video

[Watch the explanation video](#)

## Output

**Registration form**

![Registration form](https://github.com/jesskp0886-spec/React-Js/blob/0173e58cecfadc8b31fbcb80fb09f3f4112edf4d/Registration-Form/Output.png)
