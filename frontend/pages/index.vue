<template>
  <div>
    <!-- Hero Section -->
    <section class="relative gradient-primary text-white section-padding overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Nouvelle technologie NFC disponible
            </div>

            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Partagez votre profil en un
              <span class="text-primary-200">tap</span>
            </h1>

            <p class="text-xl md:text-2xl text-primary-50 leading-relaxed max-w-xl">
              Smart Identity révolutionne le networking avec un bracelet NFC connecté à votre profil digital personnalisable.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <NuxtLink to="/auth/register" class="btn-primary bg-white text-primary-600 hover:bg-primary-50 text-center shadow-xl">
                Commencer gratuitement
              </NuxtLink>
              <NuxtLink to="/shop" class="btn-secondary-inverted text-center">
                Découvrir les bracelets
              </NuxtLink>
            </div>

            <!-- Trust indicators -->
            <div class="flex flex-wrap items-center gap-8 pt-8 border-t border-white/20">
              <div class="text-center">
                <p class="text-3xl font-bold">5000+</p>
                <p class="text-sm text-primary-100">Utilisateurs actifs</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold">50k+</p>
                <p class="text-sm text-primary-100">Profils partagés</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold">4.9/5</p>
                <p class="text-sm text-primary-100">Satisfaction client</p>
              </div>
            </div>
          </div>

          <div class="hidden lg:block">
            <div class="relative">
              <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20 shadow-2xl">
                <svg class="w-72 h-72 mx-auto drop-shadow-xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p class="text-xl font-semibold mt-6">Scannez et partagez instantanément</p>
                <p class="text-primary-100 mt-2">Compatible avec tous les smartphones</p>
              </div>

              <!-- Floating cards -->
              <div class="absolute -top-6 -left-6 bg-white text-gray-900 px-4 py-3 rounded-xl shadow-lg animate-bounce">
                <p class="text-sm font-semibold">✨ Sans contact</p>
              </div>
              <div class="absolute -bottom-6 -right-6 bg-white text-gray-900 px-4 py-3 rounded-xl shadow-lg animate-pulse">
                <p class="text-sm font-semibold">🚀 Instantané</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-16 space-y-4">
          <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
            Fonctionnalités
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
            Pourquoi choisir Smart Identity ?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Une solution complète pour professionnels modernes
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="card-hover text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">Instantané</h3>
            <p class="text-gray-600 leading-relaxed">
              Partagez votre profil en un simple tap. Plus besoin de cartes de visite ou de saisie manuelle.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="card-hover text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">Personnalisable</h3>
            <p class="text-gray-600 leading-relaxed">
              Créez un profil unique avec vos liens, bio, et thème personnalisé qui vous ressemble.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="card-hover text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">Analytique</h3>
            <p class="text-gray-600 leading-relaxed">
              Suivez vos interactions avec des statistiques de vues et de scans en temps réel.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div class="container-custom">
        <div class="text-center mb-20 space-y-4">
          <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
            Processus
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
            Comment ça marche ?
          </h2>
          <p class="text-xl text-gray-600">
            Simple comme 1, 2, 3
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          <!-- Connecting line (hidden on mobile) -->
          <div class="hidden md:block absolute top-10 left-1/4 right-1/4 h-1 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200"></div>

          <!-- Step 1 -->
          <div class="relative text-center space-y-4">
            <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-3xl flex items-center justify-center mx-auto text-3xl font-bold shadow-xl relative z-10">
              1
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Créez votre profil</h3>
            <p class="text-gray-600 leading-relaxed max-w-sm mx-auto">
              Inscrivez-vous et personnalisez votre profil avec vos informations et liens professionnels.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="relative text-center space-y-4">
            <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-3xl flex items-center justify-center mx-auto text-3xl font-bold shadow-xl relative z-10">
              2
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Activez votre bracelet</h3>
            <p class="text-gray-600 leading-relaxed max-w-sm mx-auto">
              Commandez un bracelet NFC et activez-le avec votre code unique.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="relative text-center space-y-4">
            <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-3xl flex items-center justify-center mx-auto text-3xl font-bold shadow-xl relative z-10">
              3
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Partagez en un tap</h3>
            <p class="text-gray-600 leading-relaxed max-w-sm mx-auto">
              Approchez votre bracelet d'un smartphone pour partager instantanément votre profil.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding relative gradient-primary text-white overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div class="container-custom text-center relative z-10 space-y-8">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Prêt à révolutionner<br />votre networking ?
        </h2>
        <p class="text-xl md:text-2xl text-primary-50 max-w-3xl mx-auto leading-relaxed">
          Rejoignez des milliers de professionnels qui font confiance à Smart Identity pour développer leur réseau.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <NuxtLink to="/auth/register" class="btn-primary bg-white text-primary-600 hover:bg-primary-50 shadow-2xl text-lg px-8 py-4">
            Créer mon compte gratuit
          </NuxtLink>
          <NuxtLink to="/features" class="btn-secondary-inverted text-lg px-8 py-4">
            En savoir plus
          </NuxtLink>
        </div>

        <!-- Social proof -->
        <div class="pt-12 flex flex-wrap justify-center items-center gap-8 text-primary-100">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>4.9/5 étoiles</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Installation gratuite</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Paiement sécurisé</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Smart Identity - Bracelet NFC pour Networking Professionnel',
  meta: [
    {
      name: 'description',
      content: 'Partagez votre profil professionnel en un tap avec Smart Identity. Bracelet NFC connecté, profil personnalisable, et statistiques en temps réel.'
    }
  ]
})
</script>
