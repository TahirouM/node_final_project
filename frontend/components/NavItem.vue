<template>
  <NuxtLink
    :to="to"
    @click="$emit('click')"
    class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative"
    :class="[isActive ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900', highlight && !isActive ? 'border border-dashed border-primary-300 text-primary-600 hover:bg-primary-50' : '']"
  >
    <svg class="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" :class="isActive ? 'text-primary-600' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
    </svg>
    <span class="text-sm flex-grow">{{ label }}</span>
    <span v-if="badge !== null && badge !== undefined" class="min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-bold"
      :class="isActive ? 'bg-primary-200 text-primary-700' : 'bg-gray-200 text-gray-600'">
      {{ badge }}
    </span>
    <span v-if="isActive" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary-600 rounded-r-full"></span>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  badge: { type: [Number, String], default: null },
  highlight: { type: Boolean, default: false },
  exact: { type: Boolean, default: false }
})

defineEmits(['click'])
const route = useRoute()
const isActive = computed(() =>
  props.exact ? route.path === props.to : route.path.startsWith(props.to)
)
</script>
