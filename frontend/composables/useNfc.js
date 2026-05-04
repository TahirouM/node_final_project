export const useNfc = () => {
  const config = useRuntimeConfig()

  // Generate NFC ID (simulation)
  const generateNfcId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let nfcId = 'NFC-'
    for (let i = 0; i < 8; i++) {
      nfcId += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return nfcId
  }

  // Get public profile URL
  const getProfileUrl = (publicUrl) => {
    if (process.client) {
      const baseUrl = window.location.origin
      return `${baseUrl}/profile/${publicUrl}`
    }
    return `/profile/${publicUrl}`
  }

  // Generate QR code URL (using a free QR code API)
  const getQrCodeUrl = (publicUrl) => {
    const profileUrl = encodeURIComponent(getProfileUrl(publicUrl))
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${profileUrl}`
  }

  return {
    generateNfcId,
    getProfileUrl,
    getQrCodeUrl
  }
}
