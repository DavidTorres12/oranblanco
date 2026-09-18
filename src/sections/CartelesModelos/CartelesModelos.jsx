import { useRef, useState, useEffect } from 'react'
import { CARTELES_MODELOS } from '../../data/cartelesModelos'
import { getModelWhatsAppUrl } from '../../config/contact'
import './CartelesModelos.css'

export default function CartelesModelos() {
  const carouselRef = useRef(null)
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [modalIndex, setModalIndex] = useState(null)

  // Observer para animación sutil de entrada
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

  // Cerrar modal con ESC y navegación con flechas de teclado
  useEffect(() => {
    if (modalIndex === null) return undefined

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setModalIndex((prev) => (prev > 0 ? prev - 1 : CARTELES_MODELOS.length - 1))
      } else if (e.key === 'ArrowRight') {
        setModalIndex((prev) => (prev < CARTELES_MODELOS.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalIndex])

  // Actualizar índice activo e interactividad de flechas al hacer scroll
  const handleScroll = () => {
    const el = carouselRef.current
    if (!el) return

    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 1
    const gap = parseFloat(window.getComputedStyle(el).gap) || 16
    const totalItemWidth = cardWidth + gap
    const scrollPos = el.scrollLeft
    const newIndex = Math.round(scrollPos / totalItemWidth)

    setActiveIndex(Math.min(Math.max(newIndex, 0), CARTELES_MODELOS.length - 1))
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  // Desplazamiento suave con flechas
  const scrollToCard = (index) => {
    const el = carouselRef.current
    if (!el) return
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 0
    const gap = parseFloat(window.getComputedStyle(el).gap) || 16
    const totalItemWidth = cardWidth + gap

    el.scrollTo({
      left: index * totalItemWidth,
      behavior: 'smooth',
    })
  }

  const scrollPrev = () => {
    scrollToCard(Math.max(activeIndex - 1, 0))
  }

  const scrollNext = () => {
    scrollToCard(Math.min(activeIndex + 1, CARTELES_MODELOS.length - 1))
  }

  const modalModelo = modalIndex !== null ? CARTELES_MODELOS[modalIndex] : null

  return (
    <section
      id="modelos"
      ref={sectionRef}
      className={`carteles-modelos${isVisible ? ' carteles-modelos--visible' : ''}`}
      aria-labelledby="modelos-title"
    >
      <div className="carteles-modelos__inner">
        {/* Cabecera de la sección */}
        <div className="carteles-modelos__header">
          <span className="carteles-modelos__badge">
            Precio de lanzamiento para las primeras unidades
          </span>

          <h2 id="modelos-title" className="carteles-modelos__title">
            Elegí tu <span className="carteles-modelos__title-highlight">cartel inteligente.</span>
          </h2>

          <p className="carteles-modelos__subtitle">
            NFC + QR, configurados para tu negocio.
          </p>
        </div>

        {/* Carrusel en móvil / Grid 3+2 en escritorio */}
        <div
          ref={carouselRef}
          className="carteles-modelos__grid"
          tabIndex={0}
          role="region"
          aria-label="Modelos de carteles inteligentes"
        >
          {CARTELES_MODELOS.map((modelo, index) => {
            const whatsappUrl = getModelWhatsAppUrl(modelo.name)

            return (
              <article
                key={modelo.id}
                className={`carteles-modelos__card carteles-modelos__card--${index + 1}`}
              >
                {/* Imagen del modelo interactiva para ver en tamaño completo */}
                <button
                  type="button"
                  className="carteles-modelos__card-media"
                  onClick={() => setModalIndex(index)}
                  aria-label={`Ver imagen completa del cartel de ${modelo.name}`}
                  title="Hacé click para ver la imagen completa"
                >
                  <img
                    src={modelo.image}
                    alt={`Cartel inteligente de ${modelo.name} con tecnología NFC y QR`}
                    className="carteles-modelos__card-img"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="500"
                  />
                  <span className="carteles-modelos__zoom-hint" aria-hidden="true">
                    <ZoomIcon />
                    <span>Ver completa</span>
                  </span>
                </button>

                {/* Contenido textual de la tarjeta */}
                <div className="carteles-modelos__card-body">
                  {/* Fila de icono + título */}
                  <div className="carteles-modelos__card-head">
                    <PlatformIcon type={modelo.iconType} />
                    <h3 className="carteles-modelos__card-title">{modelo.name}</h3>
                  </div>

                  {/* Beneficio descriptivo */}
                  <p className="carteles-modelos__card-benefit">{modelo.benefit}</p>

                  {/* Bloque de precio */}
                  <div className="carteles-modelos__card-pricing">
                    <span className="carteles-modelos__card-tag">{modelo.tag}</span>
                    <div className="carteles-modelos__card-price-row">
                      <span className="carteles-modelos__card-price">{modelo.price}</span>
                      <span className="carteles-modelos__card-currency">{modelo.currency}</span>
                    </div>
                  </div>

                  {/* Botón CTA hacia WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="carteles-modelos__card-btn"
                    aria-label={`Consultar por el cartel de ${modelo.name} por WhatsApp`}
                  >
                    <WhatsAppIcon />
                    <span>Lo quiero</span>
                    <span className="carteles-modelos__btn-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        {/* Controles de navegación del carrusel en móvil */}
        <div className="carteles-modelos__controls" aria-label="Controles del carrusel de modelos">
          <button
            type="button"
            className="carteles-modelos__nav-btn"
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            aria-label="Ver modelo anterior"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Indicadores de paginación (5 puntos) */}
          <div className="carteles-modelos__dots" role="tablist" aria-label="Paginación de modelos">
            {CARTELES_MODELOS.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === idx}
                aria-label={`Ir al modelo ${m.name}`}
                className={`carteles-modelos__dot${activeIndex === idx ? ' carteles-modelos__dot--active' : ''}`}
                onClick={() => scrollToCard(idx)}
              />
            ))}
          </div>

          <button
            type="button"
            className="carteles-modelos__nav-btn"
            onClick={scrollNext}
            disabled={!canScrollRight}
            aria-label="Ver modelo siguiente"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal de Imagen Completa (Lightbox) */}
      {modalModelo && (
        <div
          className="carteles-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="carteles-modal-title"
          onClick={() => setModalIndex(null)}
        >
          <div className="carteles-modal__backdrop" />

          <div
            className="carteles-modal__container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra superior con título y botón cerrar */}
            <div className="carteles-modal__bar">
              <div className="carteles-modal__heading">
                <span className="carteles-modal__tag">Cartel Inteligente NFC + QR</span>
                <h3 id="carteles-modal-title" className="carteles-modal__title">
                  {modalModelo.name}
                </h3>
              </div>

              <button
                type="button"
                className="carteles-modal__close-btn"
                onClick={() => setModalIndex(null)}
                aria-label="Cerrar imagen completa"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Área de la imagen con controles anterior/siguiente */}
            <div className="carteles-modal__body">
              <button
                type="button"
                className="carteles-modal__nav carteles-modal__nav--prev"
                onClick={() =>
                  setModalIndex((prev) => (prev > 0 ? prev - 1 : CARTELES_MODELOS.length - 1))
                }
                aria-label="Ver cartel anterior"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15 18l-6-6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="carteles-modal__img-wrap">
                <img
                  src={modalModelo.image}
                  alt={`Cartel inteligente de ${modalModelo.name} en tamaño completo`}
                  className="carteles-modal__img"
                />
              </div>

              <button
                type="button"
                className="carteles-modal__nav carteles-modal__nav--next"
                onClick={() =>
                  setModalIndex((prev) => (prev < CARTELES_MODELOS.length - 1 ? prev + 1 : 0))
                }
                aria-label="Ver cartel siguiente"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M9 18l6-6-6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Pie con precio y botón CTA directo */}
            <div className="carteles-modal__footer">
              <div className="carteles-modal__pricing">
                <span className="carteles-modal__price">{modalModelo.price}</span>
                <span className="carteles-modal__currency">{modalModelo.currency}</span>
                <span className="carteles-modal__benefit">· {modalModelo.benefit}</span>
              </div>

              <a
                href={getModelWhatsAppUrl(modalModelo.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="carteles-modal__cta-btn"
              >
                <WhatsAppIcon />
                <span>Lo quiero</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ==========================================================================
   Icono de lupa / zoom
   ========================================================================== */

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  )
}

/* ==========================================================================
   Iconos de Plataformas y WhatsApp (SVG nítidos e integrados)
   ========================================================================== */

function WhatsAppIcon() {
  return (
    <svg
      className="carteles-modelos__btn-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function PlatformIcon({ type }) {
  switch (type) {
    case 'google':
      return (
        <div className="carteles-modelos__icon-badge carteles-modelos__icon-badge--google" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="carteles-modelos__platform-svg">
            <path fill="#4285F4" d="M23.7 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9z" />
            <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.2C3.3 21.3 7.4 24 12 24z" />
            <path fill="#FBBC05" d="M5.3 14.1c-.2-.7-.4-1.4-.4-2.1s.2-1.4.4-2.1V6.7H1.3C.5 8.3 0 10.1 0 12s.5 3.7 1.3 5.3l4-3.2z" />
            <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.4 0 3.3 2.7 1.3 6.7l4 3.2c.9-2.9 3.6-5.1 6.7-5.1z" />
          </svg>
        </div>
      )
    case 'instagram':
      return (
        <div className="carteles-modelos__icon-badge carteles-modelos__icon-badge--instagram" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="carteles-modelos__platform-svg">
            <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
            <path
              d="M12 5.8c2 0 2.2 0 3 .1.7.1 1.1.2 1.4.3.4.1.6.3.9.6.3.3.5.5.6.9.1.3.2.7.3 1.4.1.8.1 1 .1 3s0 2.2-.1 3c-.1.7-.2 1.1-.3 1.4-.1.4-.3.6-.6.9-.3.3-.5.5-.9.6-.3.1-.7.2-1.4.3-.8.1-1 .1-3 .1s-2.2 0-3-.1c-.7-.1-1.1-.2-1.4-.3-.4-.1-.6-.3-.9-.6-.3-.3-.5-.5-.6-.9-.1-.3-.2-.7-.3-1.4-.1-.8-.1-1-.1-3s0-2.2.1-3c.1-.7.2-1.1.3-1.4.1-.4.3-.6.6-.9.3-.3.5-.5.9-.6.3-.1.7-.2 1.4-.3.8-.1 1-.1 3-.1m0-1.8c-2 0-2.3 0-3.1.1-.8 0-1.4.2-1.9.4-.5.2-1 .5-1.4.9-.4.4-.7.9-.9 1.4-.2.5-.3 1.1-.4 1.9-.1.8-.1 1.1-.1 3.1s0 2.3.1 3.1c0 .8.2 1.4.4 1.9.2.5.5 1 .9 1.4.4.4.9.7 1.4.9.5.2 1.1.3 1.9.4.8.1 1.1.1 3.1.1s2.3 0 3.1-.1c.8 0 1.4-.2 1.9-.4.5-.2 1-.5 1.4-.9.4-.4.7-.9.9-1.4.2-.5.3-1.1.4-1.9.1-.8.1-1.1.1-3.1s0-2.3-.1-3.1c0-.8-.2-1.4-.4-1.9-.2-.5-.5-1-.9-1.4-.4-.4-.9-.7-1.4-.9-.5-.2-1.1-.3-1.9-.4-.8-.1-1.1-.1-3.1-.1z"
              fill="#ffffff"
            />
            <circle cx="12" cy="12" r="3.2" fill="none" stroke="#ffffff" strokeWidth="1.6" />
            <circle cx="16.5" cy="7.5" r="0.8" fill="#ffffff" />
            <defs>
              <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="25%" stopColor="#fdf497" />
                <stop offset="50%" stopColor="#fd5949" />
                <stop offset="75%" stopColor="#d6249f" />
                <stop offset="100%" stopColor="#285AEB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )
    case 'tiktok':
      return (
        <div className="carteles-modelos__icon-badge carteles-modelos__icon-badge--tiktok" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="carteles-modelos__platform-svg">
            <rect width="24" height="24" rx="6" fill="#000000" />
            <path
              d="M16.6 8.2c-1-.2-1.8-.8-2.3-1.7-.3-.6-.5-1.2-.5-1.9h-2.4v10.3c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3 1-2.3 2.3-2.3c.2 0 .5 0 .7.1V10c-.2 0-.5-.1-.7-.1-2.6 0-4.7 2.1-4.7 4.7s2.1 4.7 4.7 4.7 4.7-2.1 4.7-4.7V10c1 .7 2.2 1.1 3.5 1.1v-2.4c-.3-.1-.6-.2-.9-.5z"
              fill="#ffffff"
            />
          </svg>
        </div>
      )
    case 'whatsapp':
      return (
        <div className="carteles-modelos__icon-badge carteles-modelos__icon-badge--whatsapp" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="carteles-modelos__platform-svg">
            <circle cx="12" cy="12" r="12" fill="#25D366" />
            <path
              fill="#ffffff"
              d="M12.004 4C7.584 4 4 7.584 4 12.004c0 1.545.44 2.99 1.205 4.218L4.2 20l3.896-1.02a7.962 7.962 0 003.908 1.025c4.42 0 8.004-3.584 8.004-8.005 0-4.42-3.584-8.004-8.004-8.004zm0 1.455c3.617 0 6.55 2.932 6.55 6.549 0 3.617-2.933 6.55-6.55 6.55-1.17 0-2.266-.31-3.214-.852l-.23-.133-2.314.606.617-2.253-.146-.233a6.52 6.52 0 01-.913-3.384c0-3.617 2.933-6.55 6.55-6.55zm-2.74 3.245c-.157 0-.315.06-.433.177-.262.262-.656.72-.656 1.533 0 1.06.786 2.122.917 2.292.131.17 1.546 2.49 3.85 3.394 1.915.753 2.3.603 2.718.563.42-.04 1.35-.55 1.546-1.088.196-.537.196-.995.131-1.088-.065-.091-.262-.144-.524-.275l-1.572-.746c-.262-.131-.459-.066-.629.131l-.681.839c-.105.131-.236.144-.393.078-.21-.091-.878-.353-1.677-1.06-.628-.564-1.047-1.245-1.165-1.455-.131-.21-.013-.328.105-.458.105-.105.236-.262.353-.393.118-.131.157-.223.236-.367.079-.144.04-.275-.013-.393-.053-.118-.472-1.18-.656-1.612-.183-.433-.367-.367-.524-.367z"
            />
          </svg>
        </div>
      )
    case 'wifi':
      return (
        <div className="carteles-modelos__icon-badge carteles-modelos__icon-badge--wifi" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="carteles-modelos__platform-svg">
            <rect width="24" height="24" rx="6" fill="#0284c7" />
            <path
              d="M12 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-4.2-4.2a6 6 0 018.4 0l1.4-1.4a8 8 0 00-11.2 0l1.4 1.4zm-2.8-2.8a10 10 0 0114 0l1.4-1.4a12 12 0 00-16.8 0l1.4 1.4z"
              fill="#ffffff"
            />
          </svg>
        </div>
      )
    default:
      return null
  }
}
