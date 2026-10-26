import { computed, ref, watch } from 'vue'

export interface Todo {
  id: string
  text: string
  done: boolean
  createdAt: number
}

export type Filter = 'all' | 'active' | 'done'

const STORAGE_KEY = 'neon-todo:items'

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const todos = ref<Todo[]>(load())
  const filter = ref<Filter>('all')

  watch(
    todos,
    (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      } catch {
        /* storage unavailable – ignore */
      }
    },
    { deep: true },
  )

  const visible = computed(() => {
    if (filter.value === 'active') return todos.value.filter((t) => !t.done)
    if (filter.value === 'done') return todos.value.filter((t) => t.done)
    return todos.value
  })

  const remaining = computed(() => todos.value.filter((t) => !t.done).length)
  const completed = computed(() => todos.value.length - remaining.value)

  function add(text: string) {
    const clean = text.trim()
    if (!clean) return
    todos.value.unshift({
      id: crypto.randomUUID(),
      text: clean,
      done: false,
      createdAt: Date.now(),
    })
  }

  function toggle(id: string) {
    const item = todos.value.find((t) => t.id === id)
    if (item) item.done = !item.done
  }

  function edit(id: string, text: string) {
    const clean = text.trim()
    const item = todos.value.find((t) => t.id === id)
    if (!item) return
    if (!clean) remove(id)
    else item.text = clean
  }

  function remove(id: string) {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  function clearCompleted() {
    todos.value = todos.value.filter((t) => !t.done)
  }

  return { todos, filter, visible, remaining, completed, add, toggle, edit, remove, clearCompleted }
}
