import './CartelesHero.css'

const BUSINESS_ITEMS = [
  'Restaurantes',
  'Hoteles',
  'Barberías',
  'Gimnasios',
  'Cafeterías',
  'Tiendas',
  'Consultorios',
  'Hospedajes',
  'Estéticas',
  'Comercios',
]

// Repetición triple para asegurar un recorrido continuo e infinito sin saltos
const MARQUEE_SET = [...BUSINESS_ITEMS, ...BUSINESS_ITEMS, ...BUSINESS_ITEMS]

export default function CartelesHero() {
  return (
    <section
      id="inicio"
      className="carteles-hero"
      aria-labelledby="carteles-hero-title"
    >
      <div className="carteles-hero__inner">
        {/* Bloque de Textos */}
        <div className="carteles-hero__header">
          <h1 id="carteles-hero-title" className="carteles-hero__title">
            <span className="carteles-hero__title-line">Conectá tu negocio</span>
            <span className="carteles-hero__title-line">con tus clientes en</span>
            <span className="carteles-hero__title-line carteles-hero__title-line--accent">
              un solo toque<span className="carteles-hero__title-dot">.</span>
            </span>
          </h1>

          <p className="carteles-hero__subtitle">
            Facilitá reseñas, seguidores, consultas y acceso al Wi‑Fi con carteles
            configurados y listos para usar.
          </p>
        </div>

        {/* Bloque Visual: Video con imagen de portada interactiva */}
        <div className="carteles-hero__media">
          <div
            className="carteles-hero__media-wrapper carteles-hero__media-wrapper--video"
            role="button"
            tabIndex={0}
            aria-label="Reproducir video demostrativo de carteles inteligentes"
          >
            <img
              src="/galeria/carteles/carteles-nfc.webp"
              alt="Carteles inteligentes con NFC y QR para Google, Instagram, TikTok, WhatsApp y Wi-Fi"
              className="carteles-hero__image"
              width="1280"
              height="720"
              decoding="async"
              fetchPriority="high"
            />

            {/* Capa de video con botón de play y texto como en la referencia */}
            <div className="carteles-hero__video-overlay" aria-hidden="true">
              <div className="carteles-hero__play-btn">
                <svg
                  className="carteles-hero__play-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              <span className="carteles-hero__video-caption">
                Mirá cómo funciona
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra flotante minimalista y premium al pie del Hero */}
      <div className="carteles-hero__marquee-wrapper">
        <div
          className="carteles-hero__marquee-bar"
          role="region"
          aria-label="Rubros ideales para carteles inteligentes"
          tabIndex={0}
        >
          {/* Parte fija izquierda: IDEAL PARA */}
          <div className="carteles-hero__marquee-badge">
            <span className="carteles-hero__marquee-badge-dot" aria-hidden="true" />
            <span className="carteles-hero__marquee-badge-text">IDEAL PARA</span>
          </div>

          <div className="carteles-hero__marquee-divider" aria-hidden="true" />

          {/* Área móvil derecha con degradados suaves en extremos */}
          <div className="carteles-hero__marquee-viewport">
            <div className="carteles-hero__marquee-track">
              <div className="carteles-hero__marquee-group">
                {MARQUEE_SET.map((item, idx) => (
                  <span key={`b1-${idx}`} className="carteles-hero__marquee-item-wrap">
                    <span className="carteles-hero__marquee-item">{item}</span>
                    <span className="carteles-hero__marquee-dot" aria-hidden="true">
                      ·
                    </span>
                  </span>
                ))}
              </div>
              <div className="carteles-hero__marquee-group" aria-hidden="true">
                {MARQUEE_SET.map((item, idx) => (
                  <span key={`b2-${idx}`} className="carteles-hero__marquee-item-wrap">
                    <span className="carteles-hero__marquee-item">{item}</span>
                    <span className="carteles-hero__marquee-dot" aria-hidden="true">
                      ·
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
