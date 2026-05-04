<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-bold text-primary-600">Smart Identity</NuxtLink>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Créer un compte</h2>
        <p class="mt-2 text-gray-600">Rejoignez Smart Identity gratuitement</p>
      </div>

      <div class="card">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Prénom</label>
              <input
                v-model="form.firstName"
                type="text"
                required
                class="input-field"
                placeholder="Jean"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Nom</label>
              <input
                v-model="form.lastName"
                type="text"
                required
                class="input-field"
                placeholder="Dupont"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="jean.dupont@email.com"
              autocomplete="email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Mot de passe</label>
            <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="input-field"
              placeholder="••••••••"
              autocomplete="new-password"
            />
            <p class="mt-1 text-xs text-gray-500">Minimum 6 caractères</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Confirmer le mot de passe</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              required
              class="input-field"
              placeholder="••••••••"
              autocomplete="new-password"
            />
          </div>

          <div v-if="error" class="p-4 bg-red-50 text-red-800 rounded-lg text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
          >
            {{ loading ? 'Création du compte...' : 'Créer mon compte' }}
          </button>
        </form>

        <div class="mt-6 text-center text-sm">
          <p class="text-gray-600">
            Déjà un compte ?
            <NuxtLink to="/auth/login" class="text-primary-600 hover:text-primary-700 font-medium">
              Connectez-vous
            </NuxtLink>
          </p>
        </div>
      </div>

      <div class="text-center mt-8">
        <NuxtLink to="/" class="text-sm text-gray-600 hover:text-gray-900">
          ← Retour à l'accueil
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
  title: 'Inscription - Smart Identity'
})

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  // Validate passwords match
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas'
    loading.value = false
    return
  }

  try {
    await authStore.register({
      email: form.value.email,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName
    })

    toast.success('Compte créé avec succès !')
    router.push('/dashboard')
  } catch (err) {
    error.value = err.error || 'Une erreur est survenue lors de l\'inscription'
  } finally {
    loading.value = false
  }
}
</script>
