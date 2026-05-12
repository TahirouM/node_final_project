import { describe, it, expect } from 'vitest'
import { useNfc } from '../../composables/useNfc'

describe('useNfc composable', () => {
  const { generateNfcId, getProfileUrl, getQrCodeUrl } = useNfc()

  describe('generateNfcId', () => {
    it('returns a string matching NFC-XXXXXXXX format', () => {
      const id = generateNfcId()
      expect(id).toMatch(/^NFC-[A-Z0-9]{8}$/)
    })

    it('generates unique IDs across multiple calls', () => {
      const ids = new Set(Array.from({ length: 50 }, () => generateNfcId()))
      expect(ids.size).toBeGreaterThan(45)
    })
  })

  describe('getProfileUrl', () => {
    it('returns a relative URL when not in browser', () => {
      const url = getProfileUrl('john-doe')
      expect(url).toBe('/profile/john-doe')
    })
  })

  describe('getQrCodeUrl', () => {
    it('returns a URL containing the encoded profile URL', () => {
      const url = getQrCodeUrl('john-doe')
      expect(url).toContain('qrserver.com')
      expect(url).toContain('john-doe')
    })

    it('returns a URL with size parameter', () => {
      const url = getQrCodeUrl('test')
      expect(url).toContain('300x300')
    })
  })
})
