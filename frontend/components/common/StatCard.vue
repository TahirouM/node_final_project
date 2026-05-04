<template>
  <div class="card-hover" :class="`bg-gradient-to-br from-${color}-50 to-white border-2 border-${color}-100`">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-semibold text-gray-600 mb-2">{{ label }}</p>
        <p class="text-4xl font-bold" :class="`text-${color}-600`">{{ value }}</p>
        <p v-if="sublabel" class="text-xs text-gray-500 mt-2">{{ sublabel }}</p>
      </div>
      <div class="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
        :class="`bg-gradient-to-br from-${color}-500 to-${color}-600`">
        <slot name="icon">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [Number, String], required: true },
  sublabel: { type: String, default: '' },
  color: { type: String, default: 'primary' }
})
</script>
