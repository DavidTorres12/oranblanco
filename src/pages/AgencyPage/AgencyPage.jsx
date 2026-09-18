import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Enfoque from '../../sections/Enfoque/Enfoque'
import FAQ from '../../sections/FAQ/FAQ'
import Hero from '../../sections/Hero/Hero'
import Nosotros from '../../sections/Nosotros/Nosotros'
import Projects from '../../sections/Projects/Projects'
import Testimonials from '../../sections/Testimonials/Testimonials'

export default function AgencyPage() {
  useEffect(() => {
    // Restaurar título y meta descripción originales de la agencia
    document.title = 'Orán Soluciones | Software y Diseño Web en Orán, Salta'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Orán Soluciones — diseño y desarrollo de software en Orán, Salta. Creamos sitios web, landing pages, sistemas a medida y soluciones digitales de alto impacto.',
      )
    }
  }, [])

  return (
    <>
      <main>
        <Hero />
        <Testimonials />
        <Nosotros />
        <Projects />
        <Enfoque />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
