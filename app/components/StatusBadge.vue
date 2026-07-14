<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border"
    :class="classes"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import type { ExpiryStatus } from '~/composables/useFridgeItems'

const props = defineProps<{ status: ExpiryStatus }>()

const config: Record<ExpiryStatus, { label: string; classes: string }> = {
  fresh: {
    label: 'Fresh',
    classes: 'bg-green-100 text-green-800 border-green-300',
  },
  'expiring-soon': {
    label: 'Expiring Soon',
    classes: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  expired: {
    label: 'Expired',
    classes: 'bg-red-100 text-red-800 border-red-300',
  },
}

const { label, classes } = config[props.status]
</script>
