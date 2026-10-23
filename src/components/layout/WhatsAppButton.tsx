import './WhatsAppButton.css'

const WhatsAppButton = () => {
  const phone = String(import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')
  const message = encodeURIComponent('Hola, quisiera información sobre el acompañamiento psicológico.')

  // A real destination is required before exposing the contact action.
  if (!phone) return null

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp (abre en una nueva pestaña)"
      title="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16 .8A15.1 15.1 0 0 0 2.9 23.4L.8 31.2l8-2.1A15.2 15.2 0 1 0 16 .8Zm0 27.5a12.5 12.5 0 0 1-6.4-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5A12.6 12.6 0 1 1 16 28.3Zm6.9-9.4c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5-.1-.7l-1.1-2.6c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.4 3.5 1.6 3.7c.2.3 2.7 4.1 6.4 5.7.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
