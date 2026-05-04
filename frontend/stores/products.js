import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0
    }
  }),

  getters: {
    inStockProducts: (state) => state.products.filter(p => p.inStock)
  },

  actions: {
    async fetchProducts(filters = {}) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const params = new URLSearchParams(filters).toString()
        const response = await api.get(`/products?${params}`)

        this.products = response.data.data
        this.pagination = {
          page: response.data.page,
          limit: response.data.limit || 10,
          total: response.data.total,
          pages: response.data.pages
        }

        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to fetch products'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async fetchProduct(productId) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.get(`/products/${productId}`)
        this.currentProduct = response.data.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Product not found'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async createProduct(productData) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/products', productData)
        this.products.unshift(response.data.data)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to create product'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async updateProduct(productId, productData) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.put(`/products/${productId}`, productData)
        const index = this.products.findIndex(p => p._id === productId)
        if (index !== -1) {
          this.products[index] = response.data.data
        }
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to update product'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(productId) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        await api.delete(`/products/${productId}`)
        this.products = this.products.filter(p => p._id !== productId)
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to delete product'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    }
  }
})
