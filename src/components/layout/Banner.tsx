import { Button } from '../ui/button'
import { Link, useLocation } from 'react-router-dom'
import logoImg from '@/assets/logo.png'
import fortinetTrainingCenterImg from '@/assets/fortinet_training_center.png'

export const Banner = () => {
  const location = useLocation()
  const isTrainingCatalog = location.pathname === '/training-catalog'

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={logoImg} 
            alt="TripleC Logo" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Center Fortinet Training Center Logo - Only on Training Catalog page */}
        {isTrainingCatalog && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src={fortinetTrainingCenterImg} 
              alt="Fortinet Training Center" 
              className="h-12 w-auto"
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">
              Home
            </Button>
          </Link>
          <Link to="/training-catalog">
            <Button variant="ghost">
              Training Catalog
            </Button>
          </Link>
          <Link to="/contact-us">
            <Button variant="ghost">
              Contact Us
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
