<template>
  <div class="section-padding bg-gradient-to-b from-white to-gray-50">
    <div class="container-custom">
      <div class="text-center mb-20 space-y-4">
        <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
          Fonctionnalités
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Tout ce dont vous avez besoin
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Découvrez toutes les fonctionnalités qui font de Smart Identity la solution de networking la plus complète.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <div class="card-hover">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">Profil Personnalisé</h3>
          <p class="text-gray-600 leading-relaxed">Créez un profil qui vous ressemble avec photo, bio, titre professionnel et couleurs personnalisées.</p>
        </div>

        <div class="card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">Liens Multiples</h3>
          <p class="text-gray-600 leading-relaxed">Ajoutez tous vos liens professionnels : LinkedIn, GitHub, Twitter, site web, email, téléphone.</p>
        </div>

        <div class="card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">Technologie NFC</h3>
          <p class="text-gray-600 leading-relaxed">Bracelet équipé d'une puce NFC pour un partage instantané avec n'importe quel smartphone.</p>
        </div>

        <div class="card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">Statistiques Détaillées</h3>
          <p class="text-gray-600 leading-relaxed">Suivez le nombre de vues de votre profil et de scans NFC en temps réel.</p>
        </div>

        <div class="card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">Sécurisé</h3>
          <p class="text-gray-600 leading-relaxed">Vos données sont protégées. Contrôlez la visibilité de votre profil public/privé.</p>
        </div>

        <div class="card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-3 text-gray-900">Mise à Jour Instantanée</h3>
          <p class="text-gray-600 leading-relaxed">Modifiez votre profil à tout moment. Les changements sont immédiatement visibles.</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="relative overflow-hidden gradient-primary text-white rounded-3xl p-12 md:p-16 shadow-2xl">
        <!-- Decorative elements -->
        <div class="absolute inset-0">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 text-center space-y-6">
          <h2 class="text-3xl md:text-4xl font-bold">Convaincu ?</h2>
          <p class="text-xl text-primary-50 max-w-2xl mx-auto leading-relaxed">
            Créez votre compte gratuit et commandez votre premier bracelet dès aujourd'hui.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <NuxtLink to="/auth/register" class="btn-primary bg-white text-primary-600 hover:bg-primary-50 shadow-xl">
              Créer mon compte
            </NuxtLink>
            <NuxtLink to="/shop" class="btn-secondary-inverted">
              Voir les bracelets
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Fonctionnalités - Smart Identity',
  meta: [
    { name: 'description', content: 'Découvrez toutes les fonctionnalités de Smart Identity : profil personnalisé, NFC, statistiques, et plus encore.' }
  ]
})
</script>
