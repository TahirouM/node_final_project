<template>
  <div class="space-y-8">
    <!-- Welcome header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Bonjour, {{ authStore.user?.firstName }} 👋</h1>
        <p class="text-gray-500 mt-1">Voici un résumé de votre activité Smart Identity</p>
      </div>
      <NuxtLink to="/dashboard/simulate"
        class="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary-200 transition-all text-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Simuler un tap NFC
      </NuxtLink>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card text-center">
        <p class="text-3xl font-bold text-primary-600 mb-1">{{ profileStats.views }}</p>
        <p class="text-xs font-semibold text-gray-500 mb-2">Vues profil</p>
        <div class="flex items-center justify-center gap-1 text-xs text-green-600">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
          +12% ce mois
        </div>
      </div>
      <div class="card text-center">
        <p class="text-3xl font-bold text-green-600 mb-1">{{ profileStats.scans }}</p>
        <p class="text-xs font-semibold text-gray-500 mb-2">Scans NFC</p>
        <div class="flex items-center justify-center gap-1 text-xs text-green-600">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
          +8% ce mois
        </div>
      </div>
      <div class="card text-center">
        <p class="text-3xl font-bold text-blue-600 mb-1">{{ ordersStore.orders.length }}</p>
        <p class="text-xs font-semibold text-gray-500 mb-2">Commandes</p>
        <p class="text-xs text-gray-400">Total achats</p>
      </div>
      <div class="card text-center">
        <p class="text-3xl font-bold text-purple-600 mb-1">{{ profileCompletion }}%</p>
        <p class="text-xs font-semibold text-gray-500 mb-2">Profil complété</p>
        <div class="w-full h-1 bg-gray-100 rounded-full mt-2">
          <div class="h-full rounded-full bg-purple-500 transition-all" :style="{ width: profileCompletion + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- NFC Workflow Banner (if no bracelet) -->
    <div v-if="!hasBracelet && profileStore.myProfile" class="card bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden relative">
      <div class="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
        <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="flex-grow">
          <p class="font-bold text-lg mb-1">Activez votre bracelet NFC</p>
          <p class="text-primary-100 text-sm">Vous avez un profil mais aucun bracelet. Activez-en un pour partager votre profil en un tap.</p>
        </div>
        <NuxtLink to="/dashboard/bracelets" class="px-5 py-2.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition flex-shrink-0 text-sm">
          Activer →
        </NuxtLink>
      </div>
    </div>

    <!-- Setup guide (if no profile) -->
    <div v-if="!profileStore.myProfile" class="card border-2 border-dashed border-gray-200">
      <h2 class="text-lg font-bold mb-4 text-gray-800">Démarrez en 3 étapes</h2>
      <div class="space-y-3">
        <div class="flex items-center gap-4 p-3 rounded-xl" :class="profileStore.myProfile ? 'bg-green-50' : 'bg-gray-50'">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            :class="profileStore.myProfile ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'">
            <svg v-if="profileStore.myProfile" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span v-else>1</span>
          </div>
          <div class="flex-grow">
            <p class="font-medium text-sm">Créez votre profil public</p>
            <p class="text-xs text-gray-500">Ajoutez vos infos, bio et liens</p>
          </div>
          <NuxtLink v-if="!profileStore.myProfile" to="/dashboard/profile" class="text-xs text-primary-600 font-semibold hover:underline">
            Commencer →
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
          <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">2</div>
          <div class="flex-grow">
            <p class="font-medium text-sm text-gray-400">Commandez et activez votre bracelet NFC</p>
            <p class="text-xs text-gray-400">Recevez votre bracelet et activez-le</p>
          </div>
          <NuxtLink to="/shop" class="text-xs text-primary-600 font-semibold hover:underline">Commander →</NuxtLink>
        </div>
        <div class="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
          <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">3</div>
          <div class="flex-grow">
            <p class="font-medium text-sm text-gray-400">Partagez votre profil en un tap</p>
            <p class="text-xs text-gray-400">Approchez le bracelet d'un smartphone</p>
          </div>
          <NuxtLink to="/dashboard/simulate" class="text-xs text-primary-600 font-semibold hover:underline">Simuler →</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main content row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Profile card -->
      <div class="card">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-lg font-bold text-gray-900">Mon Profil Public</h2>
          <NuxtLink to="/dashboard/profile" class="text-sm text-primary-600 hover:underline font-medium">Modifier →</NuxtLink>
        </div>

        <div v-if="profileStore.myProfile">
          <!-- Status row -->
          <div class="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
            <div class="w-2.5 h-2.5 rounded-full"
              :class="profileStore.myProfile.isPublic ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></div>
            <p class="text-sm text-gray-600">
              Profil <span class="font-semibold" :class="profileStore.myProfile.isPublic ? 'text-green-700' : 'text-gray-700'">
                {{ profileStore.myProfile.isPublic ? 'public' : 'privé' }}
              </span>
            </p>
            <span class="ml-auto text-xs font-mono text-gray-400">/{{ profileStore.myProfile.publicUrl }}</span>
          </div>

          <!-- Completion checklist -->
          <div class="space-y-2 mb-4">
            <ChecklistItem :done="!!profileStore.myProfile.title" label="Titre professionnel" />
            <ChecklistItem :done="!!profileStore.myProfile.bio" label="Bio" />
            <ChecklistItem :done="!!profileStore.myProfile.avatar" label="Photo de profil" />
            <ChecklistItem :done="profileStore.myProfile.links?.length > 0" label="Liens sociaux" />
          </div>

          <div class="flex gap-2">
            <a :href="`/profile/${profileStore.myProfile.publicUrl}`" target="_blank" class="btn-primary flex-1 text-center text-sm py-2">
              Voir mon profil
            </a>
            <NuxtLink to="/dashboard/analytics" class="btn-secondary flex-1 text-center text-sm py-2">
              Analytics
            </NuxtLink>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p class="text-gray-500 text-sm mb-4">Aucun profil créé</p>
          <NuxtLink to="/dashboard/profile" class="btn-primary text-sm">Créer mon profil</NuxtLink>
        </div>
      </div>

      <!-- Recent activity -->
      <div class="card">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-lg font-bold text-gray-900">Activité récente</h2>
          <NuxtLink to="/dashboard/analytics" class="text-sm text-primary-600 hover:underline font-medium">Tout voir →</NuxtLink>
        </div>

        <div class="space-y-3">
          <div v-for="event in recentActivity" :key="event.id" class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :class="event.bgColor">
              <svg class="w-4 h-4" :class="event.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="event.icon" />
              </svg>
            </div>
            <div class="flex-grow min-w-0">
              <p class="text-sm font-medium text-gray-900">{{ event.label }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ event.time }}</p>
            </div>
          </div>
          <div v-if="recentActivity.length === 0" class="text-center py-6 text-gray-400 text-sm">
            Aucune activité pour le moment
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <NuxtLink v-for="action in quickActions" :key="action.to" :to="action.to"
        class="card hover:shadow-md transition-all text-center group cursor-pointer">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
          :class="action.bg">
          <svg class="w-6 h-6" :class="action.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-gray-800">{{ action.label }}</p>
        <p class="text-xs text-gray-400 mt-0.5">{{ action.sub }}</p>
      </NuxtLink>
    </div>

    <!-- Last orders summary -->
    <div v-if="ordersStore.orders.length > 0" class="card">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-bold text-gray-900">Dernières commandes</h2>
        <NuxtLink to="/shop/orders" class="text-sm text-primary-600 hover:underline font-medium">Tout voir →</NuxtLink>
      </div>
      <div class="space-y-3">
        <div v-for="order in ordersStore.orders.slice(0, 3)" :key="order._id"
          class="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
          <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-200 flex-shrink-0">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="flex-grow min-w-0">
            <p class="text-sm font-semibold text-gray-900">#{{ order._id.slice(-6).toUpperCase() }}</p>
            <p class="text-xs text-gray-400">{{ formatDate(order.createdAt) }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-bold text-gray-900">{{ order.totalPrice?.toFixed(2) }} €</p>
            <span class="text-xs px-2 py-0.5 rounded-full" :class="statusClass(order.status)">{{ statusLabel(order.status) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProfileStore } from '~/stores/profile'
import { useOrdersStore } from '~/stores/orders'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Dashboard - Smart Identity' })

const profileStore = useProfileStore()
const ordersStore = useOrdersStore()
const authStore = useAuthStore()
const api = useApi()
const hasBracelet = ref(false)

const profileStats = computed(() => ({
  views: profileStore.myProfile?.stats?.views || 0,
  scans: profileStore.myProfile?.stats?.scans || 0
}))

const profileCompletion = computed(() => {
  const p = profileStore.myProfile
  if (!p) return 0
  let s = 0
  if (p.title) s += 25
  if (p.bio) s += 25
  if (p.avatar) s += 25
  if (p.links?.length > 0) s += 25
  return s
})

const recentActivity = computed(() => {
  const events = []
  if (profileStats.value.scans > 0) {
    events.push({ id: 1, label: `${profileStats.value.scans} scan(s) NFC enregistré(s)`, time: 'Total', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', bgColor: 'bg-green-100', iconColor: 'text-green-600' })
  }
  if (profileStats.value.views > 0) {
    events.push({ id: 2, label: `${profileStats.value.views} vue(s) du profil`, time: 'Total', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' })
  }
  if (ordersStore.orders.length > 0) {
    events.push({ id: 3, label: `${ordersStore.orders.length} commande(s) passée(s)`, time: 'Total', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' })
  }
  if (profileStore.myProfile) {
    events.push({ id: 4, label: 'Profil créé et configuré', time: 'Compte actif', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', bgColor: 'bg-primary-100', iconColor: 'text-primary-600' })
  }
  return events
})

const quickActions = [
  { to: '/dashboard/simulate', label: 'Simuler NFC', sub: 'Tester le workflow', bg: 'bg-primary-100', iconColor: 'text-primary-600', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { to: '/dashboard/analytics', label: 'Analytics', sub: 'Voir les stats', bg: 'bg-green-100', iconColor: 'text-green-600', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { to: '/shop', label: 'Boutique', sub: 'Commander un bracelet', bg: 'bg-blue-100', iconColor: 'text-blue-600', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { to: '/dashboard/settings', label: 'Paramètres', sub: 'Compte et sécurité', bg: 'bg-gray-200', iconColor: 'text-gray-600', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
]

const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
const statusLabel = (s) => ({ pending: 'En attente', confirmed: 'Confirmée', shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée' })[s] || s
const statusClass = (s) => ({
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
})[s] || 'bg-gray-100 text-gray-700'

onMounted(async () => {
  await Promise.allSettled([
    profileStore.fetchMyProfile(),
    ordersStore.fetchMyOrders(),
    api.get('/bracelets/my-bracelets').then(r => {
      hasBracelet.value = r.data.data?.some(b => b.isActive) || false
    })
  ])
})
</script>
