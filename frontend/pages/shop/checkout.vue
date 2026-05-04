<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold mb-8">Finaliser la commande</h1>

      <!-- Empty Cart -->
      <div v-if="cartStore.items.length === 0" class="text-center py-20">
        <p class="text-xl text-gray-600 mb-6">Votre panier est vide</p>
        <NuxtLink to="/shop" class="btn-primary">Retour à la boutique</NuxtLink>
      </div>

      <!-- Checkout Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Shipping Address -->
            <div class="card">
              <h2 class="text-2xl font-bold mb-6">Adresse de livraison</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium mb-2">Rue</label>
                  <input
                    v-model="form.shippingAddress.street"
                    type="text"
                    required
                    class="input-field"
                    placeholder="123 Rue de la Paix"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Ville</label>
                  <input
                    v-model="form.shippingAddress.city"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Paris"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Code postal</label>
                  <input
                    v-model="form.shippingAddress.postalCode"
                    type="text"
                    required
                    class="input-field"
                    placeholder="75001"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium mb-2">Pays</label>
                  <input
                    v-model="form.shippingAddress.country"
                    type="text"
                    required
                    class="input-field"
                    placeholder="France"
                  />
                </div>
              </div>
            </div>

            <!-- Payment Note -->
            <div class="card bg-blue-50 border-blue-200">
              <div class="flex gap-3">
                <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 class="font-semibold text-blue-900 mb-1">Mode démonstration</h3>
                  <p class="text-sm text-blue-800">
                    Le paiement est simulé dans cette version de démonstration. Aucun montant ne sera débité.
                  </p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary w-full text-lg py-4"
              :class="{ 'opacity-50 cursor-not-allowed': loading }"
            >
              {{ loading ? 'Traitement en cours...' : 'Confirmer la commande' }}
            </button>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="card sticky top-24">
            <h2 class="text-2xl font-bold mb-6">Récapitulatif</h2>

            <!-- Items -->
            <div class="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div v-for="(item, index) in cartStore.items" :key="index" class="flex justify-between text-sm">
                <span class="text-gray-600">
                  {{ item.product.name }} × {{ item.quantity }}
                </span>
                <span class="font-semibold">{{ (item.price * item.quantity).toFixed(2) }} €</span>
              </div>
            </div>

            <!-- Totals -->
            <div class="space-y-2 mb-6 pb-6 border-b border-gray-200">
              <div class="flex justify-between">
                <span class="text-gray-600">Sous-total</span>
                <span class="font-semibold">{{ cartStore.totalPrice.toFixed(2) }} €</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Livraison</span>
                <span class="font-semibold text-green-600">Gratuite</span>
              </div>
            </div>

            <!-- Grand Total -->
            <div class="flex justify-between text-xl mb-4">
              <span class="font-bold">Total</span>
              <span class="font-bold text-primary-600">{{ cartStore.totalPrice.toFixed(2) }} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useOrdersStore } from '~/stores/orders'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

useHead({
  title: 'Checkout - Smart Identity'
})

const cartStore = useCartStore()
const ordersStore = useOrdersStore()
const toast = useToast()
const router = useRouter()

const loading = ref(false)
const form = ref({
  shippingAddress: {
    street: '',
    city: '',
    postalCode: '',
    country: 'France'
  }
})

const handleSubmit = async () => {
  loading.value = true

  try {
    // Prepare order data
    const orderData = {
      items: cartStore.items.map(item => ({
        product: item.product._id,
        variant: item.variant,
        quantity: item.quantity
      })),
      shippingAddress: form.value.shippingAddress
    }

    // Create order
    await ordersStore.createOrder(orderData)

    // Clear cart
    cartStore.clearCart()

    // Show success message
    toast.success('Commande confirmée avec succès !')

    // Redirect to orders page
    router.push('/shop/orders')
  } catch (error) {
    toast.error(error.error || 'Erreur lors de la création de la commande')
  } finally {
    loading.value = false
  }
}
</script>
