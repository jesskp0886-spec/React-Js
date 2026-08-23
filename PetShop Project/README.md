# 🐾 Pawpals Shop

> A modern, fully responsive pet store landing page built from scratch with **React JS** and **100% hand-written CSS** — no Bootstrap, no Tailwind, no UI kit. Just clean component architecture and custom styling, recreating the visual polish of the [Pawpals Demo3](https://pawpals-demo.pbminfotech.com/demo3/) template.

Whether you're here to adopt design ideas for your own pet-care business, explore React component patterns, or just browse the code — welcome in! 🐶🐱

---

## 📺 Demo Video

https://drive.google.com/file/d/1nsaQitEVN3QnU5xKtdI1CKqZabTbTYwD/view?usp=sharing

See the site in action — smooth scrolling, hero slider transitions, tabbed product filtering, and full mobile responsiveness. [▶ Watch the full demo](https://your-demo-video-link.com)

---

## 🎥 Project Explanation Video

https://drive.google.com/file/d/1J6w0y635VE7Q8inMQmNOLOa76dYvrXSz/view?usp=sharing

A 3-minute walkthrough covering the tech stack, folder structure, component breakdown, and the reasoning behind key implementation decisions — great if you want to understand *how* this was built, not just *what* it looks like. [▶ Watch the explanation](https://your-explanation-video-link.com)

---

## 📸 Screenshots

A closer look at each section of the site:

| Hero Section | 

 ![Hero](./screenshots/hero.png)

| Mobile View |

 ![PetShop Project/Output-1.png](./screenshots/mobile.png) 
| Fully responsive layout, tested down to small screens |


---

## 💡 Why This Project

Most "pixel-perfect clone" tutorials lean on a CSS framework to shortcut the layout work. This project deliberately avoids that — every grid, flex layout, hover state, and breakpoint here is written by hand. The goal was to prove out two things at once:

1. **Design fidelity** — how closely a hand-rolled build can match a polished commercial template.
2. **Clean React architecture** — breaking a long, content-heavy landing page into small, self-contained, reusable components instead of one giant file.

---

## ✨ Features

- 🎠 **Custom hero slider** — auto-rotating, multi-slide hero built with `useState`/`useEffect`, no external carousel library
- 📊 **Animated stat & progress bars** — "Keeping Pets Healthy Since 1983" section animates in on load
- 🔁 **Infinite scrolling marquee** — services strip (Grooming, Adoption, Medical, Walking) loops seamlessly
- 🛍️ **Tabbed shop categories** — Pets Accessories, Pet Utilities, Organic Pet Food, with pricing, discount badges, and star ratings
- 📰 **Blog/News carousel** — scrollable feed cards
- 💬 **Client testimonials** section
- 📱 **Fully responsive** — desktop, tablet, and mobile breakpoints tuned per component
- 🎨 **Zero CSS frameworks** — every style is custom, scoped per component, using CSS variables for consistent theming

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI |
| **Vite** | Fast dev server & optimized production build |
| **react-icons** | Icon library across nav, footer & feature sections |
| **Custom CSS** | One scoped stylesheet per component — no framework |

---

## 📁 Project Structure

```
Pawpals-shop/
├── public/
├── src/
│   ├── assets/
│   │   ├── Icons/
│   │   └── Images/
│   ├── Components/
│   │   ├── Header.jsx / Header.css       → Nav bar + mobile menu toggle
│   │   ├── Hero.jsx / Hero.css           → Auto-rotating hero slider
│   │   ├── About.jsx / About.css         → Feature intro boxes
│   │   ├── FoodSlider.jsx / FoodSlider.css → "Best in Store" product slider
│   │   ├── Services.jsx / Services.css   → Stats, progress bars & perks
│   │   ├── Shop.jsx / Shop.css           → Tabbed product grid
│   │   ├── News.jsx / News.css           → Blog/news carousel
│   │   ├── Clients.jsx / Clients.css     → Testimonials
│   │   └── Footer.jsx / Footer.css       → Contact, links & socials
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

Each component pairs its own `.jsx` and `.css` file, keeping styles scoped and the codebase easy to navigate as it grows.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pawpals-shop.git
cd pawpals-shop

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be live at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

---

## 🗺️ Roadmap / Known Improvements

Being transparent about where this stands — a few things intentionally kept simple, and open for contribution:

- [ ] Wire up real category filtering in the Shop tabs (currently shares the same product set)
- [ ] Add a working cart/checkout flow
- [ ] Convert nav mega-menu items into real sub-pages (About, Services, Contact)
- [ ] Remove unused legacy `App.css`

---

## 🔗 Reference

Original design reference: [Pawpals Demo3 – PBM Infotech](https://pawpals-demo.pbminfotech.com/demo3/)

---

## 🙋 Author

-- Jiya Prajapati

Built with 🐾 and a lot of custom CSS.
