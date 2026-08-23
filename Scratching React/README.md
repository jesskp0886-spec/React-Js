# Scratching React

A hands-on practical assignment repo for learning core React concepts and their equivalent implementation in Next.js. It contains two standalone sub-projects built around the same "Student" theme, each demonstrating a progressive set of React fundamentals.

## 📁 Project Structure

```
Scratching React/
├── react-practical/     # Vite + React implementation
│   ├── src/
│   │   ├── Component/
│   │   │   ├── Header.jsx
│   │   │   ├── Welcome.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── public/
│       └── student.jpg
│
└── next-practical/      # Next.js (App Router) implementation
    ├── app/
    │   ├── components/
    │   │   └── StudentCard.jsx
    │   ├── page.js
    │   ├── layout.js
    │   └── globals.css
    └── public/
```

## 🚀 Tech Stack

| Sub-project      | Framework        | Bundler / Runtime | React Version |
|-------------------|------------------|--------------------|----------------|
| `react-practical` | React (SPA)      | Vite               | 19.x           |
| `next-practical`  | Next.js (App Router) | Turbopack/Next    | 19.x           |

## ✨ Features / Tasks Covered

The `react-practical` app walks through a series of tasks in a single page:

1. **Component Basics** – `Header`, `Welcome`, and `Footer` as reusable functional components.
2. **Welcome Section** – Displays static student/course/institute info along with the current date.
3. **Rest & Spread Operators** – Merging arrays and objects, and a variadic `calculateTotal(...numbers)` function.
4. **Props** – A `StudentCard` component rendered multiple times with different `name`, `city`, `state`, `country`, and `course` props.
5. **`useState` Examples** – Demonstrates state for strings, numbers, booleans, arrays, and objects, each with an update action and a shared reset button.
6. **Student Information Manager** – A mini CRUD-style UI to add and delete student names, with the list persisted to `localStorage` via `useEffect`.

The `next-practical` app re-implements the **Student Cards** concept using Next.js:

- A `students` array is mapped into reusable `StudentCard` components on the home page (`app/page.js`).
- Uses the Next.js App Router structure (`app/layout.js`, `app/page.js`, `app/globals.css`).

## 🛠️ Getting Started

Each sub-project is independent and has its own `package.json`. Install and run them separately.

### React (Vite) app

```bash
cd react-practical
npm install
npm run dev
```

App runs by default at `http://localhost:5173`.

### Next.js app

```bash
cd next-practical
npm install
npm run dev
```

App runs by default at `http://localhost:3000`.

## 📦 Available Scripts

Both projects support the same common scripts:

| Script          | Description                        |
|------------------|-------------------------------------|
| `npm run dev`    | Start the local development server |
| `npm run build`  | Create a production build          |
| `npm run lint`   | Run ESLint checks                  |

`react-practical` additionally supports `npm run preview` to preview the production build, and `next-practical` supports `npm run start` to run the built app.

## 🎥 Explanation Video

A walkthrough explaining the code, concepts, and logic used in this project.

https://drive.google.com/file/d/1cHnC8BNSiQxjzvLudIZZY3I6D0FKEsah/view?usp=sharing

## 🎬 Demo Video

A short demo showing the app running and its features in action.

https://drive.google.com/file/d/1_DqAA5veyJBz-ZaYaUBChXMtplGHTQbL/view?usp=sharing

## 🖼️ Screenshots

| Next Practical|

|--------------------------|----------------|

 ![Scratching React/Output-1.png](https://github.com/jesskp0886-spec/React-Js/blob/e81e56b6cbde82df4231580bb36b0e7a01bb92a0/Scratching%20React/Output-1.png) 

| React Practical |

|------------------|--------------------|

 ![Scratching React/Output-2.png](https://github.com/jesskp0886-spec/React-Js/blob/e81e56b6cbde82df4231580bb36b0e7a01bb92a0/Scratching%20React/Output-2.png) 


## 📚 Learning Goals

This repository was built as a practice exercise to reinforce:

- JSX syntax and component composition
- Props and reusable UI components
- React state management with `useState`
- Side effects and persistence with `useEffect` + `localStorage`
- Modern JavaScript rest/spread operators
- The differences between a client-rendered Vite/React app and a Next.js App Router app
