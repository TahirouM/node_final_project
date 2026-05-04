<template>
  <NuxtLink
    :to="to"
    @click="$emit('click')"
    class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group relative"
    :class="[
      isActive
        ? 'bg-primary-50 text-primary-700 font-semibold'
        : highlight
          ? 'text-primary-600 border border-dashed border-primary-200 hover:bg-primary-50'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    ]"
  >
    <!-- Active indicator -->
    <span
      v-if="isActive"
      class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary-600 rounded-r-full"
    ></span>

    <!-- Icon -->
    <svg
      class="w-4 h-4 flex-shrink-0"
      :class="isActive ? 'text-primary-600' : highlight ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-600'"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
    </svg>

    <!-- Label -->
    <span class="flex-grow leading-none">{{ label }}</span>

    <!-- Badge -->
    <span
      v-if="badge !== null && badge !== undefined && badge !== 0"
      class="min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-bold"
      :class="isActive ? 'bg-primary-200 text-primary-700' : 'bg-gray-200 text-gray-500'"
    >{{ badge }}</span>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
  badge: { type: [Number, String], default: null },
  highlight: { type: Boolean, default: false },
  exact: { type: Boolean, default: false },
})

defineEmits(['click'])

const route = useRoute()
const isActive = computed(() =>
  props.exact ? route.path === props.to : route.path.startsWith(props.to)
)
</script>
