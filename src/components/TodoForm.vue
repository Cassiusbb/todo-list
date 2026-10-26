<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ add: [text: string] }>()
const text = ref('')

function submit() {
  if (!text.value.trim()) return
  emit('add', text.value)
  text.value = ''
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <input v-model="text" type="text" placeholder="What needs doing?" aria-label="New task" maxlength="120" autofocus />
    <button type="submit" :disabled="!text.trim()">Add</button>
  </form>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.form {
  display: flex;
  gap: 0.75rem;
}

input {
  flex: 1;
  min-width: 0;
  padding: 0.85rem 1rem;
  background: $bg;
  border: 2px solid $neon-pink;
  border-radius: $radius;
  font-size: 1.05rem;
  transition: box-shadow 0.2s;

  &::placeholder {
    color: $text-dim;
  }

  &:focus {
    outline: none;
    border-color: $neon-yellow;
    @include glow($neon-yellow, 10px);
  }
}

button {
  padding: 0 1.5rem;
  border: 2px solid $neon-green;
  border-radius: $radius;
  background: transparent;
  color: $neon-green;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition:
    background 0.2s,
    color 0.2s,
    box-shadow 0.2s;
  @include glow($neon-green, 8px);

  &:hover:not(:disabled),
  &:focus-visible {
    background: $neon-green;
    color: $bg;
    @include glow($neon-green, 18px);
  }

  &:disabled {
    opacity: 0.4;
    box-shadow: none;
    cursor: not-allowed;
  }
}
</style>
