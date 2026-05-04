import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async register(userData) {
      const api = useApi()
      try {
        const response = await api.post('/auth/register', userData)
        this.setAuth(response.data.data)
        return response.data
      } catch (error) {
        throw error.response?.data || error
      }
    },

    async login(credentials) {
      const api = useApi()
      try {
        const response = await api.post('/auth/login', credentials)
        this.setAuth(response.data.data)
        return response.data
      } catch (error) {
        throw error.response?.data || error
      }
    },

    async fetchMe() {
      const api = useApi()
      try {
        const response = await api.get('/auth/me')
        this.user = response.data.data
        this.isAuthenticated = true
        return response.data
      } catch (error) {
        this.logout()
        throw error.response?.data || error
      }
    },

    async updateMe(userData) {
      const api = useApi()
      try {
        const response = await api.put('/auth/me', userData)
        this.user = response.data.data
        return response.data
      } catch (error) {
        throw error.response?.data || error
      }
    },

    setAuth(data) {
      this.user = data.user
      this.token = data.token
      this.isAuthenticated = true

      // Save to localStorage
      if (process.client) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      // Clear localStorage
      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }

      // Redirect to home
      navigateTo('/')
    },

    initAuth() {
      // Load from localStorage on app init
      if (process.client) {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if (token && user) {
          this.token = token
          this.user = JSON.parse(user)
          this.isAuthenticated = true

          // Verify token is still valid
          this.fetchMe().catch(() => {
            this.logout()
          })
        }
      }
    }
  }
})
