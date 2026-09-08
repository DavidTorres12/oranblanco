import { CONTACT_INFO, getWhatsAppUrl } from '../../config/contact'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()
  const whatsappUrl = getWhatsAppUrl()

  return (
    <footer id="contacto" className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Marca principal con isotipo */}
        <div className="footer__brand-wrap">
          <h2 className="footer__brand-title">
            <span className="footer__brand-word">ORÁN</span>{' '}
            <span className="footer__brand-word footer__brand-word--nowrap">
              SOLUCIONES<span className="footer__brand-dot">.</span>
            </span>
          </h2>

          <svg
            className="footer__brand-symbol"
            viewBox="0 0 230 230"
            aria-hidden="true"
          >
            <defs>
              <mask id="footer-symbol-cut">
                <rect width="230" height="230" fill="white" />
                <path
                  d="M69 194 C69 180 74 168 84 160 C89 156 95 154 101 154 C94 158 88 164 84 171 C79 181 81 191 89 200 L94 210 L66 210 Z"
                  fill="black"
                />
              </mask>
            </defs>
            <g fill="currentColor" mask="url(#footer-symbol-cut)">
              <path d="M141 33 C105 27 73 40 53 66 C35 89 30 118 38 145 C44 166 57 181 74 190 C72 178 76 167 86 160 C90 157 95 154 100 154 C81 147 69 132 68 113 C67 90 86 72 110 72 C127 72 139 67 147 57 C153 48 152 38 147 34 C145 33 143 33 141 33 Z" />
              <path d="M158 39 C181 55 195 82 196 109 C200 153 168 191 125 199 C108 202 92 203 83 199 C74 195 71 186 75 176 C79 164 89 156 98 154 C105 153 112 158 119 158 C143 158 162 140 164 117 C166 98 158 81 141 72 C152 65 159 53 158 39 Z" />
            </g>
          </svg>
        </div>

        {/* Línea divisoria */}
        <hr className="footer__divider" aria-hidden="true" />

        {/* Navegación inferior y redes */}
        <div className="footer__nav-row">
          <nav className="footer__nav" aria-label="Navegación del sitio">
            <a className="footer__link" href="#top">Inicio</a>
            <a className="footer__link" href="#testimonios">Testimonios</a>
            <a className="footer__link" href="#nosotros">Nosotros</a>
            <a className="footer__link" href="#proyectos">Proyectos</a>
            <a className="footer__link" href="#enfoque">Enfoque</a>
            <a className="footer__link" href="#faq">Preguntas</a>
          </nav>

          <div className="footer__socials" aria-label="Redes sociales">
            <a
              className="footer__social-btn footer__social-btn--whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp (abre en nueva pestaña)"
              title="WhatsApp"
            >
              <svg
                className="footer__social-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>

            <a
              className="footer__social-btn footer__social-btn--instagram"
              href={CONTACT_INFO.instagram || 'https://instagram.com/oransoluciones'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (abre en nueva pestaña)"
              title="Instagram"
            >
              <svg
                className="footer__social-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              className="footer__social-btn footer__social-btn--facebook"
              href={CONTACT_INFO.facebook || 'https://facebook.com/oransoluciones'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook (abre en nueva pestaña)"
              title="Facebook"
            >
              <svg
                className="footer__social-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {CONTACT_INFO.linkedin && (
              <a
                className="footer__social-btn footer__social-btn--linkedin"
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (abre en nueva pestaña)"
                title="LinkedIn"
              >
                <svg
                  className="footer__social-icon"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.54a1.6 1.6 0 1 0 .01 3.2 1.6 1.6 0 0 0-.01-3.2" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Información final */}
        <div className="footer__info-row">
          <p className="footer__location">
            Orán, Salta, Argentina.
          </p>

          <p className="footer__copyright">
            {`© ${currentYear} Todos los derechos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
