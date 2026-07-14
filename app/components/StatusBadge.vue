<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
    :class="classes"
    role="status"
  >
    <span class="h-1.5 w-1.5 rounded-full" :class="dotClass" aria-hidden="true" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import type { ExpiryStatus } from '~/composables/useFridgeItems'

const props = defineProps<{ status: ExpiryStatus }>()

const config: Record<ExpiryStatus, { label: string; classes: string; dotClass: string }> = {
  fresh: {
    label: 'Fresh',
    classes: 'bg-fresh-bg text-fresh-text border-fresh-border',
    dotClass: 'bg-fresh-text',
  },
  'expiring-soon': {
    label: 'Expiring Soon',
    classes: 'bg-expiring-bg text-expiring-text border-expiring-border',
    dotClass: 'bg-expiring-text',
  },
  expired: {
    label: 'Expired',
    classes: 'bg-expired-bg text-expired-text border-expired-border',
    dotClass: 'bg-expired-text',
  },
}

const { label, classes, dotClass } = config[props.status]
</script>
