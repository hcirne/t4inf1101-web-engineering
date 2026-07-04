# Vue Todo App

A simple Vue todo list app.

## Features

- Add new todos via an input field (v-model)
- Display todos using v-for
- Mark todos as done with a checkbox
- Delete todos with a button
- Parent (`App.vue`) / child (`TodoItem.vue`) communication via **props** (down) and **custom events** (up): `toggle-done` and `delete-item`

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.
