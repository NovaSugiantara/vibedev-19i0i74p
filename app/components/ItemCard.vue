<template>
  <div class="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
    <div class="flex items-center gap-3 min-w-0">
      <StatusBadge :status="getExpiryStatus(item.expiryDate)" />
      <div class="min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">
          {{ item.name }}
        </p>
        <p class="text-xs text-gray-500">
          {{ formatDate(item.expiryDate) }}
          <span class="text-gray-400">· {{ daysLabel }}</span>
        </p>
      </div>
    </div>
    <button
      class="flex-shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-200 outline-none transition-colors"
      aria-label="Delete {{ item.name }}"
      @click="$emit('delete', item.id)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FridgeItem } from '~/composables/useFridgeItems'
import { getExpiryStatus, getDaysUntilExpiry } from '~/composables/useFridgeItems'

const props = defineProps<{ item: FridgeItem }>()
defineEmits<{ delete: [id: string] }>()

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const daysUntil = computed(() => getDaysUntilExpiry(props.item.expiryDate))

const daysLabel = computed(() => {
  if (daysUntil.value > 0) return `${daysUntil.value}d left`
  if (daysUntil.value === 0) return 'today'
  return `${Math.abs(daysUntil.value)}d ago`
})
</script>
