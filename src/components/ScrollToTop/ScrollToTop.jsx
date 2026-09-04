import { useEffect, useState } from 'react'
import './ScrollToTop.css'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Aparece después de scrollear más de 400px (aproximadamente pasando el hero)
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <button
      className={`scroll-to-top${isVisible ? ' scroll-to-top--visible' : ''}`}
      type="button"
      onClick={scrollToTop}
      aria-label="Subir al inicio de la página"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
    >
      <svg
        className="scroll-to-top__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
      <span className="scroll-to-top__tooltip" aria-hidden="true">
        Inicio
      </span>
    </button>
  )
}

export default ScrollToTop
