<template>
  <div class="group">
    <NuxtLink :to="`/shop/${product._id}`" class="block">
      <div class="card-hover overflow-hidden">
        <!-- Image -->
        <div class="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-100 to-gray-50 h-72 -m-6 mb-6">
          <img
            v-if="product.images && product.images.length > 0"
            :src="product.images[0]"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <div v-if="!product.inStock" class="absolute top-4 right-4 badge-danger shadow-lg">
            Rupture de stock
          </div>
          <div v-else-if="product.category === 'bundle'" class="absolute top-4 right-4 badge-success shadow-lg">
            Pack
          </div>
          <div v-else class="absolute top-4 right-4 badge-primary shadow-lg">
            Nouveau
          </div>
        </div>

        <!-- Info -->
        <div class="space-y-4">
          <div>
            <h3 class="text-2xl font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
              {{ product.name }}
            </h3>
            <p class="text-gray-600 leading-relaxed line-clamp-2">{{ product.description }}</p>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <span class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              {{ product.price.toFixed(2) }} €
            </span>
            <button
              @click.prevent="$emit('add-to-cart', product)"
              :disabled="!product.inStock"
              class="btn-primary"
              :class="{ 'opacity-50 cursor-not-allowed hover:translate-y-0': !product.inStock }"
            >
              {{ product.inStock ? '+ Ajouter' : 'Indisponible' }}
            </button>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true }
})
defineEmits(['add-to-cart'])
</script>
