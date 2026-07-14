<template>
  <div>
    <p class="text-sm font-semibold text-gray-600 mb-3">
      {{ items.length }} {{ items.length === 1 ? 'item' : 'items' }}
    </p>

    <div v-if="sortedItems.length === 0" class="text-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto h-12 w-12 text-gray-300 mb-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="6" width="18" height="15" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
      </svg>
      <p class="text-sm text-gray-500 mb-1">Your fridge is empty</p>
      <p class="text-xs text-gray-400">Add your first item above to start tracking</p>
    </div>

    <div v-else class="space-y-2">
      <ItemCard
        v-for="item in sortedItems"
        :key="item.id"
        :item="item"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FridgeItem } from '~/composables/useFridgeItems'
import { sortByExpiry } from '~/composables/useFridgeItems'

const props = defineProps<{ items: FridgeItem[] }>()
defineEmits<{ delete: [id: string] }>()

const sortedItems = computed(() => sortByExpiry(props.items))
</script>
