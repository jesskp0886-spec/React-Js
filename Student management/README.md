# Campus Register – Student Management System

A student management app built with React (Vite), Redux Thunk, React Router, Bootstrap and JSON Server. Signed-in users can add, edit, delete, sort and filter student records.

## Output

![Output](screenshots/output.png)

## Demo Video

[Watch the demo video](https://drive.google.com/file/d/1xC3FZODgNddO1D2N2k2MAi9WaIABAfW5/view?usp=sharing)

## Features

- Sign in and register; student pages are protected by `PrivateRoute`
- Add a student: name, roll number, phone, email, age, class, grade, photo
- Edit and delete students
- Sort by name or roll number, filter by class, search
- Responsive Navbar

## Tech Stack

React 18, Vite, Redux, Redux-Thunk, React Router, Bootstrap 5, Bootstrap Icons, JSON Server

## Run Locally

```bash
npm install
npm start
```

This starts JSON Server on `http://localhost:3001` and the app on `http://localhost:5173`.

Demo login: `admin@school.com` / `admin123`
