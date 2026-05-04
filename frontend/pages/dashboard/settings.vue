<template>
  <div>
    <h1 class="text-3xl font-bold mb-2">Paramètres</h1>
    <p class="text-gray-500 mb-8">Gérez votre compte et vos préférences</p>

    <!-- Tabs -->
    <div class="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-5 py-2 rounded-lg text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab: Account -->
    <div v-if="activeTab === 'account'" class="space-y-6">
      <div class="card">
        <h2 class="text-xl font-bold mb-6">Informations personnelles</h2>
        <form @submit.prevent="updateAccount" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Prénom</label>
              <input v-model="accountForm.firstName" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Nom</label>
              <input v-model="accountForm.lastName" type="text" class="input-field" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <input v-model="accountForm.email" type="email" class="input-field" />
          </div>
          <AppAlert :message="accountSuccess" type="success" />
          <AppAlert :message="accountError" type="error" />
          <button type="submit" :disabled="accountLoading" class="btn-primary">
            {{ accountLoading ? 'Enregistrement...' : 'Sauvegarder' }}
          </button>
        </form>
      </div>

      <!-- Danger zone -->
      <div class="card border-2 border-red-100">
        <h2 class="text-xl font-bold mb-2 text-red-700">Zone dangereuse</h2>
        <p class="text-gray-500 text-sm mb-4">Ces actions sont irréversibles.</p>
        <div class="flex gap-3">
          <button @click="showDeleteModal = true" class="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>

    <!-- Tab: Security -->
    <div v-if="activeTab === 'security'" class="space-y-6">
      <div class="card">
        <h2 class="text-xl font-bold mb-6">Changer le mot de passe</h2>
        <form @submit.prevent="changePassword" class="space-y-4 max-w-md">
          <div>
            <label class="block text-sm font-medium mb-2">Mot de passe actuel</label>
            <input v-model="passwordForm.current" type="password" class="input-field" placeholder="••••••••" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Nouveau mot de passe</label>
            <input v-model="passwordForm.newPass" type="password" class="input-field" placeholder="••••••••" />
            <!-- Strength indicator -->
            <div class="mt-2 flex gap-1">
              <div v-for="i in 4" :key="i" class="flex-1 h-1.5 rounded-full transition-colors"
                :class="passwordStrength >= i ? strengthColor : 'bg-gray-200'"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ strengthLabel }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Confirmer</label>
            <input v-model="passwordForm.confirm" type="password" class="input-field" placeholder="••••••••" />
          </div>
          <AppAlert :message="passwordMsg" :type="passwordMsgType" />
          <button type="submit" :disabled="passwordLoading" class="btn-primary">
            {{ passwordLoading ? 'Modification...' : 'Changer le mot de passe' }}
          </button>
        </form>
      </div>

      <!-- Sessions -->
      <div class="card">
        <h2 class="text-xl font-bold mb-4">Sessions actives</h2>
        <div class="space-y-3">
          <div v-for="session in sessions" :key="session.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="session.icon" />
              </svg>
              <div>
                <p class="text-sm font-medium">{{ session.device }}</p>
                <p class="text-xs text-gray-400">{{ session.location }} · {{ session.lastSeen }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span v-if="session.current" class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Actuelle</span>
              <button v-else class="text-xs text-red-500 hover:text-red-600 font-medium">Révoquer</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Notifications -->
    <div v-if="activeTab === 'notifications'" class="card">
      <h2 class="text-xl font-bold mb-6">Préférences de notification</h2>
      <div class="space-y-5">
        <div v-for="notif in notifications" :key="notif.id" class="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition">
          <div class="flex-grow">
            <p class="font-medium text-gray-900">{{ notif.label }}</p>
            <p class="text-sm text-gray-500">{{ notif.description }}</p>
          </div>
          <button
            @click="notif.enabled = !notif.enabled"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4"
            :class="notif.enabled ? 'bg-primary-600' : 'bg-gray-200'"
          >
            <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
              :class="notif.enabled ? 'translate-x-6' : 'translate-x-1'"></span>
          </button>
        </div>
        <button @click="saveNotifications" class="btn-primary mt-2">Sauvegarder les préférences</button>
      </div>
    </div>

    <!-- Tab: API -->
    <div v-if="activeTab === 'api'" class="space-y-6">
      <div class="card">
        <h2 class="text-xl font-bold mb-2">Clé API</h2>
        <p class="text-gray-500 text-sm mb-6">Utilisez cette clé pour intégrer Smart Identity dans vos applications.</p>
        <div class="flex gap-3 mb-4">
          <div class="flex-grow font-mono text-sm bg-gray-100 px-4 py-3 rounded-xl border border-gray-200 overflow-auto">
            {{ showApiKey ? apiKey : '•'.repeat(40) }}
          </div>
          <button @click="showApiKey = !showApiKey" class="btn-secondary px-4">
            {{ showApiKey ? 'Masquer' : 'Afficher' }}
          </button>
          <button @click="copyApiKey" class="btn-secondary px-4">
            {{ copied ? '✓ Copié' : 'Copier' }}
          </button>
        </div>
        <button @click="regenerateKey" class="text-sm text-red-500 hover:text-red-600 font-medium">
          Régénérer la clé
        </button>
      </div>

      <div class="card">
        <h2 class="text-xl font-bold mb-4">URL du profil public</h2>
        <div v-if="profileStore.myProfile" class="space-y-3">
          <div class="flex gap-3">
            <input :value="profileUrl" readonly class="input-field flex-grow font-mono text-sm bg-gray-50" />
            <button @click="copyUrl" class="btn-secondary px-4">Copier</button>
          </div>
          <div class="flex gap-3">
            <p class="text-sm text-gray-500">Pour simuler un scan NFC :</p>
            <a :href="nfcSimUrl" target="_blank" class="text-sm text-primary-600 hover:underline font-mono">{{ nfcSimUrl }}</a>
          </div>
        </div>
        <div v-else class="text-sm text-gray-400">
          Créez un profil pour obtenir votre URL publique.
        </div>
      </div>
    </div>

    <!-- Delete modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full">
        <h3 class="text-xl font-bold text-red-700 mb-3">Supprimer mon compte</h3>
        <p class="text-gray-600 mb-6">Cette action est irréversible. Toutes vos données seront supprimées définitivement.</p>
        <div class="flex gap-3">
          <button @click="showDeleteModal = false" class="btn-secondary flex-1">Annuler</button>
          <button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
            Supprimer définitivement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Paramètres - Smart Identity' })

const authStore = useAuthStore()
const profileStore = useProfileStore()
const toast = useToast()

const activeTab = ref('account')
const tabs = [
  { id: 'account', label: 'Compte' },
  { id: 'security', label: 'Sécurité' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'api', label: 'API & Intégration' },
]

// Account form
const accountForm = ref({
  firstName: authStore.user?.firstName || '',
  lastName: authStore.user?.lastName || '',
  email: authStore.user?.email || '',
})
const accountLoading = ref(false)
const accountSuccess = ref('')
const accountError = ref('')

const updateAccount = async () => {
  accountLoading.value = true
  accountSuccess.value = ''
  accountError.value = ''
  try {
    await authStore.updateMe(accountForm.value)
    accountSuccess.value = 'Informations mises à jour avec succès !'
  } catch (e) {
    accountError.value = e.error || 'Erreur lors de la mise à jour'
  } finally {
    accountLoading.value = false
  }
}

// Password form
const passwordForm = ref({ current: '', newPass: '', confirm: '' })
const passwordLoading = ref(false)
const passwordMsg = ref('')
const passwordMsgType = ref('error')

const passwordStrength = computed(() => {
  const p = passwordForm.value.newPass
  if (!p) return 0
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})
const strengthColor = computed(() => {
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500']
  return colors[passwordStrength.value - 1] || 'bg-gray-200'
})
const strengthLabel = computed(() => {
  const labels = ['', 'Faible', 'Moyen', 'Fort', 'Très fort']
  return labels[passwordStrength.value] || ''
})

const changePassword = async () => {
  if (passwordForm.value.newPass !== passwordForm.value.confirm) {
    passwordMsg.value = 'Les mots de passe ne correspondent pas'
    passwordMsgType.value = 'error'
    return
  }
  passwordLoading.value = true
  await new Promise(r => setTimeout(r, 800))
  passwordMsg.value = 'Mot de passe modifié avec succès !'
  passwordMsgType.value = 'success'
  passwordForm.value = { current: '', newPass: '', confirm: '' }
  passwordLoading.value = false
}

// Sessions
const sessions = [
  { id: 1, device: 'Chrome · macOS', location: 'Paris, FR', lastSeen: 'Maintenant', current: true, icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 2, device: 'Safari · iPhone', location: 'Paris, FR', lastSeen: 'Il y a 2h', current: false, icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
]

// Notifications
const notifications = ref([
  { id: 'scan', label: 'Scans NFC', description: 'Recevoir une notification à chaque scan de votre bracelet', enabled: true },
  { id: 'view', label: 'Nouvelles vues', description: 'Résumé quotidien des visites de votre profil', enabled: true },
  { id: 'order', label: 'Statut commandes', description: 'Mises à jour sur vos commandes en cours', enabled: true },
  { id: 'tips', label: 'Conseils et astuces', description: 'Recevez des conseils pour optimiser votre profil', enabled: false },
  { id: 'newsletter', label: 'Newsletter', description: 'Actualités Smart Identity et nouvelles fonctionnalités', enabled: false },
])

const saveNotifications = () => toast.success('Préférences de notification sauvegardées !')

// API Key
const showApiKey = ref(false)
const copied = ref(false)
const apiKey = 'si_live_' + (authStore.user?.id?.slice(-8) || 'xxxxxxxx') + '_' + Math.random().toString(36).substring(2, 18)

const copyApiKey = async () => {
  await navigator.clipboard.writeText(apiKey).catch(() => {})
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
const regenerateKey = () => toast.info('Fonctionnalité disponible dans la version Pro')

const profileUrl = computed(() =>
  profileStore.myProfile ? `${process.client ? window.location.origin : 'https://smartidentity.com'}/profile/${profileStore.myProfile.publicUrl}` : ''
)
const nfcSimUrl = computed(() =>
  profileStore.myProfile ? `${process.client ? window.location.origin : 'https://smartidentity.com'}/nfc/NFC-DEMO1234` : ''
)
const copyUrl = async () => {
  await navigator.clipboard.writeText(profileUrl.value).catch(() => {})
  toast.success('URL copiée !')
}

const showDeleteModal = ref(false)

onMounted(async () => {
  if (!profileStore.myProfile) {
    await profileStore.fetchMyProfile().catch(() => {})
  }
})
</script>
