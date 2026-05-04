<template>
  <div class="section-padding bg-gradient-to-b from-white to-gray-50">
    <div class="container-custom">
      <!-- Hero -->
      <div class="text-center mb-20 space-y-6">
        <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
          À Propos
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Notre Mission
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Smart Identity est né d'une vision : <span class="text-primary-600 font-semibold">simplifier le networking professionnel</span> à l'ère digitale.
        </p>
      </div>

      <!-- Story -->
      <div class="max-w-4xl mx-auto mb-20">
        <div class="card-hover border-2 border-primary-100">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">Notre Histoire</h2>
          </div>
          <div class="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p class="text-xl">
              En 2024, nous avons constaté que malgré la transformation digitale, l'échange d'informations professionnelles restait archaïque :
              cartes de visite perdues, saisie manuelle de contacts, profils LinkedIn difficiles à partager...
            </p>
            <div class="p-6 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl border-2 border-primary-100">
              <p class="text-primary-900 font-semibold">
                💡 C'est ainsi qu'est née Smart Identity : une solution élégante combinant un bracelet NFC stylé et une plateforme web intuitive.
                En un simple tap, partagez l'intégralité de votre identité professionnelle.
              </p>
            </div>
            <p>
              Aujourd'hui, <span class="font-bold text-gray-900">des milliers de professionnels</span>, freelances et entrepreneurs utilisent Smart Identity pour développer leur réseau
              lors d'événements, conférences et rencontres business.
            </p>
          </div>
        </div>
      </div>

      <!-- Mission & Values -->
      <div>
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Nos Valeurs</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div class="card-hover text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">Innovation</h3>
            <p class="text-gray-600 leading-relaxed">
              Nous repoussons les limites du networking avec des technologies de pointe.
            </p>
          </div>

          <div class="card-hover text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">Simplicité</h3>
            <p class="text-gray-600 leading-relaxed">
              Une solution simple et intuitive accessible à tous.
            </p>
          </div>

          <div class="card-hover text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">Communauté</h3>
            <p class="text-gray-600 leading-relaxed">
              Nous construisons une communauté de professionnels connectés.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="relative overflow-hidden gradient-primary text-white rounded-3xl p-12 md:p-16 shadow-2xl">
        <!-- Decorative elements -->
        <div class="absolute inset-0">
          <div class="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 text-center space-y-8">
          <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Rejoignez 5000+ professionnels
          </div>

          <h2 class="text-4xl md:text-5xl font-bold">Rejoignez l'aventure</h2>
          <p class="text-xl md:text-2xl text-primary-50 max-w-2xl mx-auto leading-relaxed">
            Faites partie de la révolution du networking professionnel.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <NuxtLink to="/auth/register" class="btn-primary bg-white text-primary-600 hover:bg-primary-50 shadow-2xl text-lg px-8 py-4">
              🚀 Commencer maintenant
            </NuxtLink>
            <NuxtLink to="/shop" class="btn-secondary-inverted text-lg px-8 py-4">
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
  title: 'À Propos - Smart Identity',
  meta: [
    { name: 'description', content: 'Découvrez l\'histoire et la mission de Smart Identity, la solution de networking NFC pour professionnels.' }
  ]
})
</script>
