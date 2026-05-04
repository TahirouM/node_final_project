<template>
  <div class="section-padding bg-gradient-to-b from-white to-gray-50">
    <div class="container-custom">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
            Contact
          </span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Contactez-nous
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Une question ? Notre équipe est là pour vous aider.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="card-hover border-2 border-gray-100">
            <h2 class="text-2xl font-bold mb-6 text-gray-900">Envoyez-nous un message</h2>
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                <input v-model="form.name" type="text" required class="input-field" placeholder="Jean Dupont">
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Adresse email</label>
                <input v-model="form.email" type="email" required class="input-field" placeholder="jean.dupont@email.com">
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
                <input v-model="form.subject" type="text" required class="input-field" placeholder="Comment puis-je vous aider ?">
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea v-model="form.message" required rows="6" class="input-field resize-none" placeholder="Décrivez votre demande..."></textarea>
              </div>

              <button type="submit" :disabled="loading" class="btn-primary w-full text-lg py-4 shadow-lg">
                <span v-if="loading" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Envoyer le message
                </span>
              </button>
            </form>

            <div v-if="success" class="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="font-bold text-green-900 mb-1">Message envoyé avec succès !</p>
                  <p class="text-green-800">Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-6">
            <div class="card-hover border-2 border-gray-100">
              <h3 class="text-2xl font-bold mb-6 text-gray-900">Coordonnées</h3>
              <div class="space-y-5">
                <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow">
                  <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 mb-1">Email</p>
                    <a href="mailto:contact@smartidentity.com" class="text-primary-600 hover:text-primary-700 font-medium">
                      contact@smartidentity.com
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-shadow">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 mb-1">Téléphone</p>
                    <a href="tel:+33123456789" class="text-primary-600 hover:text-primary-700 font-medium">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 mb-1">Adresse</p>
                    <p class="text-gray-600 leading-relaxed">
                      123 Avenue des Champs-Élysées<br>
                      75008 Paris, France
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 border-2 border-primary-200">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900">Horaires d'ouverture</h3>
              </div>
              <div class="space-y-3">
                <div class="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                  <span class="font-bold text-gray-900">Lundi - Vendredi</span>
                  <span class="text-primary-600 font-semibold">9h00 - 18h00</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                  <span class="font-bold text-gray-900">Samedi</span>
                  <span class="text-primary-600 font-semibold">10h00 - 16h00</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                  <span class="font-bold text-gray-900">Dimanche</span>
                  <span class="text-red-600 font-semibold">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Contact - Smart Identity',
  meta: [
    { name: 'description', content: 'Contactez l\'équipe Smart Identity pour toute question sur nos bracelets NFC et notre plateforme.' }
  ]
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  success.value = false

  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500))

  success.value = true
  loading.value = false

  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}
</script>
