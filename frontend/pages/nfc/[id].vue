<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-primary-950 to-gray-900 flex items-center justify-center p-4">

    <!-- Phase 1: Scanning animation -->
    <div v-if="phase === 'scanning'" class="text-center">
      <div class="relative w-48 h-48 mx-auto mb-8">
        <!-- Pulsing rings -->
        <div class="absolute inset-0 rounded-full border-4 border-primary-400/30 animate-ping"></div>
        <div class="absolute inset-4 rounded-full border-4 border-primary-400/50 animate-ping" style="animation-delay: 0.2s"></div>
        <div class="absolute inset-8 rounded-full border-4 border-primary-400/70 animate-ping" style="animation-delay: 0.4s"></div>
        <!-- Center icon -->
        <div class="absolute inset-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-2xl shadow-primary-500/50">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <p class="text-white text-2xl font-bold mb-2">Lecture NFC...</p>
      <p class="text-primary-300 font-mono text-sm">{{ braceletId }}</p>
    </div>

    <!-- Phase 2: Connecting -->
    <div v-else-if="phase === 'connecting'" class="text-center">
      <div class="w-24 h-24 mx-auto mb-8 relative">
        <div class="w-24 h-24 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      <p class="text-white text-2xl font-bold mb-2">Connexion au profil...</p>
      <p class="text-primary-300 text-sm">Récupération des données</p>
    </div>

    <!-- Phase 3: Success + Profile Preview -->
    <div v-else-if="phase === 'success'" class="w-full max-w-sm">
      <!-- Success flash -->
      <div class="text-center mb-6">
        <div class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3 animate-bounce">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p class="text-white font-bold text-lg">Profil détecté !</p>
        <p class="text-primary-300 text-sm">Redirection dans {{ countdown }}s</p>
      </div>

      <!-- Profile mini card -->
      <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 text-white text-center">
        <div v-if="profile?.avatar" class="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-white/30">
          <img :src="profile.avatar" class="w-full h-full object-cover" />
        </div>
        <div v-else class="w-20 h-20 rounded-full mx-auto mb-4 bg-white/20 flex items-center justify-center ring-4 ring-white/30">
          <svg class="w-10 h-10 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold mb-1">{{ profile?.user?.firstName }} {{ profile?.user?.lastName }}</h2>
        <p v-if="profile?.title" class="text-white/70 text-sm mb-4">{{ profile?.title }}</p>
        <div class="flex justify-center gap-6 text-xs text-white/50">
          <span>{{ profile?.stats?.views || 0 }} vues</span>
          <span>{{ profile?.stats?.scans || 0 }} scans</span>
        </div>
      </div>

      <button @click="goToProfile" class="w-full mt-4 py-3 px-6 bg-white text-primary-700 font-bold rounded-2xl hover:bg-primary-50 transition">
        Voir le profil complet →
      </button>
    </div>

    <!-- Phase 4: Error -->
    <div v-else-if="phase === 'error'" class="text-center max-w-sm">
      <div class="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <p class="text-white text-2xl font-bold mb-3">Bracelet non reconnu</p>
      <p class="text-gray-400 mb-8">Ce code NFC n'est pas associé à un profil actif.</p>
      <NuxtLink to="/" class="inline-block px-8 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition">
        Retour à l'accueil
      </NuxtLink>
    </div>

    <!-- Branding -->
    <div class="absolute bottom-8 left-0 right-0 text-center">
      <p class="text-white/30 text-xs">Propulsé par <span class="text-primary-400 font-semibold">Smart Identity</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({ layout: false })

useHead({ title: 'Lecture NFC - Smart Identity' })

const route = useRoute()
const router = useRouter()
const api = useApi()

const braceletId = route.params.id
const phase = ref('scanning')
const profile = ref(null)
const countdown = ref(3)

onMounted(async () => {
  // Phase 1: simulate NFC reading (1.5s)
  await new Promise(r => setTimeout(r, 1500))
  phase.value = 'connecting'

  try {
    // Phase 2: fetch bracelet → profile
    await new Promise(r => setTimeout(r, 1000))

    const res = await api.get(`/bracelets/by-nfc/${braceletId}`)
    profile.value = res.data.data

    // Record scan
    if (profile.value?._id) {
      await api.post(`/profiles/${profile.value._id}/scan`).catch(() => {})
    }

    phase.value = 'success'

    // Countdown redirect
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        goToProfile()
      }
    }, 1000)
  } catch {
    phase.value = 'error'
  }
})

const goToProfile = () => {
  if (profile.value?.publicUrl) {
    router.push(`/profile/${profile.value.publicUrl}`)
  }
}
</script>
