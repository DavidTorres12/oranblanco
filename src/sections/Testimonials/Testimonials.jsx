import { useEffect, useRef, useState } from 'react'
import testimonials from './testimonialsData'
import './Testimonials.css'

function PlayIcon() {
  return (
    <span className="testimonial-card__play" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M8.5 6.4v11.2L17 12 8.5 6.4Z" fill="currentColor" />
      </svg>
    </span>
  )
}

function TestimonialCard({ testimonial, position, index, onSelect }) {
  const { name, videoSrc, videoType, posterSrc } = testimonial
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <article
      className={`testimonial-card testimonial-card--${position}${isPlaying ? ' testimonial-card--playing' : ''}`}
      aria-label={`Testimonio de ${name}`}
      aria-roledescription="diapositiva"
    >
      {videoSrc ? (
        <video
          className="testimonial-card__video"
          controls
          playsInline
          preload="metadata"
          poster={posterSrc ?? undefined}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoSrc} type={videoType} />
        </video>
      ) : (
        <div className="testimonial-card__placeholder">
          <PlayIcon />
          <span className="sr-only">Video próximamente</span>
        </div>
      )}

      <div className={`testimonial-card__footer${isPlaying ? ' testimonial-card__footer--hidden' : ''}`}>
        <span className="testimonial-card__index">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3>{name}</h3>
      </div>

      {position !== 'active' && (
        <button
          className="testimonial-card__select"
          type="button"
          onClick={onSelect}
          aria-label={`Mostrar testimonio de ${name}`}
        />
      )}
    </article>
  )
}

function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 48rem)').matches
      ? 1
      : 0,
  )

  useEffect(() => {
    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const changeSlide = (direction) => {
    const nextIndex =
      (activeIndex + direction + testimonials.length) % testimonials.length

    setActiveIndex(nextIndex)

    const track = trackRef.current
    if (!track || window.matchMedia('(min-width: 48rem)').matches) return

    const card = track.querySelectorAll('.testimonial-card')[nextIndex]
    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    track.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const getPosition = (index) => {
    if (index === activeIndex) return 'active'
    return (index - activeIndex + testimonials.length) % testimonials.length === 1
      ? 'right'
      : 'left'
  }

  const scrollRaf = useRef(null)

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      changeSlide(-1)
    } else if (event.key === 'ArrowRight') {
      changeSlide(1)
    }
  }

  const updateMobilePosition = () => {
    const track = trackRef.current
    if (!track || window.matchMedia('(min-width: 48rem)').matches) return

    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current)
    scrollRaf.current = requestAnimationFrame(() => {
      const trackCenter = track.scrollLeft + track.clientWidth / 2
      const cards = track.children
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      for (let i = 0; i < cards.length; i += 1) {
        const card = cards[i]
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(cardCenter - trackCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = i
        }
      }

      setActiveIndex((prev) => (prev !== closestIndex ? closestIndex : prev))
    })
  }

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className={`testimonials${inView ? ' testimonials--visible' : ''}`}
      aria-labelledby="testimonials-title"
    >
      <header className="testimonials__header">
        <p className="testimonials__eyebrow">Experiencias reales</p>
        <h2 id="testimonials-title" className="testimonials__title">
          Ellos ya confiaron en nosotros<span>.</span>
        </h2>
      </header>

      <div
        className="testimonials__carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Carrusel de testimonios interactivo, use flechas izquierda y derecha para navegar"
      >
        <div
          ref={trackRef}
          className="testimonials__track"
          aria-label="Testimonios de clientes"
          aria-roledescription="carrusel"
          onScroll={updateMobilePosition}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              position={getPosition(index)}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div
          className="testimonials__controls"
          aria-label="Controles del carrusel"
        >
          <button
            className="testimonials__arrow testimonials__arrow--previous"
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label="Testimonio anterior"
          >
            ←
          </button>
          <span className="testimonials__count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(testimonials.length).padStart(2, '0')}
          </span>
          <button
            className="testimonials__arrow testimonials__arrow--next"
            type="button"
            onClick={() => changeSlide(1)}
            aria-label="Siguiente testimonio"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
