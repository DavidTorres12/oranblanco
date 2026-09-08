import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const links = [
  ['Testimonios', '#testimonios'],
  ['Nosotros', '#nosotros'],
  ['Proyectos', '#proyectos'],
  ['Enfoque', '#enfoque'],
  ['Preguntas', '#faq'],
]

function ProjectCta({ placement }) {
  return (
    <a className={`hero__start hero__start--${placement}`} href="#contacto">
      Contanos tu proyecto <span aria-hidden="true">↗</span>
    </a>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const visualRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
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
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const desktopQuery = window.matchMedia('(min-width: 48rem)')
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeWithEscape)
    desktopQuery.addEventListener('change', closeOnDesktop)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeWithEscape)
      desktopQuery.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

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
      <header
        className={`hero__header${menuOpen ? ' hero__header--menu-open' : ''}`}
      >
        <a className="hero__brand" href="#top" aria-label="Orán Soluciones, inicio">
          <svg
            className="hero__brand-symbol"
            viewBox="0 0 230 230"
            aria-hidden="true"
          >
            <defs>
              <mask id="brand-symbol-cut">
                <rect width="230" height="230" fill="white" />
                <path
                  d="M69 194 C69 180 74 168 84 160 C89 156 95 154 101 154 C94 158 88 164 84 171 C79 181 81 191 89 200 L94 210 L66 210 Z"
                  fill="black"
                />
              </mask>
            </defs>
            <g fill="currentColor" mask="url(#brand-symbol-cut)">
              <path d="M141 33 C105 27 73 40 53 66 C35 89 30 118 38 145 C44 166 57 181 74 190 C72 178 76 167 86 160 C90 157 95 154 100 154 C81 147 69 132 68 113 C67 90 86 72 110 72 C127 72 139 67 147 57 C153 48 152 38 147 34 C145 33 143 33 141 33 Z" />
              <path d="M158 39 C181 55 195 82 196 109 C200 153 168 191 125 199 C108 202 92 203 83 199 C74 195 71 186 75 176 C79 164 89 156 98 154 C105 153 112 158 119 158 C143 158 162 140 164 117 C166 98 158 81 141 72 C152 65 159 53 158 39 Z" />
            </g>
          </svg>
          <span className="hero__brand-name">ORAN SOLUCIONES</span>
        </a>

        <div className="hero__actions">
          <a className="hero__contact" href="#contacto">
            Hablemos <span aria-hidden="true">↗</span>
          </a>

          <button
            className="hero__menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="hero-menu-panel"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <nav
            id="hero-menu-panel"
            className="hero__menu-panel"
            aria-label="Menú principal"
          >
            <div className="hero__menu-links">
              {links.map(([label, href], index) => (
                <a
                  className="hero__menu-link"
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="hero__menu-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
            <a
              className="hero__menu-contact"
              href="#contacto"
              onClick={() => setMenuOpen(false)}
            >
              Hablemos <span aria-hidden="true">↗</span>
            </a>
          </nav>
        )}
      </header>

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
