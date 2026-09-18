import { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { getWhatsAppUrl } from '../../config/contact'
import './Hero.css'

function ProjectCta({ placement }) {
  const whatsappUrl = getWhatsAppUrl()

  return (
    <a
      className={`hero__start hero__start--${placement}`}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contanos tu proyecto por WhatsApp (abre en nueva pestaña)"
    >
      Contanos tu proyecto <span aria-hidden="true">↗</span>
    </a>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const visualRef = useRef(null)
  const [videoAvailable, setVideoAvailable] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = (event) => setReduceMotion(event.matches)

    query.addEventListener('change', updatePreference)
    return () => query.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const visual = visualRef.current
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

    if (!hero || !visual || reduceMotion || !precisePointer.matches) {
      visual?.style.removeProperty('--hero-media-x')
      visual?.style.removeProperty('--hero-media-y')
      return undefined
    }

    let animationFrame

    const updateParallax = (event) => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect()
        const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5
        const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5

        visual.style.setProperty('--hero-media-x', `${relativeX * 7}px`)
        visual.style.setProperty('--hero-media-y', `${relativeY * 5}px`)
      })
    }

    const resetParallax = () => {
      visual.style.setProperty('--hero-media-x', '0px')
      visual.style.setProperty('--hero-media-y', '0px')
    }

    hero.addEventListener('pointermove', updateParallax)
    hero.addEventListener('pointerleave', resetParallax)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      hero.removeEventListener('pointermove', updateParallax)
      hero.removeEventListener('pointerleave', resetParallax)
    }
  }, [reduceMotion])

  return (
    <section
      ref={heroRef}
      id="top"
      className="hero"
      aria-labelledby="hero-title"
    >
      <Navbar variant="agency" />

      <div className="hero__layout">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__title-line">Tecnología</span>
            <span className="hero__title-line">que entiende</span>
            <span className="hero__title-line hero__title-line--accent">
              tu negocio<span className="hero__title-dot">.</span>
            </span>
          </h1>

          <p className="hero__services">Software · Web · Soluciones digitales</p>

          <ProjectCta placement="copy" />
        </div>

        <div ref={visualRef} className="hero__visual" aria-hidden="true">
          <img
            className="hero__poster"
            src="/galeria/fondohero.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            width="640"
            height="640"
          />

          {!reduceMotion && videoAvailable && (
            <video
              className="hero__video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/galeria/fondohero.webp"
              aria-hidden="true"
              tabIndex={-1}
              onError={() => setVideoAvailable(false)}
            >
              <source src="/galeria/fondohero.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        <ProjectCta placement="mobile" />
      </div>
    </section>
  )
}

export default Hero
