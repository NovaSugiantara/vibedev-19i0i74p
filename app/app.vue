<template>
  <div class="min-h-dvh bg-paper-2">
    <div class="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <header class="mb-7 flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent" aria-hidden="true">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M3 9h18" /><path d="M10 5v4M14 5v4" />
          </svg>
        </span>
        <div>
          <h1 class="text-xl font-bold text-ink tracking-tight leading-tight">Fridge Watchlist</h1>
          <p class="text-sm text-muted mt-0.5">Track what's expiring before your next shop</p>
        </div>
      </header>
      <AddItemForm @submit="addItem" />
      <div class="mt-8">
        <ItemList :items="items" :loaded="loaded" @delete="removeItem" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { FridgeItem } from '~/composables/useFridgeItems'
import { loadItems, saveItems } from '~/composables/useFridgeItems'

const items = ref<FridgeItem[]>([])
const loaded = ref(false)

onMounted(() => {
  items.value = loadItems()
  loaded.value = true // ponytail: avoids empty-state flash before localStorage hydrates
})

function persist() { saveItems(items.value) } // ItemList sorts via computed

function addItem(name: string, expiryDate: string) {
  items.value = [...items.value, { id: crypto.randomUUID(), name, expiryDate }]
  persist()
}
function removeItem(id: string) {
  items.value = items.value.filter(i => i.id !== id)
  persist()
}
useHead({ title: 'Fridge Watchlist' })
</script>
