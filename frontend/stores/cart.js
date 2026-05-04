import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0
  }),

  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  actions: {
    addToCart(product, variant = null, quantity = 1) {
      const existingItem = this.items.find(item =>
        item.product._id === product._id &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          product,
          variant,
          quantity,
          price: product.price
        })
      }

      this.saveCart()
    },

    removeFromCart(index) {
      this.items.splice(index, 1)
      this.saveCart()
    },

    updateQuantity(index, quantity) {
      if (quantity <= 0) {
        this.removeFromCart(index)
      } else {
        this.items[index].quantity = quantity
        this.saveCart()
      }
    },

    clearCart() {
      this.items = []
      this.total = 0
      this.saveCart()
    },

    saveCart() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    loadCart() {
      if (process.client) {
        const cart = localStorage.getItem('cart')
        if (cart) {
          this.items = JSON.parse(cart)
        }
      }
    }
  }
})
