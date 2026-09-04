// ============================================================================
// CONFIGURACIÓN CENTRALIZADA DE CONTACTO Y REDES
// ============================================================================
export const CONTACT_INFO = {
  // WhatsApp: ingresá tu número con código de país (ej: '5493878xxxxxx')
  whatsappNumber: '',
  whatsappMessage:
    'Hola, vi la web de Orán Soluciones y quiero consultarles por un proyecto para mi negocio.',

  // Redes sociales (completar con URLs reales cuando estén disponibles):
  instagram: '', // Ej: 'https://instagram.com/oransoluciones'
  facebook: '', // Ej: 'https://facebook.com/oransoluciones'
  linkedin: '', // Ej: 'https://linkedin.com/company/oransoluciones'
}

export const getWhatsAppUrl = () => {
  const { whatsappNumber, whatsappMessage } = CONTACT_INFO
  const encodedMsg = encodeURIComponent(whatsappMessage)
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMsg}`
    : `https://wa.me/?text=${encodedMsg}`
}
