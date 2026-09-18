import { useState, useRef, useEffect } from 'react'
import './CartelesBeneficios.css'

const BENEFICIOS = [
  {
    id: 'primero',
    title: '¡Sé el primero!',
    text: 'Mantenete por delante de la competencia.',
    icon: StarIcon,
  },
  {
    id: 'redirige',
    title: 'Redirige instantáneamente',
    text: 'para una buena experiencia.',
    icon: LightningIcon,
  },
  {
    id: 'clientes',
    title: '¡A los clientes les encanta!',
    text: 'Es realmente divertido y llama la atención.',
    icon: HeartIcon,
  },
  {
    id: 'criticas',
    title: '¡Adiós a las críticas negativas!',
    text: '',
    icon: CheckIcon,
  },
]

export default function CartelesBeneficios() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

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
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const prevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : BENEFICIOS.length - 1))
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev < BENEFICIOS.length - 1 ? prev + 1 : 0))
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (diff > 40) {
      nextSlide()
    } else if (diff < -40) {
      prevSlide()
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`carteles-beneficios${isVisible ? ' carteles-beneficios--visible' : ''}`}
      aria-label="Beneficios de los carteles inteligentes"
    >
      <div className="carteles-beneficios__container">
        {/* Vista Escritorio: Banner continuo con 4 columnas y divisores */}
        <div className="carteles-beneficios__grid">
          {BENEFICIOS.map((item) => {
            const IconComponent = item.icon
            return (
              <div key={item.id} className="carteles-beneficios__item">
                <div className="carteles-beneficios__icon-wrapper">
                  <IconComponent />
                </div>
                <h3 className="carteles-beneficios__title">{item.title}</h3>
                {item.text && <p className="carteles-beneficios__text">{item.text}</p>}
              </div>
            )
          })}
        </div>

        {/* Vista Móvil: Tarjeta única compacta con carrusel */}
        <div
          className="carteles-beneficios__carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Carrusel de beneficios"
        >
          {/* Botón previo */}
          <button
            type="button"
            className="carteles-beneficios__nav-arrow carteles-beneficios__nav-arrow--prev"
            onClick={prevSlide}
            aria-label="Beneficio anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Diapositiva actual */}
          <div className="carteles-beneficios__slide">
            {(() => {
              const currentItem = BENEFICIOS[activeSlide]
              const IconComponent = currentItem.icon
              return (
                <div key={currentItem.id} className="carteles-beneficios__slide-content">
                  <div className="carteles-beneficios__icon-wrapper">
                    <IconComponent />
                  </div>
                  <h3 className="carteles-beneficios__title">{currentItem.title}</h3>
                  {currentItem.text && (
                    <p className="carteles-beneficios__text">{currentItem.text}</p>
                  )}
                </div>
              )
            })()}
          </div>

          {/* Botón siguiente */}
          <button
            type="button"
            className="carteles-beneficios__nav-arrow carteles-beneficios__nav-arrow--next"
            onClick={nextSlide}
            aria-label="Beneficio siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Indicadores inferiores (4 puntos) */}
          <div className="carteles-beneficios__dots" role="tablist" aria-label="Indicadores de beneficio">
            {BENEFICIOS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeSlide === idx}
                aria-label={`Ver beneficio: ${item.title}`}
                className={`carteles-beneficios__dot${
                  activeSlide === idx ? ' carteles-beneficios__dot--active' : ''
                }`}
                onClick={() => setActiveSlide(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   Iconos Lineales SVG
   ========================================================================== */

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="carteles-beneficios__svg"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function LightningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="carteles-beneficios__svg"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="carteles-beneficios__svg"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="carteles-beneficios__svg"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
