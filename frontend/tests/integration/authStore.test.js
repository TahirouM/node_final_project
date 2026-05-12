import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../stores/auth'

const mockApi = {
  post: vi.fn(),
  get: vi.fn(),
  put: vi.fn()
}

vi.stubGlobal('useApi', () => mockApi)
vi.stubGlobal('navigateTo', vi.fn())

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('starts unauthenticated', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
  })

  it('sets auth state after login success', async () => {
    mockApi.post.mockResolvedValue({
      data: {
        success: true,
        data: {
          user: { id: '1', email: 'test@example.com', role: 'user' },
          token: 'jwt-token-123'
        }
      }
    })

    const store = useAuthStore()
    await store.login({ email: 'test@example.com', password: 'pass123' })

    expect(store.isAuthenticated).toBe(true)
    expect(store.user.email).toBe('test@example.com')
    expect(store.token).toBe('jwt-token-123')
  })

  it('throws on login error', async () => {
    mockApi.post.mockRejectedValue({
      response: { data: { success: false, error: 'Identifiants invalides' } }
    })

    const store = useAuthStore()
    await expect(store.login({ email: 'bad@example.com', password: 'wrong' })).rejects.toMatchObject({
      success: false
    })
    expect(store.isAuthenticated).toBe(false)
  })

  it('clears state on logout', async () => {
    const store = useAuthStore()
    store.user = { id: '1', email: 'test@example.com' }
    store.token = 'some-token'
    store.isAuthenticated = true

    store.logout()

    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('isAdmin returns true for admin role', async () => {
    mockApi.post.mockResolvedValue({
      data: {
        data: {
          user: { id: '2', email: 'admin@example.com', role: 'admin' },
          token: 'admin-token'
        }
      }
    })

    const store = useAuthStore()
    await store.login({ email: 'admin@example.com', password: 'admin123' })
    expect(store.isAdmin).toBe(true)
  })

  it('isAdmin returns false for regular user', async () => {
    mockApi.post.mockResolvedValue({
      data: {
        data: {
          user: { id: '1', email: 'user@example.com', role: 'user' },
          token: 'user-token'
        }
      }
    })

    const store = useAuthStore()
    await store.login({ email: 'user@example.com', password: 'pass' })
    expect(store.isAdmin).toBe(false)
  })

  it('fetchMe updates user state', async () => {
    mockApi.get.mockResolvedValue({
      data: { data: { id: '1', email: 'updated@example.com', role: 'user' } }
    })

    const store = useAuthStore()
    store.token = 'valid-token'
    await store.fetchMe()

    expect(store.user.email).toBe('updated@example.com')
    expect(store.isAuthenticated).toBe(true)
  })

  it('fetchMe logs out on error', async () => {
    mockApi.get.mockRejectedValue({ response: { data: { error: 'Token invalide' } } })

    const store = useAuthStore()
    store.token = 'expired-token'
    store.isAuthenticated = true

    await expect(store.fetchMe()).rejects.toBeDefined()
    expect(store.isAuthenticated).toBe(false)
  })
})
