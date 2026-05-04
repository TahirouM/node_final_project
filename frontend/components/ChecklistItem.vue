<template>
  <div class="flex items-center gap-2.5">
    <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
      :class="done ? 'bg-green-500' : 'border-2 border-gray-300'">
      <svg v-if="done" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span class="text-sm" :class="done ? 'text-gray-700 line-through' : 'text-gray-500'">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  done: { type: Boolean, required: true },
  label: { type: String, required: true }
})
</script>
