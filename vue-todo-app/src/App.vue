<template>
  <div class="app">
    <h1>Todo List</h1>

    <div class="input-row">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        type="text"
        placeholder="Add a new todo..."
      />
      <button @click="addTodo">Add</button>
    </div>

    <ul class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-done="toggleDone"
        @delete-item="deleteItem"
      />
    </ul>

    <p v-if="todos.length === 0" class="empty">No todos yet. Add one above!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoItem from './components/TodoItem.vue'

const newTodo = ref('')
const todos = ref([
  { id: 1, text: 'Learn Vue.js', done: false },
  { id: 2, text: 'Build a todo app', done: false }
])

let nextId = 3

function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return

  todos.value.push({
    id: nextId++,
    text,
    done: false
  })

  newTodo.value = ''
}

function toggleDone(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.done = !todo.done
}

function deleteItem(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f7f7f7;
}

.app {
  max-width: 500px;
  margin: 40px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.input-row input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-row button {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.input-row button:hover {
  background: #369870;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.empty {
  text-align: center;
  color: #999;
}
</style>
