<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold mb-8">Mes Commandes</h1>

      <!-- Loading -->
      <div v-if="ordersStore.loading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="ordersStore.orders.length === 0" class="text-center py-20">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-xl text-gray-600 mb-6">Aucune commande pour le moment</p>
        <NuxtLink to="/shop" class="btn-primary">
          Découvrir nos produits
        </NuxtLink>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div v-for="order in ordersStore.orders" :key="order._id" class="card">
          <!-- Order Header -->
          <div class="flex flex-wrap items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <p class="text-sm text-gray-600 mb-1">
                Commande passée le {{ formatDate(order.createdAt) }}
              </p>
              <p class="font-mono text-sm text-gray-500">
                #{{ order._id.slice(-8).toUpperCase() }}
              </p>
            </div>

            <!-- Status Badge -->
            <span
              class="px-4 py-2 rounded-full text-sm font-medium"
              :class="getStatusClass(order.status)"
            >
              {{ getStatusLabel(order.status) }}
            </span>
          </div>

          <!-- Order Items -->
          <div class="space-y-4 mb-6">
            <div v-for="item in order.items" :key="item._id" class="flex gap-4">
              <div class="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                <img
                  v-if="item.product?.images?.[0]"
                  :src="item.product.images[0]"
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="flex-grow">
                <h3 class="font-semibold">{{ item.product?.name || 'Produit' }}</h3>
                <div v-if="item.variant" class="text-sm text-gray-600">
                  <span v-if="item.variant.color">{{ item.variant.color }}</span>
                  <span v-if="item.variant.size"> - {{ item.variant.size }}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">
                  Quantité : {{ item.quantity }} × {{ item.price.toFixed(2) }} €
                </p>
              </div>

              <div class="text-right">
                <p class="font-semibold text-primary-600">
                  {{ (item.price * item.quantity).toFixed(2) }} €
                </p>
              </div>
            </div>
          </div>

          <!-- Order Footer -->
          <div class="flex flex-wrap items-center justify-between pt-6 border-t border-gray-200">
            <div>
              <p class="text-sm text-gray-600 mb-1">Adresse de livraison :</p>
              <p class="text-sm">
                {{ order.shippingAddress.street }}, {{ order.shippingAddress.postalCode }} {{ order.shippingAddress.city }}
              </p>
            </div>

            <div class="text-right">
              <p class="text-sm text-gray-600 mb-1">Total</p>
              <p class="text-2xl font-bold text-primary-600">
                {{ order.totalPrice.toFixed(2) }} €
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrdersStore } from '~/stores/orders'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

useHead({
  title: 'Mes Commandes - Smart Identity'
})

const ordersStore = useOrdersStore()

onMounted(() => {
  ordersStore.fetchMyOrders()
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusLabel = (status) => {
  const labels = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    shipped: 'Expédiée',
    delivered: 'Livrée',
    cancelled: 'Annulée'
  }
  return labels[status] || status
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
