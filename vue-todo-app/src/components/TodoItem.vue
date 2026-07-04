<template>
  <li class="todo-item" :class="{ done: todo.done }">
    <input
      type="checkbox"
      :checked="todo.done"
      @click="$emit('toggle-done', todo.id)"
    />
    <span class="text">{{ todo.text }}</span>
    <button class="delete-btn" @click="$emit('delete-item', todo.id)">
      Delete
    </button>
  </li>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-done', 'delete-item'])
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.todo-item.done .text {
  text-decoration: line-through;
  color: #999;
}

.text {
  flex: 1;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #c0392b;
}
</style>
