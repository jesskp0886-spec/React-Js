<div align="center">

# The Venue — Restaurant Blog & Admin Dashboard

**A React single-page application that pairs a restaurant website with a full blog publishing system.**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.1-7952B3?logo=bootstrap&logoColor=white)
![Status](https://img.shields.io/badge/status-active-success)

[Explainer Video]() 
[Demo Video]() 
[Screenshots](#-screenshots) 

</div>

---

## Overview

**The Venue** takes a static restaurant template and rebuilds it as a modern React application. Beyond the marketing pages (Home, About, Menu, Contact), it adds a complete content workflow:

- A **public blog** where visitors search, filter, sort and paginate published posts.
- An **admin dashboard** where staff create, edit, publish, unpublish and delete posts.

The whole stack starts with a single command. JSON Server runs inside the Vite dev server, so there is no separate backend to install, configure or launch.

## 🎬 Explainer Video

A short walkthrough (under 3 minutes) of the project goals, architecture and key design decisions.

> **Watch:** https://drive.google.com/file/d/1nKfMHpTxKDjyPw-htS3VlE_iO98PBRUp/view?usp=sharing

## 🖥️ Demo Video

A live walkthrough of the public site, the blog, and the admin workflow.

> **Watch:** https://drive.google.com/file/d/1x85iy0qPT4i_TJ9XHP2QAgaxONJs78tf/view?usp=sharing

## 📸 Screenshots

| Home |
| :---: | :---: |
| ![Home page](https://github.com/jesskp0886-spec/React-Js/blob/d60a5f67636a68b0dc699eb78a0209963e81c20e/The%20Venue%20Restuarant/img.png) | 
| *Landing page with hero, intro, menu highlights and testimonials* | *Search, category filter, sorting and pagination* |

## ✨ Features

| Area | Capability |
| --- | --- |
| **Public site** | Home, About, Menu and Contact pages converted from the original template into React components |
| **Blog** | Search by title, category filter, sorting (newest, oldest, A–Z, Z–A), pagination, published posts only |
| **Blog detail** | Dedicated route per post with formatted date, author and category |
| **Admin dashboard** | Total / published / draft statistics, table view, filters, pagination |
| **CRUD** | Create, read, update and delete posts through Redux Toolkit async thunks |
| **Publishing workflow** | One-click Draft ⇄ Published toggle with status badges |
| **Validation** | Field-level rules for title, author, category, summary, content, image and status |
| **Safe deletion** | Confirmation modal before any post is removed |
| **Server-side querying** | Search, filter, sort and pagination handled by the API through query parameters |
| **Resilience** | Request cancellation on filter changes, friendly error messages, loader and notice components |

## 🧰 Tech Stack

| Layer | Technology |
| --- | --- |
| UI | React 18, React Router 6 |
| State | Redux Toolkit, React Redux |
| HTTP | Axios with a shared client and response interceptor |
| Mock API | JSON Server 0.17.4 (embedded in Vite) |
| Build tool | Vite 5 with `@vitejs/plugin-react` |
| Styling | Bootstrap 4.1.2, Font Awesome 4.7, template CSS |

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Install and run

```bash
git clone <YOUR-REPOSITORY-URL>
cd the-venue-blog
npm install
npm run dev
```

| Service | URL |
| --- | --- |
| Application | http://localhost:5173 |
| REST API | http://localhost:5173/api/blogs |
| Admin dashboard | http://localhost:5173/admin |

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite and the embedded API with hot reload |
| `npm start` | Alias for `npm run dev` |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build (API included) |

### Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | `/api` | Point the app at a different API base URL |

## 🗺️ Routes

| Route | Description |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/menu` | Menu |
| `/contact` | Contact (OpenStreetMap embed, no API key required) |
| `/blog` | Public blog listing |
| `/blog/:id` | Blog post details |
| `/admin` | Admin dashboard |
| `/admin/blogs/new` | Create a post |
| `/admin/blogs/:id/edit` | Edit a post |
| `*` | 404 page |

## 🏗️ Architecture

```
React components ──► Redux Toolkit (thunks + slice) ──► Axios client ──► JSON Server ──► db.json
        ▲                         │
        └────── selectors ◄───────┘
```

**Data flow.** Pages dispatch async thunks. Thunks translate the current filter state into query parameters (`_page`, `_limit`, `_sort`, `_order`, `title_like`, `category`, `status`), call the API through `blogApi`, and write results into the slice. Total counts are read from the `X-Total-Count` response header.

**Scope separation.** The same list thunk serves two scopes. The public scope always forces `status=published`, so drafts can never leak to visitors. The admin scope allows any status filter.

**Error handling.** A response interceptor in `axiosClient.js` converts network failures, 404s and other errors into readable messages that surface through the `ErrorMessage` and `Notice` components.

**Page-scoped styles.** The template ships separate stylesheets with overlapping class names. The `usePageStyles` hook injects a page's CSS on mount and removes it on unmount to prevent collisions.

**Legacy plugin replacements.**

| Original | React replacement |
| --- | --- |
| Video popup plugin | Modal component |
| Date and time pickers | Native inputs |
| Owl Carousel | `TestimonialSlider` component |
| Parallax script | CSS |

## 📁 Project Structure

```
the-venue-blog/
├── db.json                     # JSON Server data (12 seed posts)
├── vite.config.js              # Vite config + embedded JSON Server plugin
├── public/                     # Images, fonts, Bootstrap, Font Awesome
└── src/
    ├── api/                    # axiosClient, blogApi
    ├── app/                    # Redux store
    ├── components/
    │   ├── blog/               # BlogCard, BlogFilters, BlogForm, BlogTable, StatCard
    │   ├── common/             # Loader, Pagination, ConfirmModal, Notice, Rating, ...
    │   ├── layout/             # Header, Footer, MainLayout, PageHero
    │   └── menu/               # Dish, MenuColumn, SignatureDish
    ├── data/                   # Static menu data
    ├── features/blogs/         # blogsSlice (thunks, reducers, filters)
    ├── hooks/                  # useDebounce, usePageStyles
    ├── pages/                  # Public pages
    │   └── admin/              # Dashboard, BlogEditor
    ├── styles/                 # Page-level stylesheets
    └── utils/                  # constants, format helpers, validators
```

## 🧾 Data Model

```json
{
  "id": 1,
  "title": "Our Nominee at the Restaurant Awards",
  "excerpt": "Short summary shown on cards.",
  "content": "Full post body. Separate paragraphs with a blank line.",
  "image": "/images/blog_1.jpg",
  "category": "News",
  "author": "George Smith",
  "status": "published",
  "createdAt": "2026-09-28T10:00:00.000Z"
}
```

**Categories:** `Lifestyle`, `Recipes`, `News`, `Events`  
**Statuses:** `published`, `draft`

### Validation rules

| Field | Rule |
| --- | --- |
| Title | Required, 5–100 characters |
| Author | Required, at least 2 characters |
| Category | Must be one of the allowed categories |
| Summary | Required, 20–200 characters |
| Content | Required, at least 50 characters |
| Image | Optional; full `http(s)` URL or a local path beginning with `/` |
| Status | `draft` or `published` |

## 🔌 API Reference

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/blogs` | List posts (supports query parameters below) |
| `GET` | `/api/blogs/:id` | Retrieve one post |
| `POST` | `/api/blogs` | Create a post |
| `PUT` | `/api/blogs/:id` | Replace a post |
| `PATCH` | `/api/blogs/:id` | Partially update (used for status toggle) |
| `DELETE` | `/api/blogs/:id` | Delete a post |

**Query parameters:** `_page`, `_limit`, `_sort`, `_order`, `title_like`, `category`, `status`

## 🔒 Security Notice

This project is a **development and portfolio build**. Before any public deployment, address the following:

- **No authentication.** `/admin` and all write endpoints are open to anyone who can reach the server.
- **Mock backend.** JSON Server writes directly to `db.json` and is not intended for production use.

Recommended next step: replace the embedded API with a real backend that enforces authentication, authorization and server-side validation.

## 🔄 Resetting Data

Admin changes are written to `db.json`. To restore the original seed data, revert the file with Git:

```bash
git checkout -- db.json
```

## 🛣️ Roadmap

- [ ] Authentication and role-based access for the admin area
- [ ] Production backend and database
- [ ] Image upload instead of URL or path entry
- [ ] Rich-text or Markdown editor for post content
- [ ] Automated tests (unit and end-to-end)
- [ ] CI pipeline for lint and build checks

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit with a clear message: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a pull request describing the change and how it was tested


<div align="center">

If this project helped you, consider giving it a ⭐

</div>
