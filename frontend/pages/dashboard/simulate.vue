<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Simulateur NFC</h1>
      <p class="text-gray-500 mt-1">Testez le workflow complet de votre bracelet Smart Identity</p>
    </div>

    <!-- No profile warning -->
    <div v-if="!profileStore.myProfile" class="card border-2 border-yellow-200 bg-yellow-50 mb-6">
      <div class="flex gap-3">
        <svg class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.07 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <div>
          <p class="font-semibold text-yellow-800">Profil requis</p>
          <p class="text-sm text-yellow-700 mt-1">Créez un profil public avant de simuler un scan NFC.</p>
          <NuxtLink to="/dashboard/profile" class="inline-block mt-2 text-sm font-semibold text-yellow-800 underline">
            Créer mon profil →
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <!-- Left: workflow steps -->
      <div class="space-y-4">
        <h2 class="text-lg font-bold text-gray-800">Comment ça marche</h2>

        <!-- Step 1 -->
        <div class="card border-l-4" :class="step >= 1 ? 'border-l-primary-500' : 'border-l-gray-200'">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
              :class="step > 1 ? 'bg-green-500 text-white' : step === 1 ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'">
              <svg v-if="step > 1" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span v-else>1</span>
            </div>
            <div class="flex-grow">
              <p class="font-bold text-gray-900">Bracelet activé</p>
              <p class="text-sm text-gray-500 mt-0.5">Vous portez votre bracelet NFC Smart Identity</p>
              <div v-if="bracelets.length > 0" class="mt-3">
                <select v-model="selectedBracelet" class="input-field text-sm">
                  <option v-for="b in bracelets" :key="b._id" :value="b">
                    {{ b.nfcId }} {{ b.isActive ? '(actif)' : '(inactif)' }}
                  </option>
                </select>
              </div>
              <div v-else class="mt-2">
                <NuxtLink to="/dashboard/bracelets" class="text-sm text-primary-600 hover:underline font-medium">
                  Activer un bracelet →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="card border-l-4" :class="step >= 2 ? 'border-l-primary-500' : 'border-l-gray-200'">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
              :class="step > 2 ? 'bg-green-500 text-white' : step === 2 ? 'bg-primary-600 text-white animate-pulse' : 'bg-gray-100 text-gray-400'">
              <svg v-if="step > 2" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span v-else>2</span>
            </div>
            <div class="flex-grow">
              <p class="font-bold text-gray-900">Approche d'un smartphone</p>
              <p class="text-sm text-gray-500 mt-0.5">La puce NFC est détectée automatiquement</p>
              <div v-if="step === 2" class="mt-3 flex items-center gap-2 text-primary-600">
                <div class="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-sm font-medium">Lecture en cours...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="card border-l-4" :class="step >= 3 ? 'border-l-primary-500' : 'border-l-gray-200'">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
              :class="step > 3 ? 'bg-green-500 text-white' : step === 3 ? 'bg-primary-600 text-white animate-pulse' : 'bg-gray-100 text-gray-400'">
              <svg v-if="step > 3" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span v-else>3</span>
            </div>
            <div class="flex-grow">
              <p class="font-bold text-gray-900">Résolution du profil</p>
              <p class="text-sm text-gray-500 mt-0.5">L'API Smart Identity associe le code NFC à votre profil</p>
              <div v-if="step === 3" class="mt-2 font-mono text-xs text-gray-400">
                GET /api/bracelets/by-nfc/{{ selectedBracelet?.nfcId || '...' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="card border-l-4" :class="step >= 4 ? 'border-l-green-500' : 'border-l-gray-200'">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
              :class="step === 4 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'">
              <svg v-if="step === 4" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span v-else>4</span>
            </div>
            <div class="flex-grow">
              <p class="font-bold text-gray-900">Profil partagé !</p>
              <p class="text-sm text-gray-500 mt-0.5">Le visiteur voit votre page publique personnalisée</p>
              <div v-if="step === 4" class="mt-3">
                <a :href="`/profile/${profileStore.myProfile?.publicUrl}`" target="_blank"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 px-4 py-2 rounded-xl hover:bg-green-100 transition">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Voir mon profil public
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-3">
          <button
            @click="startSimulation"
            :disabled="simulating || !profileStore.myProfile"
            class="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {{ simulating ? 'Simulation en cours...' : 'Lancer la simulation' }}
          </button>
          <button v-if="step > 0" @click="resetSim" class="btn-secondary px-4">
            Réinitialiser
          </button>
        </div>
      </div>

      <!-- Right: phone mockup -->
      <div class="flex flex-col items-center">
        <h2 class="text-lg font-bold text-gray-800 mb-4 self-start">Aperçu smartphone</h2>

        <!-- Phone frame -->
        <div class="relative w-72 h-[540px] bg-gray-900 rounded-[3rem] shadow-2xl border-4 border-gray-800 overflow-hidden">
          <!-- Notch -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-20"></div>

          <!-- Screen content -->
          <div class="absolute inset-0 bg-gray-50 overflow-hidden flex flex-col">

            <!-- Idle state -->
            <div v-if="step === 0" class="flex-grow flex flex-col items-center justify-center p-8 text-center">
              <div class="w-20 h-20 rounded-2xl bg-gray-200 flex items-center justify-center mb-4">
                <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-gray-500 text-sm">Approchez le bracelet NFC...</p>
            </div>

            <!-- Scanning state -->
            <div v-else-if="step === 1 || step === 2" class="flex-grow bg-gradient-to-br from-primary-900 to-gray-900 flex flex-col items-center justify-center">
              <div class="relative w-28 h-28">
                <div class="absolute inset-0 rounded-full border-2 border-primary-400/40 animate-ping"></div>
                <div class="absolute inset-3 rounded-full border-2 border-primary-400/60 animate-ping" style="animation-delay:0.2s"></div>
                <div class="absolute inset-6 rounded-full bg-primary-600 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p class="text-white mt-6 font-semibold">Lecture NFC…</p>
              <p class="text-primary-300 text-xs mt-2 font-mono">{{ selectedBracelet?.nfcId || 'NFC-...' }}</p>
            </div>

            <!-- Loading step 3 -->
            <div v-else-if="step === 3" class="flex-grow flex flex-col items-center justify-center bg-white">
              <div class="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p class="text-gray-700 font-medium text-sm">Chargement du profil…</p>
            </div>

            <!-- Profile preview step 4 -->
            <div v-else-if="step === 4 && profileStore.myProfile" class="flex-grow overflow-auto">
              <!-- Mini browser bar -->
              <div class="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                <div class="flex gap-1">
                  <div class="w-2 h-2 rounded-full bg-red-400"></div>
                  <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div class="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div class="flex-grow bg-white rounded text-xs text-gray-500 px-2 py-1 text-center truncate">
                  smartidentity.com/profile/{{ profileStore.myProfile.publicUrl }}
                </div>
              </div>

              <div class="p-5 text-center" :style="{ borderTop: `4px solid ${profileStore.myProfile.theme || '#3b82f6'}` }">
                <div class="w-16 h-16 rounded-full mx-auto mb-3 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img v-if="profileStore.myProfile.avatar" :src="profileStore.myProfile.avatar" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 class="font-bold text-base text-gray-900">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</h3>
                <p v-if="profileStore.myProfile.title" class="text-xs text-gray-500 mb-3">{{ profileStore.myProfile.title }}</p>
                <p v-if="profileStore.myProfile.bio" class="text-xs text-gray-600 mb-4 line-clamp-3">{{ profileStore.myProfile.bio }}</p>
                <div class="space-y-2">
                  <div v-for="link in profileStore.myProfile.links?.slice(0, 3)" :key="link._id"
                    class="p-2 rounded-lg text-xs font-medium"
                    :style="{ backgroundColor: profileStore.myProfile.theme + '15', color: profileStore.myProfile.theme }">
                    {{ link.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- QR Code section -->
        <div v-if="profileStore.myProfile" class="mt-6 card w-full text-center">
          <p class="text-sm font-bold text-gray-700 mb-3">QR Code de votre profil</p>
          <img
            :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${profileUrl}`"
            alt="QR Code"
            class="w-32 h-32 mx-auto rounded-xl"
          />
          <p class="text-xs text-gray-400 mt-2">Scannez pour tester sans bracelet</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProfileStore } from '~/stores/profile'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Simulateur NFC - Smart Identity' })

const profileStore = useProfileStore()
const authStore = useAuthStore()
const api = useApi()

const step = ref(0)
const simulating = ref(false)
const bracelets = ref([])
const selectedBracelet = ref(null)

const profileUrl = computed(() =>
  profileStore.myProfile
    ? `${process.client ? window.location.origin : 'https://smartidentity.com'}/profile/${profileStore.myProfile.publicUrl}`
    : ''
)

onMounted(async () => {
  try {
    const [, res] = await Promise.all([
      profileStore.fetchMyProfile().catch(() => {}),
      api.get('/bracelets/my-bracelets').catch(() => null)
    ])
    if (res?.data?.data) {
      bracelets.value = res.data.data.filter(b => b.isActive)
      if (bracelets.value.length > 0) selectedBracelet.value = bracelets.value[0]
    }
  } catch {}
})

const startSimulation = async () => {
  simulating.value = true
  step.value = 1
  await new Promise(r => setTimeout(r, 1200))
  step.value = 2
  await new Promise(r => setTimeout(r, 1000))
  step.value = 3
  // Simulate API call
  if (profileStore.myProfile?._id) {
    await api.post(`/profiles/${profileStore.myProfile._id}/scan`).catch(() => {})
    await profileStore.fetchMyProfile().catch(() => {})
  }
  await new Promise(r => setTimeout(r, 800))
  step.value = 4
  simulating.value = false
}

const resetSim = () => {
  step.value = 0
  simulating.value = false
}
</script>
