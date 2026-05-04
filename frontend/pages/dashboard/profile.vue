<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">{{ hasProfile ? 'Modifier' : 'Créer' }} mon profil</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form -->
      <div class="lg:col-span-2">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="card">
            <h2 class="text-xl font-bold mb-6">Informations générales</h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">URL publique *</label>
                <div class="flex items-center">
                  <span class="text-gray-500 mr-2">/profile/</span>
                  <input v-model="form.publicUrl" type="text" required pattern="[a-z0-9-]+" class="input-field flex-grow" placeholder="mon-nom" />
                </div>
                <p class="text-xs text-gray-500 mt-1">Uniquement lettres minuscules, chiffres et tirets</p>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Titre professionnel</label>
                <input v-model="form.title" type="text" class="input-field" placeholder="Développeur Full Stack" />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Bio</label>
                <textarea v-model="form.bio" rows="4" class="input-field" placeholder="Parlez de vous en quelques mots..." maxlength="500"></textarea>
                <p class="text-xs text-gray-500 mt-1">{{ form.bio?.length || 0 }} / 500</p>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Avatar (URL)</label>
                <input v-model="form.avatar" type="url" class="input-field" placeholder="https://..." />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Couleur du thème</label>
                <input v-model="form.theme" type="color" class="h-12 w-24 border border-gray-300 rounded cursor-pointer" />
              </div>

              <div class="flex items-center gap-3">
                <input v-model="form.isPublic" type="checkbox" id="isPublic" class="w-4 h-4" />
                <label for="isPublic" class="text-sm font-medium cursor-pointer">Profil public (visible par tous)</label>
              </div>
            </div>
          </div>

          <!-- Links Section -->
          <div class="card">
            <h2 class="text-xl font-bold mb-6">Liens sociaux</h2>

            <div class="space-y-4">
              <div v-for="(link, index) in form.links" :key="index" class="flex gap-3 items-start">
                <select v-model="link.type" class="input-field flex-shrink-0" style="width: 150px">
                  <option value="linkedin">LinkedIn</option>
                  <option value="github">GitHub</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="website">Site web</option>
                  <option value="email">Email</option>
                  <option value="phone">Téléphone</option>
                  <option value="other">Autre</option>
                </select>
                <input v-model="link.label" type="text" placeholder="Libellé" class="input-field flex-shrink-0" style="width: 150px" />
                <input v-model="link.url" type="text" placeholder="URL ou valeur" class="input-field flex-grow" />
                <button type="button" @click="removeLink(index)" class="btn-secondary px-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <button type="button" @click="addLink" class="btn-secondary w-full">
                + Ajouter un lien
              </button>
            </div>
          </div>

          <AppAlert :message="error" type="error" />

          <button type="submit" :disabled="loading" class="btn-primary w-full">
            {{ loading ? 'Enregistrement...' : (hasProfile ? 'Mettre à jour' : 'Créer mon profil') }}
          </button>
        </form>
      </div>

      <!-- Preview -->
      <div class="lg:col-span-1">
        <div class="card sticky top-24">
          <h3 class="font-bold mb-4">Aperçu</h3>
          <ProfileCard :profile="{
            avatar: form.avatar,
            title: form.title,
            bio: form.bio,
            theme: form.theme,
            links: form.links,
            user: authStore.user,
            stats: { views: 0, scans: 0 }
          }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProfileStore } from '~/stores/profile'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

useHead({
  title: 'Mon Profil - Smart Identity'
})

const profileStore = useProfileStore()
const authStore = useAuthStore()
const toast = useToast()

const hasProfile = computed(() => !!profileStore.myProfile)
const loading = ref(false)
const error = ref('')

const form = ref({
  publicUrl: '',
  title: '',
  bio: '',
  avatar: '',
  theme: '#3b82f6',
  links: [],
  isPublic: true
})

onMounted(async () => {
  try {
    await profileStore.fetchMyProfile()
    if (profileStore.myProfile) {
      form.value = {
        publicUrl: profileStore.myProfile.publicUrl,
        title: profileStore.myProfile.title || '',
        bio: profileStore.myProfile.bio || '',
        avatar: profileStore.myProfile.avatar || '',
        theme: profileStore.myProfile.theme || '#3b82f6',
        links: profileStore.myProfile.links || [],
        isPublic: profileStore.myProfile.isPublic !== false
      }
    }
  } catch (err) {
    // No profile yet
  }
})

const addLink = () => {
  form.value.links.push({
    type: 'website',
    label: '',
    url: '',
    order: form.value.links.length
  })
}

const removeLink = (index) => {
  form.value.links.splice(index, 1)
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (hasProfile.value) {
      await profileStore.updateProfile(profileStore.myProfile._id, form.value)
      toast.success('Profil mis à jour !')
    } else {
      await profileStore.createProfile(form.value)
      toast.success('Profil créé avec succès !')
    }
  } catch (err) {
    error.value = err.error || 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>
