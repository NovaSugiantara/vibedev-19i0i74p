<template>
  <form
    class="flex flex-col sm:flex-row gap-3"
    @submit.prevent="handleSubmit"
  >
    <div class="flex-1">
      <label for="food-name" class="block text-sm font-medium text-gray-700 mb-1">
        Food name
      </label>
      <input
        id="food-name"
        ref="nameInputRef"
        v-model="name"
        type="text"
        placeholder="e.g. Greek Yogurt"
        class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
        :aria-invalid="hasError"
        @input="hasError = false"
      />
    </div>
    <div class="sm:w-44">
      <label for="expiry-date" class="block text-sm font-medium text-gray-700 mb-1">
        Expiry date
      </label>
      <input
        id="expiry-date"
        v-model="expiryDate"
        type="date"
        class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
        :aria-invalid="hasError"
        @input="hasError = false"
      />
    </div>
    <div class="flex items-end">
      <button
        type="submit"
        class="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Item
      </button>
    </div>
  </form>
  <p
    v-if="hasError"
    role="alert"
    class="mt-2 text-sm text-red-600"
  >
    Please enter both a food name and a valid expiry date.
  </p>
</template>

<script setup lang="ts">
const emit = defineEmits<{ submit: [name: string, date: string] }>()

const name = ref('')
const expiryDate = ref('')
const hasError = ref(false)
const nameInputRef = ref<HTMLInputElement | null>(null)

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

  emit('submit', trimmedName, expiryDate.value)
  name.value = ''
  expiryDate.value = ''
  nameInputRef.value?.focus()
}
</script>
