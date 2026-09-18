// ============================================================================
// CONFIGURACIÓN CENTRALIZADA DE CONTACTO Y REDES
// ============================================================================
export const CONTACT_INFO = {
  // WhatsApp: número con código de país y prefijo móvil de Argentina (549 + 3878 + 547328)
  whatsappNumber: '5493878547328',
  whatsappDisplay: '+54 3878-547328',
  whatsappMessage:
    'Hola, vi la web de Orán Soluciones y quiero consultarles por un proyecto para mi negocio.',

  // Redes sociales (completar con URLs reales cuando estén disponibles):
  instagram: '', // Ej: 'https://instagram.com/oransoluciones'
  facebook: '', // Ej: 'https://facebook.com/oransoluciones'
}

export const getWhatsAppUrl = () => {
  const { whatsappNumber, whatsappMessage } = CONTACT_INFO
  const encodedMsg = encodeURIComponent(whatsappMessage)
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMsg}`
    : `https://wa.me/?text=${encodedMsg}`
}

export const getModelWhatsAppUrl = (modelName) => {
  const { whatsappNumber } = CONTACT_INFO
  const msg = `Hola, vi el cartel de ${modelName} en la web de Orán Soluciones y quiero consultar por uno.`
  const encodedMsg = encodeURIComponent(msg)
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMsg}`
    : `https://wa.me/?text=${encodedMsg}`
}

export const getComboWhatsAppUrl = (comboType) => {
  const { whatsappNumber } = CONTACT_INFO
  const msg =
    comboType === 'x3'
      ? 'Hola, vi el Combo x3 de carteles inteligentes por $65.000 y quiero elegir mis tres modelos.'
      : 'Hola, vi el Combo x2 de carteles inteligentes por $45.000 y quiero elegir mis dos modelos.'
  const encodedMsg = encodeURIComponent(msg)
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMsg}`
    : `https://wa.me/?text=${encodedMsg}`
}


