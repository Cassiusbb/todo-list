<script setup lang="ts">
import logo from '../assets/peacelogo.png'

defineProps<{ remaining: number; total: number }>()
</script>

<template>
  <header class="header">
    <img class="logo" :src="logo" alt="Neon green peace sign logo" width="96" height="96" />
    <div class="titles">
      <h1>Neon <span>To-Do</span></h1>
      <p v-if="total">{{ remaining }} of {{ total }} tasks left</p>
      <p v-else>Peace, love &amp; productivity</p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.75rem;
}

.logo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid $neon-green;
  @include glow($neon-green, 16px);
  animation: spin 24s linear infinite;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 7vw, 3.1rem);
  line-height: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: $neon-pink;
  @include text-glow($neon-pink, 12px);

  span {
    color: $neon-green;
    @include text-glow($neon-green, 12px);
  }
}

p {
  margin: 0.5rem 0 0;
  color: $neon-cyan;
  letter-spacing: 0.08em;
  @include text-glow($neon-cyan, 5px);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
