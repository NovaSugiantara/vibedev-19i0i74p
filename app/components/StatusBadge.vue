<template>
  <span
    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border min-h-[28px]"
    :class="classes"
    role="status"
  >
    <span class="relative top-[0.5px]">{{ icon }}</span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import type { ExpiryStatus } from '~/composables/useFridgeItems'

const props = defineProps<{ status: ExpiryStatus }>()

const config: Record<ExpiryStatus, { label: string; icon: string; classes: string }> = {
  fresh: {
    label: 'Fresh',
    icon: '\u25CF',
    classes: 'bg-fresh-bg text-fresh-text border-fresh-border',
  },
  'expiring-soon': {
    label: 'Expiring Soon',
    icon: '\u25CB',
    classes: 'bg-expiring-bg text-expiring-text border-expiring-border',
  },
  expired: {
    label: 'Expired',
    icon: '\u2715',
    classes: 'bg-expired-bg text-expired-text border-expired-border',
  },
}

const { label, icon, classes } = config[props.status]
</script>
