import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    myProfile: null,
    publicProfile: null,
    loading: false,
    error: null
  }),

  getters: {
    hasProfile: (state) => !!state.myProfile
  },

  actions: {
    async fetchMyProfile() {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/profiles/my-profile')
        this.myProfile = response.data.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to fetch profile'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async createProfile(profileData) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/profiles', profileData)
        this.myProfile = response.data.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to create profile'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async updateProfile(profileId, profileData) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.put(`/profiles/${profileId}`, profileData)
        this.myProfile = response.data.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to update profile'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async fetchPublicProfile(publicUrl) {
      const api = useApi()
      this.loading = true
      this.error = null

      try {
        const response = await api.get(`/profiles/public/${publicUrl}`)
        this.publicProfile = response.data.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Profile not found'
        throw error.response?.data || error
      } finally {
        this.loading = false
      }
    },

    async incrementScan(profileId) {
      const api = useApi()
      try {
        const response = await api.post(`/profiles/${profileId}/scan`)
        return response.data
      } catch (error) {
        console.error('Failed to increment scan:', error)
      }
    },

    clearPublicProfile() {
      this.publicProfile = null
    }
  }
})
