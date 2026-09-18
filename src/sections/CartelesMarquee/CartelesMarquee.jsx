import './CartelesMarquee.css'

const ROW_1_ITEMS = [
  'Emprendedores',
  'Restaurantes',
  'Hoteles',
  'Barberías',
  'Gimnasios',
  'Tiendas de ropa',
  'Emprendedores',
  'Restaurantes',
  'Hoteles',
  'Barberías',
  'Gimnasios',
  'Tiendas de ropa',
]

const ROW_2_ITEMS = [
  'Cafeterías',
  'Consultorios',
  'Hospedajes',
  'Salones de belleza',
  'Comercios',
  'Cafeterías',
  'Consultorios',
  'Hospedajes',
  'Salones de belleza',
  'Comercios',
]

export default function CartelesMarquee() {
  return (
    <section
      className="carteles-marquee"
      aria-label="Negocios y rubros que usan carteles inteligentes"
    >
      <div className="carteles-marquee__container">
        {/* Título centrado con acento en celeste */}
        <div className="carteles-marquee__header">
          <h2 className="carteles-marquee__title">
            Pensados para negocios que quieren{' '}
            <span className="carteles-marquee__title-accent">conectar mejor</span>{' '}
            con sus clientes.
          </h2>
        </div>

        {/* Contenedor de las dos filas del Marquee */}
        <div className="carteles-marquee__content">
          {/* Fila 1: Dirección Izquierda */}
          <div
            className="carteles-marquee__row"
            role="region"
            aria-label="Primer grupo de rubros comerciales"
            tabIndex={0}
          >
            <div className="carteles-marquee__track carteles-marquee__track--left">
              {/* Primer set de elementos */}
              <div className="carteles-marquee__group">
                {ROW_1_ITEMS.map((item, idx) => (
                  <span key={`r1-a-${idx}`} className="carteles-marquee__item-wrap">
                    <span className="carteles-marquee__item">{item}</span>
                    <span className="carteles-marquee__separator" aria-hidden="true">
                      ·
                    </span>
                  </span>
                ))}
              </div>
              {/* Set duplicado para bucle continuo */}
              <div className="carteles-marquee__group" aria-hidden="true">
                {ROW_1_ITEMS.map((item, idx) => (
                  <span key={`r1-b-${idx}`} className="carteles-marquee__item-wrap">
                    <span className="carteles-marquee__item">{item}</span>
                    <span className="carteles-marquee__separator">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Fila 2: Dirección Derecha (Sentido opuesto) */}
          <div
            className="carteles-marquee__row"
            role="region"
            aria-label="Segundo grupo de rubros comerciales"
            tabIndex={0}
          >
            <div className="carteles-marquee__track carteles-marquee__track--right">
              {/* Primer set de elementos */}
              <div className="carteles-marquee__group">
                {ROW_2_ITEMS.map((item, idx) => (
                  <span key={`r2-a-${idx}`} className="carteles-marquee__item-wrap">
                    <span className="carteles-marquee__item">{item}</span>
                    <span className="carteles-marquee__separator" aria-hidden="true">
                      ·
                    </span>
                  </span>
                ))}
              </div>
              {/* Set duplicado para bucle continuo */}
              <div className="carteles-marquee__group" aria-hidden="true">
                {ROW_2_ITEMS.map((item, idx) => (
                  <span key={`r2-b-${idx}`} className="carteles-marquee__item-wrap">
                    <span className="carteles-marquee__item">{item}</span>
                    <span className="carteles-marquee__separator">·</span>
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
