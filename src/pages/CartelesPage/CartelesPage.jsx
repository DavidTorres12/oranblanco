import { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CartelesHero from '../../sections/CartelesHero/CartelesHero'
import CartelesModelos from '../../sections/CartelesModelos/CartelesModelos'
import CartelesCombos from '../../sections/CartelesCombos/CartelesCombos'
import CartelesBeneficios from '../../sections/CartelesBeneficios/CartelesBeneficios'
import CartelesFAQ from '../../sections/CartelesFAQ/CartelesFAQ'
import './CartelesPage.css'

export default function CartelesPage() {
  useEffect(() => {
    // Título y meta descripción específicos para Carteles Inteligentes
    document.title = 'Carteles inteligentes | Orán Soluciones'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Carteles inteligentes con tecnología NFC y código QR para comercios y emprendimientos de Orán. Conectá a tus clientes con tus reseñas de Google, Instagram, TikTok, WhatsApp o Wi-Fi al instante.',
      )
    }
  }, [])

  return (
    <div className="carteles-page">
      {/* Navegación específica de Carteles Inteligentes */}
      <Navbar variant="carteles" />

      {/* Contenedor semántico principal */}
      <main className="carteles-main">
        <CartelesHero />
        <CartelesModelos />
        <CartelesCombos />
        <CartelesBeneficios />
        <CartelesFAQ />
      </main>

      {/* Pie de página oficial de Orán Soluciones */}
      <Footer variant="carteles" />
    </div>
  )
}
