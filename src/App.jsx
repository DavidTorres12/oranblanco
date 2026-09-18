import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import AgencyPage from './pages/AgencyPage/AgencyPage'

const CartelesPage = lazy(() => import('./pages/CartelesPage/CartelesPage'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AgencyPage />} />
        <Route
          path="/carteles-inteligentes"
          element={
            <Suspense fallback={null}>
              <CartelesPage />
            </Suspense>
          }
        />
        {/* Redirección ante rutas no encontradas para evitar pantallas en blanco */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
