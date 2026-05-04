<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Mes Bracelets NFC</h1>

    <!-- Activate New Bracelet -->
    <div class="card mb-8">
      <h2 class="text-xl font-bold mb-6">Activer un nouveau bracelet</h2>
      <form @submit.prevent="handleActivate" class="flex gap-4">
        <input
          v-model="nfcId"
          type="text"
          required
          class="input-field flex-grow"
          placeholder="Code NFC (ex: NFC-ABC12345)"
          pattern="NFC-[A-Z0-9]{8}"
        />
        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Activation...' : 'Activer' }}
        </button>
      </form>
      <p class="text-sm text-gray-500 mt-2">
        Le code NFC se trouve sur l'emballage de votre bracelet
      </p>

      <!-- Generate Sample NFC ID -->
      <div class="mt-4 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm text-blue-900 mb-2">
          <strong>Mode démonstration :</strong> Générer un code NFC de test
        </p>
        <button type="button" @click="generateSampleNfcId" class="btn-secondary text-sm">
          Générer un code
        </button>
      </div>

      <div v-if="error" class="mt-4 p-4 bg-red-50 text-red-800 rounded-lg text-sm">
        {{ error }}
      </div>
    </div>

    <!-- Bracelets List -->
    <div class="card">
      <h2 class="text-xl font-bold mb-6">Mes bracelets actifs</h2>

      <!-- Loading -->
      <div v-if="loadingList" class="text-center py-10">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mx-auto"></div>
      </div>

      <!-- Empty state -->
      <div v-else-if="bracelets.length === 0" class="text-center py-12 text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p class="text-lg font-medium mb-2">Aucun bracelet activé</p>
        <p class="text-sm">Activez votre premier bracelet NFC ci-dessus</p>
      </div>

      <!-- Bracelets list -->
      <div v-else class="space-y-4">
        <div
          v-for="bracelet in bracelets"
          :key="bracelet._id"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-primary-200 transition-colors"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center"
              :class="bracelet.isActive ? 'bg-green-100' : 'bg-gray-100'">
              <svg class="w-6 h-6" :class="bracelet.isActive ? 'text-green-600' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="font-bold text-gray-900 font-mono">{{ bracelet.nfcId }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="flex items-center gap-1 text-xs font-medium"
                  :class="bracelet.isActive ? 'text-green-600' : 'text-gray-400'">
                  <span class="w-1.5 h-1.5 rounded-full"
                    :class="bracelet.isActive ? 'bg-green-500' : 'bg-gray-400'"></span>
                  {{ bracelet.isActive ? 'Actif' : 'Désactivé' }}
                </span>
                <span class="text-xs text-gray-400">
                  Activé le {{ formatDate(bracelet.activatedAt) }}
                </span>
              </div>
            </div>
          </div>

          <button
            v-if="bracelet.isActive"
            @click="handleDeactivate(bracelet._id)"
            :disabled="deactivatingId === bracelet._id"
            class="btn-secondary text-sm text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
          >
            {{ deactivatingId === bracelet._id ? '...' : 'Désactiver' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

useHead({
  title: 'Mes Bracelets - Smart Identity'
})

const api = useApi()
const toast = useToast()
const { generateNfcId } = useNfc()

const nfcId = ref('')
const loading = ref(false)
const loadingList = ref(false)
const error = ref('')
const bracelets = ref([])
const deactivatingId = ref(null)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const fetchBracelets = async () => {
  loadingList.value = true
  try {
    const response = await api.get('/bracelets/my-bracelets')
    bracelets.value = response.data.data
  } catch (err) {
    console.error('Error loading bracelets:', err)
  } finally {
    loadingList.value = false
  }
}

const handleActivate = async () => {
  loading.value = true
  error.value = ''

  try {
    await api.post('/bracelets/activate', { nfcId: nfcId.value.toUpperCase() })
    toast.success('Bracelet activé avec succès !')
    nfcId.value = ''
    await fetchBracelets()
  } catch (err) {
    error.value = err.response?.data?.error || 'Erreur lors de l\'activation'
  } finally {
    loading.value = false
  }
}

const handleDeactivate = async (id) => {
  deactivatingId.value = id
  try {
    await api.delete(`/bracelets/${id}/deactivate`)
    toast.success('Bracelet désactivé')
    await fetchBracelets()
  } catch (err) {
    toast.error(err.response?.data?.error || 'Erreur lors de la désactivation')
  } finally {
    deactivatingId.value = null
  }
}

const generateSampleNfcId = () => {
  nfcId.value = generateNfcId()
  toast.info('Code NFC généré : ' + nfcId.value)
}

onMounted(() => {
  fetchBracelets()
})
</script>
