import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getWhatsAppUrl } from '../../config/contact'
import './Navbar.css'

export default function Navbar({ variant }) {
  const location = useLocation()
  const currentVariant =
    variant || (location.pathname === '/carteles-inteligentes' ? 'carteles' : 'agency')
  const isAgency = currentVariant === 'agency'
  const whatsappUrl = getWhatsAppUrl()

  const [menuOpen, setMenuOpen] = useState(false)

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

  // Menú de navegación unificado para todas las páginas
  const links = [
    {
      label: 'Inicio',
      href: location.pathname === '/' ? '/#top' : '/',
      isRoute: location.pathname !== '/',
    },
    {
      label: 'Proyectos',
      href: '/#proyectos',
      isRoute: location.pathname !== '/',
    },
    {
      label: 'Carteles inteligentes',
      href: '/carteles-inteligentes',
      isRoute: true,
      badge: 'NUEVO',
    },
  ]

  const handleAnchorClick = (e, href) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '')
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        e.preventDefault()
        targetEl.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    } else if (href.startsWith('/#') && location.pathname === '/') {
      const targetId = href.replace('/#', '')
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        e.preventDefault()
        targetEl.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href.replace('/', ''))
      }
    }
  }

  return (
    <header
      className={`navbar navbar--${currentVariant}${
        menuOpen ? ' navbar--menu-open' : ''
      }`}
    >
      {/* Brand / Logo */}
      {isAgency ? (
        <a
          className="navbar__brand"
          href="/#top"
          onClick={(e) => handleAnchorClick(e, '/#top')}
          aria-label="Orán Soluciones, inicio"
        >
          <BrandSymbol />
          <span className="navbar__brand-name">ORAN SOLUCIONES</span>
        </a>
      ) : (
        <Link
          className="navbar__brand"
          to="/"
          onClick={() => setMenuOpen(false)}
          aria-label="Orán Soluciones, volver al inicio de la agencia"
        >
          <BrandSymbol />
          <span className="navbar__brand-name">ORAN SOLUCIONES</span>
        </Link>
      )}

      {/* Actions (Botón Hablemos solo en agencia + Toggle hamburguesa) */}
      <div className="navbar__actions">
        {isAgency && (
          <a
            className="navbar__contact"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp (abre en nueva pestaña)"
          >
            Hablemos <span aria-hidden="true">↗</span>
          </a>
        )}

        <button
          className="navbar__menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu-panel"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Panel desplegable accesible */}
      {menuOpen && (
        <nav
          id="navbar-menu-panel"
          className="navbar__menu-panel"
          aria-label="Menú principal"
        >
          <div className="navbar__menu-links">
            {links.map((link, index) => {
              const number = String(index + 1).padStart(2, '0')
              const isCurrentRoute =
                link.isRoute && location.pathname === link.href

              if (link.isRoute) {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`navbar__menu-link${
                      isCurrentRoute ? ' navbar__menu-link--active' : ''
                    }`}
                    aria-current={isCurrentRoute ? 'page' : undefined}
                    onClick={() => {
                      setMenuOpen(false)
                      if (isCurrentRoute) {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                  >
                    <span className="navbar__menu-number">{number}</span>
                    <span className="navbar__menu-link-content">
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="navbar__badge-new">{link.badge}</span>
                      )}
                    </span>
                  </Link>
                )
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="navbar__menu-link"
                  onClick={(e) => handleAnchorClick(e, link.href)}
                >
                  <span className="navbar__menu-number">{number}</span>
                  <span className="navbar__menu-link-content">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="navbar__badge-new">{link.badge}</span>
                    )}
                  </span>
                </a>
              )
            })}
          </div>

          {isAgency && (
            <a
              className="navbar__menu-contact"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              aria-label="Contactar por WhatsApp (abre en nueva pestaña)"
            >
              Hablemos <span aria-hidden="true">↗</span>
            </a>
          )}
        </nav>
      )}
    </header>
  )
}

function BrandSymbol() {
  return (
    <svg
      className="navbar__brand-symbol"
      viewBox="0 0 230 230"
      aria-hidden="true"
    >
      <defs>
        <mask id="navbar-brand-symbol-cut">
          <rect width="230" height="230" fill="white" />
          <path
            d="M69 194 C69 180 74 168 84 160 C89 156 95 154 101 154 C94 158 88 164 84 171 C79 181 81 191 89 200 L94 210 L66 210 Z"
            fill="black"
          />
        </mask>
      </defs>
      <g fill="currentColor" mask="url(#navbar-brand-symbol-cut)">
        <path d="M141 33 C105 27 73 40 53 66 C35 89 30 118 38 145 C44 166 57 181 74 190 C72 178 76 167 86 160 C90 157 95 154 100 154 C81 147 69 132 68 113 C67 90 86 72 110 72 C127 72 139 67 147 57 C153 48 152 38 147 34 C145 33 143 33 141 33 Z" />
        <path d="M158 39 C181 55 195 82 196 109 C200 153 168 191 125 199 C108 202 92 203 83 199 C74 195 71 186 75 176 C79 164 89 156 98 154 C105 153 112 158 119 158 C143 158 162 140 164 117 C166 98 158 81 141 72 C152 65 159 53 158 39 Z" />
      </g>
    </svg>
  )
}
