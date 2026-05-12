<template>
  <div class="section-padding-sm bg-gradient-to-b from-gray-50 to-white">
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center mb-16 space-y-4">
        <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
          Boutique
        </span>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900">
          Nos Bracelets NFC
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Découvrez nos bracelets NFC Smart Identity, élégants et innovants
        </p>
      </div>

      <!-- Loading -->
      <div v-if="productsStore.loading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Chargement des produits...</p>
      </div>

      <!-- Error -->
      <div v-else-if="productsStore.error" class="text-center py-20">
        <div class="text-red-600 mb-4">{{ productsStore.error }}</div>
        <button @click="loadProducts" class="btn-primary">Réessayer</button>
      </div>

      <!-- Products Grid -->
      <div v-else>
        <div v-if="productsStore.products.length === 0" class="text-center py-20">
          <p class="text-xl text-gray-600">Aucun produit disponible pour le moment.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ShopProductCard
            v-for="product in productsStore.products"
            :key="product._id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>

        <!-- Pagination -->
        <div v-if="productsStore.pagination.pages > 1" class="mt-16 flex justify-center gap-2">
          <button
            v-for="page in productsStore.pagination.pages"
            :key="page"
            @click="changePage(page)"
            class="min-w-[44px] h-11 rounded-xl font-semibold transition-all"
            :class="page === productsStore.pagination.page
              ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg scale-110'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600 hover:shadow-md'"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Boutique - Smart Identity',
  meta: [
    { name: 'description', content: 'Achetez votre bracelet NFC Smart Identity. Plusieurs modèles disponibles.' }
  ]
})

const productsStore = useProductsStore()
const cartStore = useCartStore()
const toast = useToast()

onMounted(() => {
  loadProducts()
})

const loadProducts = async () => {
  try {
    await productsStore.fetchProducts({ inStock: 'true' })
  } catch (error) {
    console.error('Error loading products:', error)
  }
}

const changePage = async (page) => {
  try {
    await productsStore.fetchProducts({ page, inStock: 'true' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error('Error changing page:', error)
  }
}

const addToCart = (product) => {
  cartStore.addToCart(product)
  toast.success(`${product.name} ajouté au panier !`)
}
</script>
