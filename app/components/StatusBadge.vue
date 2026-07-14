<template>
  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border" :class="state.classes" role="status">
    <span class="h-1.5 w-1.5 rounded-full" :class="state.dotClass" aria-hidden="true" />
    {{ state.label }}
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { ExpiryStatus } from '~/composables/useFridgeItems'
const props = defineProps<{ status: ExpiryStatus }>()
const config: Record<ExpiryStatus, { label: string; classes: string; dotClass: string }> = {
  fresh: { label: 'Fresh', classes: 'bg-fresh-bg text-fresh-text border-fresh-border', dotClass: 'bg-fresh-text' },
  'expiring-soon': { label: 'Expiring Soon', classes: 'bg-expiring-bg text-expiring-text border-expiring-border', dotClass: 'bg-expiring-text' },
  expired: { label: 'Expired', classes: 'bg-expired-bg text-expired-text border-expired-border', dotClass: 'bg-expired-text' },
}
// ponytail: computed so badge re-renders if status prop changes at runtime
const state = computed(() => config[props.status])
</script>
