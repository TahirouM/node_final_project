import { vi } from 'vitest'

// Mock Nuxt auto-imports
vi.stubGlobal('useNuxtApp', () => ({
  $api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

vi.stubGlobal('useRuntimeConfig', () => ({
  public: { apiBaseUrl: 'http://localhost:5000/api' }
}))

vi.stubGlobal('useRouter', () => ({
  push: vi.fn()
}))

vi.stubGlobal('navigateTo', vi.fn())

vi.stubGlobal('definePageMeta', vi.fn())
vi.stubGlobal('useHead', vi.fn())
