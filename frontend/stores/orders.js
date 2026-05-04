import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  }),

  getters: {
    orderCount: (state) => state.orders.length,
    pendingOrders: (state) => state.orders.filter(o => o.status === 'pending'),
    completedOrders: (state) => state.orders.filter(o => o.status === 'delivered')
  },

  actions: {
    async createOrder(orderData) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/orders', orderData)
        this.currentOrder = response.data.data
        this.orders.unshift(response.data.data)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to create order'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async fetchMyOrders() {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/orders/my-orders')
        this.orders = response.data.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to fetch orders'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async fetchOrder(orderId) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.get(`/orders/${orderId}`)
        this.currentOrder = response.data.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Order not found'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(orderId, status) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.put(`/orders/${orderId}/status`, { status })
        const index = this.orders.findIndex(o => o._id === orderId)
        if (index !== -1) {
          this.orders[index] = response.data.data
        }
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to update order'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    clearCurrentOrder() {
      this.currentOrder = null
    }
  }
})
