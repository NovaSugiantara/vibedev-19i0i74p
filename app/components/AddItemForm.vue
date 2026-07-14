<template>
  <form
    class="flex flex-col sm:flex-row gap-3"
    @submit.prevent="handleSubmit"
  >
    <div class="flex-1 min-w-0">
      <label for="food-name" class="block text-sm font-semibold text-ink mb-1.5">
        Food name
      </label>
      <input
        id="food-name"
        ref="nameInputRef"
        v-model="name"
        type="text"
        placeholder="e.g. Greek Yogurt"
        autocomplete="off"
        class="w-full rounded-lg border-2 px-3.5 text-sm touch-manipulation
               bg-paper border-rule-2 text-ink placeholder:text-muted
               hover:border-rule focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-focus-ring/25
               outline-none transition-[box-shadow,border-color] duration-[var(--dur-short)]
               disabled:opacity-50 disabled:cursor-not-allowed
               h-11 leading-none"
        :class="{ 'border-danger focus-visible:ring-danger/25': hasError }"
        :aria-invalid="hasError"
        :aria-describedby="hasError ? 'form-error' : undefined"
        @input="hasError = false"
        @blur="validateOnBlur"
      />
    </div>
    <div class="sm:w-40">
      <label for="expiry-date" class="block text-sm font-semibold text-ink mb-1.5">
        Expiry date
      </label>
      <input
        id="expiry-date"
        v-model="expiryDate"
        type="date"
        class="w-full rounded-lg border-2 px-3.5 text-sm touch-manipulation
               bg-paper border-rule-2 text-ink
               hover:border-rule focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-focus-ring/25
               outline-none transition-[box-shadow,border-color] duration-[var(--dur-short)]
               disabled:opacity-50 disabled:cursor-not-allowed
               h-11 leading-none
               [color-scheme:light]"
        :class="{ 'border-danger focus-visible:ring-danger/25': hasError }"
        :aria-invalid="hasError"
        @input="hasError = false"
        @blur="validateOnBlur"
      />
    </div>
    <div class="flex items-end">
      <button
        type="submit"
        class="w-full sm:w-auto rounded-lg px-4 text-sm font-semibold touch-manipulation
               bg-accent text-accent-ink
               hover:bg-accent-hover
               focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2
               active:translate-y-px
               outline-none transition-[background,box-shadow,transform] duration-[var(--dur-short)]
               disabled:opacity-50 disabled:cursor-not-allowed
               h-11 leading-none whitespace-nowrap"
        :disabled="loading"
      >
        <span v-if="loading" class="inline-flex items-center gap-2">
          <svg class="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Adding&hellip;
        </span>
        <span v-else>Add Item</span>
      </button>
    </div>
  </form>

  <div class="min-h-[1.375rem] mt-2">
    <p
      v-if="hasError"
      id="form-error"
      role="alert"
      class="text-xs text-danger flex items-center gap-1"
    >
      <span aria-hidden="true">\u26A0</span>
      Please enter a food name and a valid expiry date
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ submit: [name: string, date: string] }>()

const name = ref('')
const expiryDate = ref('')
const hasError = ref(false)
const loading = ref(false)
const nameInputRef = ref<HTMLInputElement | null>(null)

function validateOnBlur() {
  if (name.value.trim() && expiryDate.value) {
    hasError.value = false
  }
}

function handleSubmit() {
  hasError.value = false

  const trimmedName = name.value.trim()
  if (!trimmedName || !expiryDate.value) {
    hasError.value = true
    return
  }

  const parsed = new Date(expiryDate.value + 'T00:00:00')
  if (isNaN(parsed.getTime())) {
    hasError.value = true
    return
  }

  loading.value = true
  emit('submit', trimmedName, expiryDate.value)
  name.value = ''
  expiryDate.value = ''
  // ponytail: brief flash to show user the add happened, then back
  setTimeout(() => { loading.value = false }, 300)
  nameInputRef.value?.focus()
}
</script>
