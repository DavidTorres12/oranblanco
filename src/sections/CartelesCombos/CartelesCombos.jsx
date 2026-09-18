import { useEffect, useRef, useState } from 'react'
import { getComboWhatsAppUrl } from '../../config/contact'
import './CartelesCombos.css'

export default function CartelesCombos() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const whatsappUrlX2 = getComboWhatsAppUrl('x2')
  const whatsappUrlX3 = getComboWhatsAppUrl('x3')

  return (
    <section
      id="combos"
      ref={sectionRef}
      className={`carteles-combos${isVisible ? ' carteles-combos--visible' : ''}`}
      aria-labelledby="combos-title"
    >
      <div className="carteles-combos__inner">
        {/* Encabezado */}
        <div className="carteles-combos__header">
          <span className="carteles-combos__eyebrow">COMBOS DE LANZAMIENTO</span>
          <h2 id="combos-title" className="carteles-combos__title">
            Armá tu <span className="carteles-combos__title-highlight">combo y ahorrá.</span>
          </h2>
          <p className="carteles-combos__subtitle">
            Elegí los modelos que mejor se adapten a tu negocio.
          </p>
        </div>

        {/* Grilla de 2 Tarjetas Minimalistas */}
        <div className="carteles-combos__grid">
          {/* TARJETA 1: COMBO X2 */}
          <article className="carteles-combos__card carteles-combos__card--x2">
            {/* Imagen principal */}
            <div className="carteles-combos__media">
              <img
                src="/galeria/carteles/combox2.png"
                alt="Combo x2 de carteles inteligentes: Google e Instagram con tecnología NFC y QR"
                className="carteles-combos__media-img"
                loading="lazy"
                decoding="async"
                width="1672"
                height="941"
              />
            </div>

            {/* Información esencial */}
            <div className="carteles-combos__body">
              <div className="carteles-combos__card-head">
                <h3 className="carteles-combos__card-title">Combo x2</h3>
                <span className="carteles-combos__savings-pill">Ahorrás $5.000</span>
              </div>

              <div className="carteles-combos__price-row">
                <span className="carteles-combos__price-main">$45.000</span>
                <span className="carteles-combos__price-currency">ARS</span>
                <span className="carteles-combos__price-prev">$50.000</span>
              </div>

              <a
                href={whatsappUrlX2}
                target="_blank"
                rel="noopener noreferrer"
                className="carteles-combos__btn"
                aria-label="Armar mi combo x2 por WhatsApp por $45.000 ARS"
              >
                <WhatsAppIcon />
                <span>Armar mi combo x2</span>
                <ArrowRightIcon />
              </a>
            </div>
          </article>

          {/* TARJETA 2: COMBO X3 (Destacada) */}
          <article className="carteles-combos__card carteles-combos__card--x3">
            {/* Imagen principal */}
            <div className="carteles-combos__media">
              <img
                src="/galeria/carteles/combox3.png"
                alt="Combo x3 de carteles inteligentes: Google, Instagram y WhatsApp con tecnología NFC y QR"
                className="carteles-combos__media-img"
                loading="lazy"
                decoding="async"
                width="1672"
                height="941"
              />
            </div>

            {/* Información esencial */}
            <div className="carteles-combos__body">
              <div className="carteles-combos__card-head">
                <h3 className="carteles-combos__card-title">Combo x3</h3>
                <span className="carteles-combos__badge-featured">MÁS CONVENIENTE</span>
              </div>

              <div className="carteles-combos__price-row">
                <span className="carteles-combos__price-main">$65.000</span>
                <span className="carteles-combos__price-currency">ARS</span>
                <span className="carteles-combos__price-prev">$75.000</span>
                <span className="carteles-combos__savings-text">Ahorrás $10.000</span>
              </div>

              <a
                href={whatsappUrlX3}
                target="_blank"
                rel="noopener noreferrer"
                className="carteles-combos__btn"
                aria-label="Armar mi combo x3 por WhatsApp por $65.000 ARS"
              >
                <WhatsAppIcon />
                <span>Armar mi combo x3</span>
                <ArrowRightIcon />
              </a>
            </div>
          </article>
        </div>

        {/* Nota explicativa inferior */}
        <p className="carteles-combos__footer-note">
          Podés elegir entre Google, Instagram, TikTok, WhatsApp y Wi‑Fi. También podés repetir modelos.
        </p>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      className="carteles-combos__btn-whatsapp-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      className="carteles-combos__btn-arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
