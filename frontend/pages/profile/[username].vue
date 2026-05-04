<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Loading -->
      <div v-if="profileStore.loading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>

      <!-- Profile Not Found -->
      <div v-else-if="!profile" class="max-w-2xl mx-auto text-center py-20">
        <h1 class="text-4xl font-bold mb-4">Profil non trouvé</h1>
        <p class="text-gray-600 mb-8">Ce profil n'existe pas ou est privé.</p>
        <NuxtLink to="/" class="btn-primary">Retour à l'accueil</NuxtLink>
      </div>

      <!-- Public Profile -->
      <div v-else class="max-w-2xl mx-auto">
        <div class="card text-center" :style="{ borderTop: `4px solid ${profile.theme}` }">
          <!-- Avatar -->
          <div v-if="profile.avatar" class="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
            <img :src="profile.avatar" :alt="profile.user?.firstName" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-32 h-32 rounded-full mx-auto mb-6 bg-gray-200 flex items-center justify-center">
            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <!-- Name & Title -->
          <h1 class="text-4xl font-bold mb-2">
            {{ profile.user?.firstName }} {{ profile.user?.lastName }}
          </h1>
          <p v-if="profile.title" class="text-xl text-gray-600 mb-6">{{ profile.title }}</p>

          <!-- Bio -->
          <p v-if="profile.bio" class="text-gray-700 mb-8 max-w-lg mx-auto">{{ profile.bio }}</p>

          <!-- Links -->
          <div v-if="profile.links && profile.links.length > 0" class="space-y-3 mb-8">
            <a
              v-for="link in profile.links"
              :key="link._id"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
              :style="{ borderLeft: `4px solid ${profile.theme}` }"
            >
              <div class="flex items-center justify-center gap-3">
                <svg class="w-5 h-5" :style="{ color: profile.theme }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span class="font-medium">{{ link.label }}</span>
              </div>
            </a>
          </div>

          <!-- Stats -->
          <div class="flex justify-center gap-8 text-sm text-gray-500">
            <div>
              <span class="font-bold text-gray-900">{{ profile.stats?.views || 0 }}</span> vues
            </div>
            <div>
              <span class="font-bold text-gray-900">{{ profile.stats?.scans || 0 }}</span> scans
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8">
          <p class="text-gray-600 mb-4">Propulsé par</p>
          <NuxtLink to="/" class="text-primary-600 font-bold text-lg hover:text-primary-700">
            Smart Identity
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProfileStore } from '~/stores/profile'

definePageMeta({
  layout: false
})

const route = useRoute()
const profileStore = useProfileStore()

const profile = computed(() => profileStore.publicProfile)

onMounted(async () => {
  try {
    await profileStore.fetchPublicProfile(route.params.username)
  } catch (error) {
    console.error('Profile not found:', error)
  }
})

useHead({
  title: computed(() => profile.value
    ? `${profile.value.user?.firstName} ${profile.value.user?.lastName} - Smart Identity`
    : 'Profil - Smart Identity'
  ),
  meta: computed(() => profile.value ? [
    { name: 'description', content: profile.value.bio || 'Profil Smart Identity' }
  ] : [])
})
</script>
