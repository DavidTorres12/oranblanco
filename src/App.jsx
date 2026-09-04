import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Enfoque from './sections/Enfoque/Enfoque'
import FAQ from './sections/FAQ/FAQ'
import Hero from './sections/Hero/Hero'
import Nosotros from './sections/Nosotros/Nosotros'
import Projects from './sections/Projects/Projects'
import Testimonials from './sections/Testimonials/Testimonials'

function App() {
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
      <ScrollToTop />
    </>
  )
}

export default App
