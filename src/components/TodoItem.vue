<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { Todo } from '../composables/useTodos'

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{
  toggle: []
  edit: [text: string]
  remove: []
}>()

const editing = ref(false)
const draft = ref('')
const editInput = ref<HTMLInputElement | null>(null)

async function startEdit() {
  draft.value = props.todo.text
  editing.value = true
  await nextTick()
  editInput.value?.focus()
}

function commit() {
  if (!editing.value) return
  editing.value = false
  emit('edit', draft.value)
}

function cancel() {
  editing.value = false
}
</script>

<template>
  <li class="item" :class="{ done: todo.done }">
    <button
      class="check"
      type="button"
      role="checkbox"
      :aria-checked="todo.done"
      :aria-label="`Mark “${todo.text}” as ${todo.done ? 'not done' : 'done'}`"
      @click="emit('toggle')"
    >
      <span v-if="todo.done">✓</span>
    </button>

    <input
      v-if="editing"
      ref="editInput"
      v-model="draft"
      class="edit"
      maxlength="120"
      aria-label="Edit task"
      @keydown.enter="commit"
      @keydown.esc="cancel"
      @blur="commit"
    />
    <span v-else class="text" title="Double-click to edit" @dblclick="startEdit">{{ todo.text }}</span>

    <button class="icon edit-btn" type="button" aria-label="Edit task" @click="startEdit">✎</button>
    <button class="icon remove" type="button" aria-label="Delete task" @click="emit('remove')">✕</button>
  </li>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 0.9rem;
  background: $bg-raised;
  border: 2px solid rgba($neon-orange, 0.85);
  border-radius: $radius;
  transition:
    border-color 0.25s,
    box-shadow 0.25s,
    opacity 0.25s;
  @include glow($neon-orange, 6px);

  &:hover {
    @include glow($neon-orange, 14px);
  }

  &.done {
    border-color: rgba($neon-green, 0.7);
    @include glow($neon-green, 5px);

    .text {
      text-decoration: line-through;
      text-decoration-color: $neon-pink;
      color: $text-dim;
    }
  }
}

.check {
  flex: none;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 2px solid $neon-cyan;
  border-radius: 8px;
  background: transparent;
  color: $bg;
  font-weight: 900;
  transition:
    background 0.2s,
    box-shadow 0.2s;

  .done & {
    background: $neon-green;
    border-color: $neon-green;
    @include glow($neon-green, 10px);
  }
}

.text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 1.05rem;
}

.edit {
  flex: 1;
  min-width: 0;
  padding: 0.3rem 0.5rem;
  background: $bg;
  border: 2px solid $neon-yellow;
  border-radius: 8px;
  font-size: 1.05rem;

  &:focus {
    outline: none;
    @include glow($neon-yellow, 8px);
  }
}

.icon {
  flex: none;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  transition:
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;

  &.edit-btn {
    color: $neon-cyan;

    &:hover {
      border-color: $neon-cyan;
      @include glow($neon-cyan, 8px);
    }
  }

  &.remove {
    color: $neon-pink;

    &:hover {
      border-color: $neon-pink;
      @include glow($neon-pink, 8px);
    }
  }
}
</style>
