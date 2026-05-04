<template>
  <div class="section-padding-sm bg-gradient-to-b from-gray-50 to-white">
    <div class="container-custom">
      <!-- Header -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <NuxtLink to="/shop" class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </NuxtLink>
          <h1 class="text-4xl font-bold text-gray-900">Mon Panier</h1>
        </div>
        <p class="text-lg text-gray-600">{{ cartStore.itemCount }} article{{ cartStore.itemCount > 1 ? 's' : '' }} dans votre panier</p>
      </div>

      <!-- Empty Cart -->
      <div v-if="cartStore.items.length === 0" class="text-center py-20">
        <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Votre panier est vide</h2>
        <p class="text-gray-600 mb-8">Découvrez nos bracelets NFC et commencez votre shopping !</p>
        <NuxtLink to="/shop" class="btn-primary inline-block">
          🛍️ Découvrir nos produits
        </NuxtLink>
      </div>

      <!-- Cart Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Items List -->
        <div class="lg:col-span-2">
          <div class="space-y-4">
            <div v-for="(item, index) in cartStore.items" :key="index" class="card-hover flex gap-6">
              <!-- Product Image -->
              <div class="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex-shrink-0 overflow-hidden">
                <img
                  v-if="item.product.images?.[0]"
                  :src="item.product.images[0]"
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Product Info -->
              <div class="flex-grow">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ item.product.name }}</h3>
                <div v-if="item.variant" class="flex gap-2 mb-2">
                  <span v-if="item.variant.color" class="badge-primary text-xs">{{ item.variant.color }}</span>
                  <span v-if="item.variant.size" class="badge-primary text-xs">{{ item.variant.size }}</span>
                </div>
                <p class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
                  {{ item.price.toFixed(2) }} €
                </p>

                <!-- Quantity Controls -->
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-gray-600">Quantité:</span>
                  <button
                    @click="cartStore.updateQuantity(index, item.quantity - 1)"
                    class="w-9 h-9 rounded-xl border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 flex items-center justify-center transition-all"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="font-bold text-lg w-10 text-center">{{ item.quantity }}</span>
                  <button
                    @click="cartStore.updateQuantity(index, item.quantity + 1)"
                    class="w-9 h-9 rounded-xl border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 flex items-center justify-center transition-all"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Remove Button -->
              <button
                @click="removeItem(index, item.product.name)"
                class="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl self-start transition-all"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="card sticky top-24 border-2 border-primary-100">
            <h2 class="text-2xl font-bold mb-6 text-gray-900">Récapitulatif</h2>

            <!-- Summary Items -->
            <div class="space-y-4 mb-6 pb-6 border-b-2 border-gray-100">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Sous-total</span>
                <span class="font-bold text-lg">{{ cartStore.totalPrice.toFixed(2) }} €</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Articles</span>
                <span class="badge-primary">{{ cartStore.itemCount }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Livraison</span>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-semibold text-green-600">Gratuite</span>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="flex justify-between items-center mb-8 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl">
              <span class="text-lg font-bold text-gray-900">Total</span>
              <span class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                {{ cartStore.totalPrice.toFixed(2) }} €
              </span>
            </div>

            <!-- Checkout Button -->
            <div class="flex flex-col gap-3">
              <NuxtLink to="/shop/checkout" class="btn-primary block w-full text-center shadow-lg">
                🛒 Passer la commande
              </NuxtLink>
              <NuxtLink to="/shop" class="btn-secondary block w-full text-center">
                ← Continuer mes achats
              </NuxtLink>
            </div>

            <!-- Trust badges -->
            <div class="mt-6 pt-6 border-t-2 border-gray-100 space-y-3">
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Paiement 100% sécurisé</span>
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Livraison gratuite sous 48h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Panier - Smart Identity',
  meta: [
    { name: 'description', content: 'Votre panier Smart Identity' }
  ]
})

const cartStore = useCartStore()
const toast = useToast()

const removeItem = (index, productName) => {
  cartStore.removeFromCart(index)
  toast.info(`${productName} retiré du panier`)
}
</script>
