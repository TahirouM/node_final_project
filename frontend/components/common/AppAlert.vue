<template>
  <div v-if="message" class="p-4 rounded-lg text-sm flex items-start gap-3" :class="classes">
    <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath" />
    </svg>
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'error' }
})

const classes = computed(() => ({
  'bg-red-50 text-red-800': props.type === 'error',
  'bg-green-50 text-green-800': props.type === 'success',
  'bg-blue-50 text-blue-800': props.type === 'info',
  'bg-yellow-50 text-yellow-800': props.type === 'warning',
}))

const iconPath = computed(() => {
  if (props.type === 'success') return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  if (props.type === 'info') return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
})
</script>
