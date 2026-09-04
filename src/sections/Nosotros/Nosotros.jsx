import { useEffect, useRef, useState } from 'react'
import './Nosotros.css'

function Nosotros() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className={`nosotros${inView ? ' nosotros--visible' : ''}`}
      aria-labelledby="nosotros-heading"
    >
      {/* Luz ambiental sutil */}
      <div className="nosotros__aura" aria-hidden="true" />

      <div className="nosotros__inner">
        {/* Etiqueta general centrada */}
        <header className="nosotros__header">
          <p className="nosotros__eyebrow">NOSOTROS · FILOSOFÍA</p>
        </header>

        <div className="nosotros__grid">
          {/* Bloque Izquierdo */}
          <article className="nosotros__column nosotros__column--left">
            <h2 id="nosotros-heading" className="nosotros__title nosotros__title--left">
              No vendemos <br />
              tecnología <br />
              porque sí<span className="nosotros__dot">.</span>
            </h2>
            <p className="nosotros__text">
              Creemos que cada herramienta debe resolver un problema real y
              aportar valor al negocio.
            </p>
          </article>

          {/* Línea Divisoria con micro-nodo */}
          <div className="nosotros__divider" aria-hidden="true">
            <span className="nosotros__node" />
          </div>

          {/* Bloque Derecho */}
          <article className="nosotros__column nosotros__column--right">
            <h3 className="nosotros__title nosotros__title--right">
              Construimos <br />
              soluciones que <br />
              <span className="nosotros__highlight">tienen sentido.</span>
            </h3>
            <p className="nosotros__text">
              Escuchamos, entendemos y desarrollamos alrededor de las
              necesidades de cada proyecto.
            </p>
          </article>
        </div>

        {/* Cierre / Principio de Marca al pie */}
        <footer className="nosotros__footer">
          <p className="nosotros__principle">
            Escuchamos primero. Desarrollamos después<span className="nosotros__dot">.</span>
          </p>
        </footer>
      </div>
    </section>
  )
}

export default Nosotros
