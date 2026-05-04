<template>
  <div>
    <!-- User summary -->
    <div class="flex items-center gap-3 mb-6 p-3 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {{ authStore.user?.firstName?.[0] }}{{ authStore.user?.lastName?.[0] }}
      </div>
      <div class="min-w-0">
        <p class="font-semibold text-sm text-gray-900 truncate">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</p>
        <div class="flex items-center gap-1 mt-0.5">
          <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          <span class="text-xs text-gray-500">En ligne</span>
        </div>
      </div>
    </div>

    <!-- Profile completion -->
    <div v-if="profileStore.myProfile" class="mb-6 p-3 bg-gray-50 rounded-2xl">
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-semibold text-gray-600">Profil complété</p>
        <p class="text-xs font-bold text-primary-600">{{ profileCompletion }}%</p>
      </div>
      <div class="w-full h-1.5 bg-gray-200 rounded-full">
        <div class="h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-500"
          :style="{ width: profileCompletion + '%' }"></div>
      </div>
    </div>

    <!-- Navigation groups -->
    <nav class="space-y-1">
      <p class="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Général</p>

      <NavItem to="/dashboard" :exact="true" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" label="Accueil" @click="$emit('navigate')" />

      <NavItem to="/dashboard/analytics" icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" label="Analytics" :badge="profileStore.myProfile ? profileStore.myProfile.stats?.views : null" @click="$emit('navigate')" />

      <p class="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">Identité</p>

      <NavItem to="/dashboard/profile" icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" label="Mon Profil" @click="$emit('navigate')" />

      <NavItem to="/dashboard/bracelets" icon="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" label="Mes Bracelets" @click="$emit('navigate')" />

      <NavItem to="/dashboard/simulate" icon="M13 10V3L4 14h7v7l9-11h-7z" label="Simulateur NFC" highlight @click="$emit('navigate')" />

      <p class="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">Boutique</p>

      <NavItem to="/shop/orders" icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" label="Mes Commandes" @click="$emit('navigate')" />

      <NavItem to="/shop" icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" label="Boutique" @click="$emit('navigate')" />

      <p class="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">Compte</p>

      <NavItem to="/dashboard/settings" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" label="Paramètres" @click="$emit('navigate')" />
    </nav>

    <!-- Public profile quick link -->
    <div v-if="profileStore.myProfile" class="mt-6 pt-6 border-t border-gray-200">
      <a :href="`/profile/${profileStore.myProfile.publicUrl}`" target="_blank"
        class="flex items-center gap-2 px-3 py-2.5 text-sm text-primary-600 hover:bg-primary-50 rounded-xl transition font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Voir mon profil public
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'

defineEmits(['navigate'])

const authStore = useAuthStore()
const profileStore = useProfileStore()

const profileCompletion = computed(() => {
  const p = profileStore.myProfile
  if (!p) return 0
  let score = 0
  if (p.title) score += 20
  if (p.bio) score += 20
  if (p.avatar) score += 20
  if (p.links?.length > 0) score += 20
  if (p.publicUrl) score += 20
  return score
})
</script>
