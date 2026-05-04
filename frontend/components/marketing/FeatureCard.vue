<template>
  <div class="card-hover text-center group">
    <div class="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
      :class="`bg-gradient-to-br ${gradient}`">
      <slot name="icon">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z" />
        </svg>
      </slot>
    </div>
    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ title }}</h3>
    <p class="text-gray-600 leading-relaxed">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  gradient: { type: String, default: 'from-primary-500 to-primary-600' }
})
</script>
