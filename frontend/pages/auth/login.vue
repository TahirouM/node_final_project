<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-10 space-y-4">
        <NuxtLink to="/" class="inline-block">
          <span class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
            Smart Identity
          </span>
        </NuxtLink>
        <div>
          <h2 class="text-4xl font-bold text-gray-900 mb-2">Bon retour !</h2>
          <p class="text-lg text-gray-600">Connectez-vous à votre compte</p>
        </div>
      </div>

      <!-- Login Card -->
      <div class="card shadow-xl border-2 border-gray-100">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Adresse email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="votre@email.com"
              autocomplete="email"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-semibold text-gray-700">Mot de passe</label>
              <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-700">
                Mot de passe oublié ?
              </a>
            </div>
            <input
              v-model="form.password"
              type="password"
              required
              class="input-field"
              placeholder="••••••••"
              autocomplete="current-password"
            />
          </div>

          <div v-if="error" class="p-4 bg-red-50 border-2 border-red-200 text-red-800 rounded-xl text-sm font-medium">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ error }}</span>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full text-lg py-4 shadow-lg"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connexion en cours...
            </span>
            <span v-else>Se connecter</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500 font-medium">Nouveau sur Smart Identity ?</span>
          </div>
        </div>

        <!-- Register Link -->
        <div class="text-center">
          <p class="text-gray-600 mb-4">
            Créez un compte pour profiter de toutes nos fonctionnalités
          </p>
          <NuxtLink to="/auth/register" class="btn-secondary w-full">
            Créer un compte
          </NuxtLink>
        </div>

        <!-- Demo Credentials -->
        <div class="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl">
          <div class="flex items-start gap-3 mb-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="text-sm font-bold text-blue-900 mb-2">Comptes de démonstration</p>
              <div class="text-sm text-blue-800 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="font-medium">👤 Utilisateur:</span>
                  <code class="bg-white/60 px-2 py-1 rounded">test@example.com / test123</code>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">👑 Admin:</span>
                  <code class="bg-white/60 px-2 py-1 rounded">admin@smartidentity.com / admin123</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Link -->
      <div class="text-center mt-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group">
          <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
  middleware: 'guest'
})

useHead({
  title: 'Connexion - Smart Identity'
})

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    await authStore.login(form.value)
    toast.success('Connexion réussie !')
    router.push('/dashboard')
  } catch (err) {
    error.value = err.error || 'Email ou mot de passe incorrect'
  } finally {
    loading.value = false
  }
}
</script>
