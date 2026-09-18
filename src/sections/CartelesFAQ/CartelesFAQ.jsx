import { useState, useRef, useEffect } from 'react'
import { CONTACT_INFO } from '../../config/contact'
import './CartelesFAQ.css'

const FAQS_CARTELES = [
  {
    id: '01',
    question: '¿Cómo funciona un cartel inteligente?',
    answer:
      'Tus clientes pueden acercar el celular al cartel mediante NFC o escanear su código QR. En segundos son dirigidos al enlace configurado para tu negocio.',
  },
  {
    id: '02',
    question: '¿Funciona con todos los celulares?',
    answer:
      'Funciona con la mayoría de los celulares modernos que cuentan con NFC. Si el dispositivo no tiene NFC o está desactivado, siempre puede utilizarse el código QR.',
  },
  {
    id: '03',
    question: '¿Es necesario descargar una aplicación?',
    answer:
      'No. El cliente solo tiene que acercar su celular o abrir la cámara para escanear el QR, sin instalar ninguna aplicación.',
  },
  {
    id: '04',
    question: '¿A dónde puede dirigir el cartel?',
    answer:
      'Podés elegir entre reseñas de Google, Instagram, TikTok, WhatsApp o el acceso a tu red Wi‑Fi, según el modelo seleccionado.',
  },
  {
    id: '05',
    question: '¿La configuración está incluida?',
    answer:
      'Sí. Configuramos el NFC y el código QR con los datos de tu negocio para que recibas el cartel listo para colocar y usar.',
  },
  {
    id: '06',
    question: '¿El diseño del cartel es personalizado?',
    answer:
      'Trabajamos con modelos estándar para mantener una entrega simple y un precio accesible. Lo que sí personalizamos es el enlace o la información vinculada a tu negocio.',
  },
  {
    id: '07',
    question: '¿Puedo cambiar el enlace más adelante?',
    answer:
      'Sí. Si cambia tu perfil, número o enlace, podés escribirnos para solicitar la actualización sin tener que reemplazar el cartel.',
  },
  {
    id: '08',
    question: '¿Cómo funcionan los combos?',
    answer:
      'Podés elegir libremente dos o tres carteles entre Google, Instagram, TikTok, WhatsApp y Wi‑Fi. También podés repetir modelos si necesitás colocarlos en diferentes sectores de tu negocio.',
  },
]

export default function CartelesFAQ() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)

  useEffect(() => {
    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hola, tengo una duda sobre los carteles inteligentes de Orán Soluciones.'
  )}`

  const renderFaqItem = (faq, index) => {
    const isOpen = openIndex === index
    const questionId = `faq-carteles-q-${index}`
    const answerId = `faq-carteles-a-${index}`

    return (
      <div
        key={faq.id}
        className={`carteles-faq__item${isOpen ? ' carteles-faq__item--open' : ''}`}
      >
        <button
          type="button"
          id={questionId}
          className="carteles-faq__trigger"
          onClick={() => toggleItem(index)}
          aria-expanded={isOpen}
          aria-controls={answerId}
        >
          <span className="carteles-faq__number" aria-hidden="true">
            {faq.id}
          </span>
          <span className="carteles-faq__question-text">{faq.question}</span>
          <span className="carteles-faq__icon-wrapper" aria-hidden="true">
            <span className="carteles-faq__icon-line carteles-faq__icon-line--h" />
            <span className="carteles-faq__icon-line carteles-faq__icon-line--v" />
          </span>
        </button>

        <div
          id={answerId}
          role="region"
          aria-labelledby={questionId}
          className="carteles-faq__content"
        >
          <div className="carteles-faq__content-inner">
            <div className="carteles-faq__answer-wrapper">
              <p className="carteles-faq__answer-text">{faq.answer}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      id="preguntas"
      ref={sectionRef}
      className={`carteles-faq${isVisible ? ' carteles-faq--visible' : ''}`}
      aria-labelledby="carteles-faq-title"
    >
      {/* Luces de fondo ambientales decorativas */}
      <div className="carteles-faq__ambient-glow carteles-faq__ambient-glow--1" aria-hidden="true" />
      <div className="carteles-faq__ambient-glow carteles-faq__ambient-glow--2" aria-hidden="true" />

      <div className="carteles-faq__inner">
        {/* Encabezado */}
        <div className="carteles-faq__header">
          <div className="carteles-faq__eyebrow-badge">
            <span className="carteles-faq__eyebrow-dot" aria-hidden="true" />
            <span>PREGUNTAS FRECUENTES</span>
          </div>
          <h2 id="carteles-faq-title" className="carteles-faq__title">
            Preguntas <span className="carteles-faq__title-highlight">frecuentes</span>
            <span className="carteles-faq__title-dot">.</span>
          </h2>
          <p className="carteles-faq__subtitle">
            Todo lo que necesitás saber antes de elegir tu cartel inteligente.
          </p>
        </div>

        {/* Acordeón de preguntas: 2 columnas en escritorio, 1 en móvil */}
        <div
          className="carteles-faq__accordion"
          role="region"
          aria-label="Preguntas frecuentes sobre carteles inteligentes"
        >
          <div className="carteles-faq__column">
            {FAQS_CARTELES.slice(0, 4).map((faq, i) => renderFaqItem(faq, i))}
          </div>
          <div className="carteles-faq__column">
            {FAQS_CARTELES.slice(4, 8).map((faq, i) => renderFaqItem(faq, i + 4))}
          </div>
        </div>

        {/* Asistencia / CTA a WhatsApp con aspecto de soporte directo */}
        <div className="carteles-faq__footer-box">
          <div className="carteles-faq__footer-content">
            <h3 className="carteles-faq__footer-title">¿Te quedó alguna otra duda?</h3>
            <p className="carteles-faq__footer-desc">
              Escribinos por WhatsApp y te asesoramos al instante para armar el cartel o combo ideal para tu negocio.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="carteles-faq__footer-btn"
            aria-label="Consultar dudas por WhatsApp"
          >
            <WhatsAppIcon />
            <span>Consultar por WhatsApp</span>
            <span className="carteles-faq__btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      className="carteles-faq__footer-btn-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
