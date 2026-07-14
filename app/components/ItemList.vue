<template>
  <div>
    <div v-if="sortedItems.length" class="flex items-baseline justify-between mb-3">
      <p class="text-sm font-semibold text-ink">{{ sortedItems.length }} {{ sortedItems.length === 1 ? 'item' : 'items' }}</p>
      <p class="text-xs text-muted">Soonest expiry first</p>
    </div>
    <div v-else-if="!loaded" class="text-center py-16 rounded-2xl border border-dashed border-rule-2 bg-paper-2">
      <p class="text-sm text-muted">Loading…</p>
    </div>
    <div v-else class="text-center py-16 rounded-2xl border border-dashed border-rule-2 bg-paper-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-rule-2 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/>
      </svg>
      <p class="text-sm font-semibold text-ink mb-1">Your fridge is empty</p>
      <p class="text-xs text-muted max-w-[16rem] mx-auto">Add your first item above to start tracking what expires next</p>
    </div>
    <ul v-if="sortedItems.length" class="space-y-2 list-none p-0 m-0">
      <li v-for="item in sortedItems" :key="item.id"><ItemCard :item="item" @delete="$emit('delete', $event)" /></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { FridgeItem } from '~/composables/useFridgeItems'
import { sortByExpiry } from '~/composables/useFridgeItems'
const props = defineProps<{ items: FridgeItem[]; loaded?: boolean }>()
defineEmits<{ delete: [id: string] }>()
const sortedItems = computed(() => sortByExpiry(props.items))
</script>
