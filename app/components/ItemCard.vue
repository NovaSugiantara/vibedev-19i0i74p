<template>
  <div
    class="flex items-center justify-between gap-3 rounded-xl border border-rule
           bg-paper px-4 py-3 shadow-sm transition-colors duration-[var(--dur-short)]
           hover:border-rule-2"
  >
    <div class="flex items-center gap-3 min-w-0">
      <StatusBadge :status="getExpiryStatus(item.expiryDate)" />
      <div class="min-w-0">
        <p class="text-sm font-semibold text-ink truncate">
          {{ item.name }}
        </p>
        <p class="text-xs text-muted mt-0.5">
          {{ formatDate(item.expiryDate) }}
          <span class="text-muted/70">· {{ daysLabel }}</span>
        </p>
      </div>
    </div>
    <button
      class="relative flex-shrink-0 rounded-lg p-2 text-muted
             hover:text-danger hover:bg-danger-bg
             focus-visible:ring-2 focus-visible:ring-danger/30 focus-visible:outline-none
             active:translate-y-px
             transition-colors duration-[var(--dur-short)]
             [&::before]:absolute [&::before]:inset-[-4px] [&::before]:content-['']
             touch-manipulation"
      style="min-height: 44px; min-width: 44px"
      :aria-label="`Delete ${item.name}`"
      @click="$emit('delete', item.id)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
