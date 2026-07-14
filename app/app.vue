<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Fridge Watchlist</h1>
        <p class="text-sm text-gray-500 mt-1">Track what's expiring before your next shop</p>
      </header>

      <AddItemForm @submit="addItem" />

      <div class="mt-8">
        <ItemList :items="items" @delete="removeItem" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { FridgeItem } from '~/composables/useFridgeItems'
import { loadItems, saveItems, sortByExpiry } from '~/composables/useFridgeItems'

const items = ref<FridgeItem[]>([])

onMounted(() => {
  items.value = loadItems()
})

function persist() {
  saveItems(sortByExpiry(items.value))
}

function addItem(name: string, expiryDate: string) {
  items.value = [...items.value, { id: crypto.randomUUID(), name, expiryDate }]
  persist()
}

function removeItem(id: string) {
  items.value = items.value.filter((i) => i.id !== id)
  persist()
}

useHead({ title: 'Fridge Watchlist' })
</script>
