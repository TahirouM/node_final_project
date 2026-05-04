<template>
  <div class="border border-gray-200 rounded-xl p-6 text-center" :style="{ borderTop: `4px solid ${profile.theme}` }">
    <!-- Avatar -->
    <div v-if="profile.avatar" class="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
      <img :src="profile.avatar" :alt="profile.user?.firstName" class="w-full h-full object-cover" />
    </div>
    <div v-else class="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-100 flex items-center justify-center">
      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>

    <!-- Name & Title -->
    <h2 class="text-xl font-bold mb-1">{{ profile.user?.firstName }} {{ profile.user?.lastName }}</h2>
    <p v-if="profile.title" class="text-gray-500 mb-3 text-sm">{{ profile.title }}</p>
    <p v-if="profile.bio" class="text-sm text-gray-600 mb-4 line-clamp-3">{{ profile.bio }}</p>

    <!-- Links -->
    <div v-if="profile.links && profile.links.length > 0" class="space-y-1 mb-4">
      <div v-for="link in profile.links" :key="link._id || link.label" class="text-sm font-medium" :style="{ color: profile.theme }">
        {{ link.label }}
      </div>
    </div>

    <!-- Stats -->
    <div class="flex justify-center gap-6 text-xs text-gray-400 pt-3 border-t border-gray-100">
      <span><strong class="text-gray-700">{{ profile.stats?.views || 0 }}</strong> vues</span>
      <span><strong class="text-gray-700">{{ profile.stats?.scans || 0 }}</strong> scans</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profile: { type: Object, required: true }
})
</script>
