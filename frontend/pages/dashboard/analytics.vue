<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Analytics</h1>
        <p class="text-gray-500 mt-1">Performances de votre profil Smart Identity</p>
      </div>
      <div class="flex gap-2">
        <button
          v-for="p in periods"
          :key="p.value"
          @click="selectedPeriod = p.value"
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
          :class="selectedPeriod === p.value
            ? 'bg-primary-600 text-white shadow-md'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="kpi in kpis" :key="kpi.label" class="card text-center">
        <p class="text-3xl font-bold mb-1" :class="kpi.color">{{ kpi.value }}</p>
        <p class="text-xs text-gray-500 font-medium mb-2">{{ kpi.label }}</p>
        <div class="flex items-center justify-center gap-1 text-xs" :class="kpi.trend >= 0 ? 'text-green-600' : 'text-red-500'">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="kpi.trend >= 0 ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
          </svg>
          <span>{{ Math.abs(kpi.trend) }}% vs période préc.</span>
        </div>
      </div>
    </div>

    <!-- Main charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

      <!-- Activity chart (simulated bars) -->
      <div class="card lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold text-gray-900">Activité quotidienne</h2>
          <div class="flex gap-4 text-xs">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-primary-500 inline-block"></span>Vues</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span>Scans</span>
          </div>
        </div>
        <div class="flex items-end gap-1.5 h-40">
          <div
            v-for="(day, i) in chartData"
            :key="i"
            class="flex-1 flex flex-col gap-1 items-center group"
          >
            <div class="w-full flex flex-col gap-0.5">
              <div
                class="w-full bg-primary-500 rounded-t-sm transition-all hover:bg-primary-600 cursor-pointer relative"
                :style="{ height: `${(day.views / maxVal) * 120}px`, minHeight: '4px' }"
              >
                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-10">
                  {{ day.views }} vues
                </div>
              </div>
              <div
                class="w-full bg-green-400 rounded-b-sm transition-all hover:bg-green-500 cursor-pointer"
                :style="{ height: `${(day.scans / maxVal) * 60}px`, minHeight: '2px' }"
              ></div>
            </div>
            <span class="text-xs text-gray-400 mt-1">{{ day.label }}</span>
          </div>
        </div>
      </div>

      <!-- Traffic sources -->
      <div class="card">
        <h2 class="text-lg font-bold text-gray-900 mb-6">Sources de trafic</h2>
        <div class="space-y-4">
          <div v-for="source in trafficSources" :key="source.label">
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :class="source.color"></span>
                <span class="text-sm text-gray-700">{{ source.label }}</span>
              </div>
              <span class="text-sm font-bold text-gray-900">{{ source.pct }}%</span>
            </div>
            <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700" :class="source.barColor" :style="{ width: source.pct + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Second row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

      <!-- Top links -->
      <div class="card">
        <h2 class="text-lg font-bold text-gray-900 mb-6">Liens les plus cliqués</h2>
        <div v-if="profileStore.myProfile?.links?.length" class="space-y-3">
          <div
            v-for="(link, i) in profileStore.myProfile.links.slice(0, 5)"
            :key="link._id || i"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
          >
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              :style="{ background: profileStore.myProfile.theme || '#3b82f6' }">
              {{ i + 1 }}
            </div>
            <div class="flex-grow min-w-0">
              <p class="font-medium text-sm text-gray-900 truncate">{{ link.label }}</p>
              <p class="text-xs text-gray-400 capitalize">{{ link.type }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-sm text-gray-900">{{ Math.floor(Math.random() * 80 + 10) }}</p>
              <p class="text-xs text-gray-400">clics</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <p class="text-sm">Aucun lien configuré</p>
          <NuxtLink to="/dashboard/profile" class="text-primary-600 text-sm hover:underline mt-2 block">
            Ajouter des liens →
          </NuxtLink>
        </div>
      </div>

      <!-- Devices & Geography -->
      <div class="card">
        <h2 class="text-lg font-bold text-gray-900 mb-6">Appareils utilisés</h2>
        <div class="space-y-4 mb-6">
          <div v-for="device in devices" :key="device.label" class="flex items-center gap-4">
            <svg class="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="device.icon" />
            </svg>
            <div class="flex-grow">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm text-gray-700">{{ device.label }}</span>
                <span class="text-sm font-bold">{{ device.pct }}%</span>
              </div>
              <div class="w-full h-2 bg-gray-100 rounded-full">
                <div class="h-full rounded-full bg-primary-500" :style="{ width: device.pct + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-4">
          <h3 class="text-sm font-bold text-gray-700 mb-3">Top pays</h3>
          <div class="flex gap-2 flex-wrap">
            <span v-for="country in topCountries" :key="country.name"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium">
              {{ country.flag }} {{ country.name }}
              <span class="text-gray-500">{{ country.pct }}%</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- NFC scan history -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold text-gray-900">Historique des scans NFC</h2>
        <span class="badge-primary text-xs">{{ profileStore.myProfile?.stats?.scans || 0 }} total</span>
      </div>

      <div v-if="!profileStore.myProfile" class="text-center py-8 text-gray-400">
        <p class="text-sm">Créez votre profil pour voir l'historique des scans</p>
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="scan in simulatedScanHistory"
          :key="scan.id"
          class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
        >
          <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="flex-grow min-w-0">
            <p class="text-sm font-medium text-gray-900">Scan via bracelet NFC</p>
            <p class="text-xs text-gray-400">{{ scan.location }} · {{ scan.device }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500">{{ scan.time }}</p>
            <p class="text-xs font-mono text-gray-400">{{ scan.nfcId }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProfileStore } from '~/stores/profile'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Analytics - Smart Identity' })

const profileStore = useProfileStore()
const selectedPeriod = ref('7d')

const periods = [
  { label: '7j', value: '7d' },
  { label: '30j', value: '30d' },
  { label: '90j', value: '90d' }
]

const views = profileStore.myProfile?.stats?.views || 0
const scans = profileStore.myProfile?.stats?.scans || 0

const kpis = computed(() => [
  { label: 'Vues du profil', value: views, trend: 12, color: 'text-primary-600' },
  { label: 'Scans NFC', value: scans, trend: 8, color: 'text-green-600' },
  { label: 'Taux de conversion', value: views > 0 ? Math.round((scans / views) * 100) + '%' : '0%', trend: -3, color: 'text-purple-600' },
  { label: 'Liens cliqués', value: Math.floor(views * 0.4), trend: 22, color: 'text-blue-600' },
])

// Simulated chart data for last 7 days
const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const chartData = computed(() => days.map((label, i) => ({
  label,
  views: Math.max(0, Math.floor((views / 7) * (0.5 + Math.random()))),
  scans: Math.max(0, Math.floor((scans / 7) * (0.3 + Math.random())))
})))
const maxVal = computed(() => Math.max(...chartData.value.map(d => d.views), 1))

const trafficSources = [
  { label: 'Scan NFC direct', pct: 48, color: 'bg-primary-500', barColor: 'bg-primary-500' },
  { label: 'Lien partagé', pct: 28, color: 'bg-purple-500', barColor: 'bg-purple-500' },
  { label: 'QR Code', pct: 16, color: 'bg-green-500', barColor: 'bg-green-500' },
  { label: 'Recherche directe', pct: 8, color: 'bg-orange-400', barColor: 'bg-orange-400' },
]

const devices = [
  { label: 'Mobile', pct: 72, icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { label: 'Desktop', pct: 22, icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Tablette', pct: 6, icon: 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
]

const topCountries = [
  { name: 'France', flag: '🇫🇷', pct: 61 },
  { name: 'Belgique', flag: '🇧🇪', pct: 18 },
  { name: 'Suisse', flag: '🇨🇭', pct: 12 },
  { name: 'Canada', flag: '🇨🇦', pct: 9 },
]

const simulatedScanHistory = computed(() => {
  if (!profileStore.myProfile) return []
  const locations = ['Paris, FR', 'Lyon, FR', 'Marseille, FR', 'Bruxelles, BE', 'Genève, CH']
  const devices = ['iPhone 15', 'Samsung S24', 'Pixel 8', 'iPhone 14', 'Huawei P60']
  const now = new Date()
  return Array.from({ length: Math.min(scans, 8) }, (_, i) => {
    const d = new Date(now - i * 3600000 * (1 + Math.random() * 12))
    return {
      id: i,
      location: locations[i % locations.length],
      device: devices[i % devices.length],
      time: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      nfcId: 'NFC-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    }
  })
})
</script>
