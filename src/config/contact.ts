// Public business contact. The deployment can override it at build time.
const defaultWhatsAppNumber = '573116209443'
const configuredNumber = String(import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')

export const WHATSAPP_NUMBER = configuredNumber || defaultWhatsAppNumber
