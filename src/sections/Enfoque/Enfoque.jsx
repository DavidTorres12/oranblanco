import { useEffect, useRef, useState } from 'react'
import './Enfoque.css'

function Enfoque() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setIsVisible(true)
        observer.disconnect()
      },
      {
        threshold: 0.28,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="enfoque"
      className={`enfoque${isVisible ? ' enfoque--visible' : ''}`}
      aria-labelledby="enfoque-title"
    >
      <div className="enfoque__inner">
        <p className="enfoque__eyebrow">Enfoque</p>

        <p className="enfoque__statement">
          Cada proyecto empieza con una pregunta.
        </p>

        <h2
          id="enfoque-title"
          className="enfoque__question"
          aria-label="¿Qué necesita realmente tu empresa para crecer?"
        >
          <span className="enfoque__question-line" aria-hidden="true">
            ¿Qué necesita realmente <span className="enfoque__accent">tu</span>{' '}
            <span className="enfoque__accent">empresa</span> para
          </span>
          <span className="enfoque__question-line" aria-hidden="true">
            <span className="enfoque__highlight">crecer?</span>
          </span>
        </h2>
      </div>
    </section>
  )
}

export default Enfoque
