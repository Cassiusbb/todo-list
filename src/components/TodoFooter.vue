<script setup lang="ts">
import type { Filter } from '../composables/useTodos'

defineProps<{ remaining: number; completed: number }>()
const filter = defineModel<Filter>('filter', { required: true })
const emit = defineEmits<{ clear: [] }>()

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'done', label: 'Done' },
]
</script>

<template>
  <footer class="footer">
    <span class="count">{{ remaining }} left</span>

    <div class="filters" role="group" aria-label="Filter tasks">
      <button
        v-for="f in filters"
        :key="f.value"
        type="button"
        :class="{ active: filter === f.value }"
        :aria-pressed="filter === f.value"
        @click="filter = f.value"
      >
        {{ f.label }}
      </button>
    </div>

    <button class="clear" type="button" :disabled="!completed" @click="emit('clear')">
      Clear done
    </button>
  </footer>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba($neon-cyan, 0.5);
}

.count {
  color: $neon-yellow;
  font-weight: 700;
  @include text-glow($neon-yellow, 5px);
}

.filters {
  display: flex;
  gap: 0.4rem;

  button {
    padding: 0.35rem 0.9rem;
    background: transparent;
    border: 2px solid $neon-pink;
    border-radius: 999px;
    color: $neon-pink;
    font-weight: 600;
    transition:
      background 0.2s,
      color 0.2s,
      box-shadow 0.2s;

    &:hover {
      @include glow($neon-pink, 8px);
    }

    &.active {
      background: $neon-pink;
      color: $bg;
      @include glow($neon-pink, 12px);
    }
  }
}

.clear {
  padding: 0.35rem 0.9rem;
  background: transparent;
  border: 2px solid $neon-orange;
  border-radius: 999px;
  color: $neon-orange;
  font-weight: 600;

  &:hover:not(:disabled) {
    background: $neon-orange;
    color: $bg;
    @include glow($neon-orange, 12px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}
</style>
