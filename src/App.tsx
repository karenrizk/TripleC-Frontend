import { Banner } from './components/layout/Banner'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { TrainingCatalog } from './pages/TrainingCatalog'
import { ContactUs } from './pages/ContactUs'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Banner />
      <main className="grow">
        <Routes>
          <Route path="" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/training-catalog" element={<TrainingCatalog />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
