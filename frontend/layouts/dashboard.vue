<template>
  <div class="flex min-h-screen bg-gray-50">

    <!-- ===== SIDEBAR ===== -->
    <aside class="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40 -translate-x-full lg:translate-x-0 transition-transform duration-300"
      :class="{ 'translate-x-0': sidebarOpen }">

      <!-- Logo -->
      <div class="flex items-center gap-3 px-5 h-16 border-b border-gray-100 shrink-0">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        </div>
        <span class="text-base font-bold text-primary-700">Smart Identity</span>
      </div>

      <!-- Nav scrollable -->
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">

        <!-- User card -->
        <div class="flex items-center gap-3 px-2 py-3 mb-4 bg-primary-50 rounded-2xl">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {{ initials }}
          </div>
          <div class="min-w-0">
            <p class="font-semibold text-sm text-gray-900 truncate">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</p>
            <span class="text-xs text-gray-400">En ligne</span>
          </div>
        </div>

        <!-- Profile completion -->
        <div v-if="profileStore.myProfile" class="px-2 py-3 mb-4 bg-gray-50 rounded-2xl">
          <div class="flex justify-between mb-1.5">
            <span class="text-xs font-semibold text-gray-500">Profil complété</span>
            <span class="text-xs font-bold text-primary-600">{{ profileCompletion }}%</span>
          </div>
          <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500"
              :style="{ width: profileCompletion + '%' }"></div>
          </div>
        </div>

        <!-- Section: Général -->
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-2">Général</p>
        <SideNavItem to="/dashboard" :exact="true" label="Accueil"
          icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          @click="sidebarOpen = false" />
        <SideNavItem to="/dashboard/analytics" label="Analytics"
          icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          :badge="profileStore.myProfile?.stats?.views || null"
          @click="sidebarOpen = false" />

        <!-- Section: Identité NFC -->
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-2 mt-3">Identité NFC</p>
        <SideNavItem to="/dashboard/profile" label="Mon Profil"
          icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          @click="sidebarOpen = false" />
        <SideNavItem to="/dashboard/bracelets" label="Mes Bracelets"
          icon="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          @click="sidebarOpen = false" />
        <SideNavItem to="/dashboard/simulate" label="Simulateur NFC" :highlight="true"
          icon="M13 10V3L4 14h7v7l9-11h-7z"
          @click="sidebarOpen = false" />

        <!-- Section: Boutique -->
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-2 mt-3">Boutique</p>
        <SideNavItem to="/shop/orders" label="Mes Commandes"
          icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          @click="sidebarOpen = false" />
        <SideNavItem to="/shop" label="Boutique"
          icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          @click="sidebarOpen = false" />

        <!-- Section: Compte -->
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-2 mt-3">Compte</p>
        <SideNavItem to="/dashboard/settings" label="Paramètres"
          icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          @click="sidebarOpen = false" />
      </nav>

      <!-- Bottom actions -->
      <div class="shrink-0 border-t border-gray-100 px-3 py-3 space-y-1">
        <a v-if="profileStore.myProfile"
          :href="`/profile/${profileStore.myProfile.publicUrl}`" target="_blank"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-primary-600 hover:bg-primary-50 transition font-medium">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Mon profil public
        </a>
        <NuxtLink to="/"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-100 transition">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au site
        </NuxtLink>
        <button @click="authStore.logout()"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition text-left">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>

    <!-- Overlay mobile -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/40 z-30 lg:hidden"></div>

    <!-- ===== CONTENU PRINCIPAL ===== -->
    <div class="flex flex-col flex-1 min-w-0 lg:pl-64">

      <!-- Topbar -->
      <header class="sticky top-0 z-20 h-16 bg-white border-b border-gray-100 flex items-center gap-3 px-4 lg:px-6 shrink-0">
        <!-- Burger mobile -->
        <button @click="sidebarOpen = !sidebarOpen"
          class="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition shrink-0">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Titre page -->
        <span class="font-semibold text-gray-800 text-sm">{{ pageTitle }}</span>

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- Simuler NFC -->
        <NuxtLink to="/dashboard/simulate"
          class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-xl text-sm font-medium hover:bg-primary-100 transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Simuler NFC
        </NuxtLink>

        <!-- Panier -->
        <NuxtLink to="/shop/cart" class="relative p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="cartStore.itemCount > 0"
            class="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
            {{ cartStore.itemCount }}
          </span>
        </NuxtLink>

        <!-- Avatar + dropdown -->
        <div class="relative" ref="userMenuRef">
          <button @click="userMenuOpen = !userMenuOpen"
            class="flex items-center gap-1.5 p-1.5 rounded-xl hover:bg-gray-100 transition">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {{ initials }}
            </div>
            <svg class="w-3.5 h-3.5 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="userMenuOpen"
            class="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
            <div class="px-4 py-3 border-b border-gray-100">
              <p class="font-semibold text-sm text-gray-900">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</p>
              <p class="text-xs text-gray-400 truncate">{{ authStore.user?.email }}</p>
            </div>
            <NuxtLink to="/dashboard/settings" @click="userMenuOpen = false"
              class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Paramètres
            </NuxtLink>
            <div class="border-t border-gray-100 mt-1 pt-1">
              <button @click="authStore.logout()"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition text-left">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Contenu page -->
      <main class="flex-1 p-4 lg:p-8">
        <slot />
      </main>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import { useProfileStore } from '~/stores/profile'

const authStore = useAuthStore()
const cartStore = useCartStore()
const profileStore = useProfileStore()
const route = useRoute()

const sidebarOpen = ref(false)
const userMenuOpen = ref(false)
const userMenuRef = ref(null)

const initials = computed(() =>
  (authStore.user?.firstName?.[0] || '') + (authStore.user?.lastName?.[0] || '')
)

const pageTitles = {
  '/dashboard': 'Tableau de bord',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/profile': 'Mon Profil',
  '/dashboard/bracelets': 'Mes Bracelets',
  '/dashboard/simulate': 'Simulateur NFC',
  '/dashboard/settings': 'Paramètres',
  '/shop/orders': 'Mes Commandes',
}
const pageTitle = computed(() => pageTitles[route.path] || 'Dashboard')

const profileCompletion = computed(() => {
  const p = profileStore.myProfile
  if (!p) return 0
  let s = 0
  if (p.title) s += 20
  if (p.bio) s += 20
  if (p.avatar) s += 20
  if (p.links?.length > 0) s += 20
  if (p.publicUrl) s += 20
  return s
})

const handleClickOutside = (e) => {
  if (userMenuRef.value && !userMenuRef.value.contains(e.target)) {
    userMenuOpen.value = false
  }
}

onMounted(() => {
  authStore.initAuth()
  cartStore.loadCart()
  profileStore.fetchMyProfile().catch(() => {})
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
