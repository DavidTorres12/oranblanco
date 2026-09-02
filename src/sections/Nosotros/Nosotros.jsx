import './Nosotros.css'

const teamVideoSources = []

const marqueeText =
  'SOFTWARE A MEDIDA · SITIOS WEB · LANDING PAGES · SISTEMAS DE GESTIÓN · AUTOMATIZACIÓN DE PROCESOS · MARKETING DIGITAL'

function TeamMedia({ sources }) {
  if (sources.length > 0) {
    return (
      <video
        className="nosotros__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        {sources.map(({ src, type }) => (
          <source src={src} type={type} key={src} />
        ))}
      </video>
    )
  }

  return (
    <div className="nosotros__placeholder">
      <p>
        Video del equipo <span>Próximamente</span>
      </p>
      <button
        className="nosotros__play"
        type="button"
        aria-label="Video del equipo próximamente"
        disabled
      >
        <span aria-hidden="true" />
      </button>
    </div>
  )
}

function Marquee({ text }) {
  return (
    <div className="nosotros__marquee" aria-label={text}>
      <div className="nosotros__marquee-track" aria-hidden="true">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}

function Nosotros() {
  return (
    <section id="nosotros" className="nosotros" aria-labelledby="nosotros-title">
      <div className="nosotros__main">
        <div className="nosotros__copy">
          <p className="nosotros__eyebrow">Nosotros</p>

          <h2 id="nosotros-title" className="nosotros__title">
            Somos <span>Orán Soluciones.</span>
          </h2>

          <div className="nosotros__body">
            <p>
              Ayudamos a empresas e instituciones de la región a digitalizarse
              con soluciones pensadas para su realidad.
            </p>
            <p>
              Elegimos proyectos donde podemos aportar valor real, simplificar
              procesos y construir algo que tenga sentido.
            </p>
          </div>

          <p className="nosotros__principle">
            Escuchamos primero. Desarrollamos después<span>.</span>
          </p>
        </div>

        <div className="nosotros__media">
          <TeamMedia sources={teamVideoSources} />
        </div>
      </div>

      <div className="nosotros__marquee-wrap">
        <Marquee text={marqueeText} />
      </div>
    </section>
  )
}

export default Nosotros
