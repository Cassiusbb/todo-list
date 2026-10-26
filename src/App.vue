<script setup lang="ts">
import { useTodos } from './composables/useTodos'
import AppHeader from './components/AppHeader.vue'
import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'
import TodoFooter from './components/TodoFooter.vue'

const { todos, filter, visible, remaining, completed, add, toggle, edit, remove, clearCompleted } =
  useTodos()
</script>

<template>
  <main class="app">
    <AppHeader :remaining="remaining" :total="todos.length" />

    <section class="card">
      <TodoForm @add="add" />

      <ul v-if="visible.length" class="list">
        <TodoItem
          v-for="todo in visible"
          :key="todo.id"
          :todo="todo"
          @toggle="toggle(todo.id)"
          @edit="(text) => edit(todo.id, text)"
          @remove="remove(todo.id)"
        />
      </ul>
      <p v-else class="empty">
        {{ todos.length ? 'Nothing here – switch filter!' : 'All clear. Add your first task ⚡' }}
      </p>

      <TodoFooter
        v-if="todos.length"
        v-model:filter="filter"
        :remaining="remaining"
        :completed="completed"
        @clear="clearCompleted"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use './styles/variables' as *;

.app {
  max-width: 680px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}

.card {
  background: rgba($bg-panel, 0.85);
  border: 2px solid $neon-cyan;
  border-radius: $radius * 1.5;
  padding: 1.25rem;
  backdrop-filter: blur(6px);
  @include glow($neon-cyan, 14px);
}

.list {
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}

.empty {
  margin: 1.75rem 0 0.5rem;
  text-align: center;
  color: $text-dim;
  font-size: 1.05rem;
}
</style>
