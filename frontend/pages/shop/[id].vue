<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <!-- Back Button -->
      <NuxtLink to="/shop" class="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Retour à la boutique
      </NuxtLink>

      <!-- Loading -->
      <div v-if="productsStore.loading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>

      <!-- Product Detail -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Images -->
        <div>
          <div class="bg-gray-100 rounded-2xl overflow-hidden mb-4">
            <img
              :src="selectedImage"
              :alt="product.name"
              class="w-full h-96 object-cover"
            />
          </div>
          <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-4">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImage = image"
              class="bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition"
              :class="selectedImage === image ? 'border-primary-600' : 'border-transparent hover:border-gray-300'"
            >
              <img :src="image" :alt="`${product.name} ${index + 1}`" class="w-full h-24 object-cover" />
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>

          <!-- Price -->
          <div class="text-3xl font-bold text-primary-600 mb-6">
            {{ product.price.toFixed(2) }} €
          </div>

          <!-- Description -->
          <div class="prose prose-lg mb-8">
            <p class="text-gray-600">{{ product.description }}</p>
          </div>

          <!-- Variants -->
          <div v-if="product.variants && product.variants.length > 0" class="mb-8">
            <h3 class="font-semibold mb-4">Options disponibles</h3>

            <!-- Color Selection -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Couleur</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in availableColors"
                  :key="color"
                  @click="selectedVariant.color = color"
                  class="px-4 py-2 rounded-lg border-2 transition"
                  :class="selectedVariant.color === color
                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                    : 'border-gray-300 hover:border-gray-400'"
                >
                  {{ color }}
                </button>
              </div>
            </div>

            <!-- Size Selection -->
            <div v-if="availableSizes.length > 0" class="mb-4">
              <label class="block text-sm font-medium mb-2">Taille</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="size in availableSizes"
                  :key="size"
                  @click="selectedVariant.size = size"
                  class="px-4 py-2 rounded-lg border-2 transition"
                  :class="selectedVariant.size === size
                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                    : 'border-gray-300 hover:border-gray-400'"
                >
                  {{ size }}
                </button>
              </div>
            </div>
          </div>

          <!-- Quantity -->
          <div class="mb-8">
            <label class="block text-sm font-medium mb-2">Quantité</label>
            <div class="flex items-center gap-4">
              <button
                @click="quantity = Math.max(1, quantity - 1)"
                class="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <span class="text-xl font-semibold w-12 text-center">{{ quantity }}</span>
              <button
                @click="quantity++"
                class="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <button
            @click="handleAddToCart"
            :disabled="!product.inStock"
            class="btn-primary w-full text-lg py-4 mb-4"
            :class="{ 'opacity-50 cursor-not-allowed': !product.inStock }"
          >
            {{ product.inStock ? 'Ajouter au panier' : 'Produit indisponible' }}
          </button>

          <!-- Stock Status -->
          <div class="flex items-center gap-2 text-sm" :class="product.inStock ? 'text-green-600' : 'text-red-600'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ product.inStock ? 'En stock' : 'Rupture de stock' }}
          </div>
        </div>
      </div>

      <!-- Product Not Found -->
      <div v-else class="text-center py-20">
        <p class="text-xl text-gray-600 mb-4">Produit non trouvé</p>
        <NuxtLink to="/shop" class="btn-primary">Retour à la boutique</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const toast = useToast()

const product = computed(() => productsStore.currentProduct)
const selectedImage = ref('')
const quantity = ref(1)
const selectedVariant = ref({
  color: null,
  size: null
})

const availableColors = computed(() => {
  if (!product.value?.variants) return []
  return [...new Set(product.value.variants.map(v => v.color).filter(Boolean))]
})

const availableSizes = computed(() => {
  if (!product.value?.variants) return []
  return [...new Set(product.value.variants.map(v => v.size).filter(Boolean))]
})

onMounted(async () => {
  try {
    await productsStore.fetchProduct(route.params.id)
    if (product.value?.images?.[0]) {
      selectedImage.value = product.value.images[0]
    }
    // Set default variant selections
    if (availableColors.value.length > 0) {
      selectedVariant.value.color = availableColors.value[0]
    }
    if (availableSizes.value.length > 0) {
      selectedVariant.value.size = availableSizes.value[0]
    }
  } catch (error) {
    console.error('Error loading product:', error)
  }
})

const handleAddToCart = () => {
  if (!product.value) return

  const variant = product.value.variants?.length > 0 ? selectedVariant.value : null
  cartStore.addToCart(product.value, variant, quantity.value)
  toast.success(`${quantity.value} × ${product.value.name} ajouté au panier !`)
  quantity.value = 1
}

useHead({
  title: computed(() => product.value ? `${product.value.name} - Smart Identity` : 'Produit - Smart Identity')
})
</script>
