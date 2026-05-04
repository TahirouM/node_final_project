<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100' : 'bg-white/80 backdrop-blur-md'">
      <nav class="container-custom">
        <div class="flex items-center justify-between h-16 lg:h-18">

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2.5 group flex-shrink-0">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md group-hover:shadow-primary-200 group-hover:scale-110 transition-all duration-300">
              <svg class="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Smart Identity
            </span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group whitespace-nowrap"
              :class="isActive(link.to) ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
            >
              {{ link.label }}
              <span
                class="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
                :class="isActive(link.to) ? 'w-4/5' : 'w-0 group-hover:w-1/2'"
              ></span>
            </NuxtLink>
          </div>

          <!-- Right Side Actions -->
          <div class="hidden lg:flex items-center gap-2">
            <!-- Cart -->
            <NuxtLink to="/shop/cart" class="relative p-2.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 group">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span v-if="cartStore.itemCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-br from-primary-500 to-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                {{ cartStore.itemCount }}
              </span>
            </NuxtLink>

            <!-- Separator -->
            <div class="w-px h-6 bg-gray-200 mx-1"></div>

            <!-- Authenticated -->
            <template v-if="authStore.isAuthenticated">
              <NuxtLink to="/dashboard" class="px-4 py-2 text-sm text-gray-700 hover:text-primary-600 font-medium rounded-xl hover:bg-gray-100 transition-all">
                Dashboard
              </NuxtLink>
              <button @click="handleLogout" class="px-4 py-2 text-sm text-red-500 hover:text-red-600 font-medium rounded-xl hover:bg-red-50 transition-all">
                Déconnexion
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login" class="px-4 py-2 text-sm text-gray-700 hover:text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all">
                Connexion
              </NuxtLink>
              <NuxtLink to="/auth/register" class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl shadow-sm hover:shadow-md hover:shadow-primary-100 transition-all duration-200 hover:-translate-y-0.5">
                Inscription
              </NuxtLink>
            </template>
          </div>

          <!-- Mobile Right: Cart + Hamburger -->
          <div class="flex items-center gap-2 lg:hidden">
            <NuxtLink to="/shop/cart" class="relative p-2 text-gray-500 hover:text-primary-600 rounded-xl transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span v-if="cartStore.itemCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {{ cartStore.itemCount }}
              </span>
            </NuxtLink>

            <!-- Hamburger -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div class="w-5 h-4 flex flex-col justify-between">
                <span class="block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center"
                  :class="mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''"></span>
                <span class="block h-0.5 bg-gray-700 rounded-full transition-all duration-300"
                  :class="mobileMenuOpen ? 'opacity-0 scale-x-0' : ''"></span>
                <span class="block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center"
                  :class="mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu Drawer -->
      <transition
        enter-active-class="transition-all ease-out duration-300"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-screen"
        leave-active-class="transition-all ease-in duration-200"
        leave-from-class="opacity-100 max-h-screen"
        leave-to-class="opacity-0 max-h-0"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden overflow-hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl">
          <div class="container-custom py-4 flex flex-col gap-1">

            <!-- Nav links -->
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              @click="mobileMenuOpen = false"
              class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200"
              :class="isActive(link.to) ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'"
            >
              <span class="w-1.5 h-1.5 rounded-full transition-colors" :class="isActive(link.to) ? 'bg-primary-500' : 'bg-gray-300'"></span>
              {{ link.label }}
            </NuxtLink>

            <!-- Divider -->
            <div class="my-2 border-t border-gray-100"></div>

            <!-- Auth section -->
            <template v-if="authStore.isAuthenticated">
              <NuxtLink @click="mobileMenuOpen = false" to="/dashboard" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-xl font-medium transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </NuxtLink>
              <button @click="handleLogout" class="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all text-left w-full">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </template>
            <template v-else>
              <div class="flex flex-col gap-2 pt-1 pb-2">
                <NuxtLink @click="mobileMenuOpen = false" to="/auth/login" class="w-full px-5 py-3 text-center text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:border-primary-300 hover:text-primary-600 transition-all">
                  Connexion
                </NuxtLink>
                <NuxtLink @click="mobileMenuOpen = false" to="/auth/register" class="w-full px-5 py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-sm transition-all">
                  Inscription
                </NuxtLink>
              </div>
            </template>
          </div>
        </div>
      </transition>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div class="container-custom py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <!-- Brand -->
          <div class="space-y-4">
            <h3 class="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
              Smart Identity
            </h3>
            <p class="text-gray-400 leading-relaxed">
              Partagez votre profil professionnel en un tap avec notre bracelet NFC innovant.
            </p>
            <!-- Social Links -->
            <div class="flex space-x-4 pt-4">
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all hover:scale-110">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="font-bold text-lg mb-6">Navigation</h4>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg class="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Accueil
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/features" class="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg class="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Fonctionnalités
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop" class="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg class="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Boutique
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about" class="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg class="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  À propos
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h4 class="font-bold text-lg mb-6">Légal</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">CGV</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-bold text-lg mb-6">Contact</h4>
            <ul class="space-y-3 text-gray-400">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contact@smartidentity.com</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+33 1 23 45 67 89</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 pt-8 mt-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-400 text-sm">
              &copy; 2024 Smart Identity. Tous droits réservés.
            </p>
            <div class="flex items-center gap-6 text-sm text-gray-400">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Tous les systèmes opérationnels
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const route = useRoute()

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/features', label: 'Fonctionnalités' },
  { to: '/shop', label: 'Boutique' },
  { to: '/about', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  authStore.initAuth()
  cartStore.loadCart()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleLogout = () => {
  authStore.logout()
  mobileMenuOpen.value = false
}
</script>
