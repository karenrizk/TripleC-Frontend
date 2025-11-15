import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Mission Statement */}
          <div className="md:col-span-1">
            <img 
              src="/logo.png" 
              alt="Triple C Logo" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm font-semibold mb-4 leading-relaxed">
              We are dedicated to overcoming challenges and driving innovation in the IT industry.
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">Address</h4>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold">Lebanon:</p>
                  <p className="text-sm">Triple C Building, Fanar main street, Metn</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                <p>+961 (1) 889 306</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold">United Arabic Emirates:</p>
                  <p className="text-sm">SRTIP, Hi Tech Office 045, Sharjah</p>
                  <p className="text-sm">Research Technology and Innovation Park</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                <p>+971 (50) 3296067</p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                <p className="text-sm">Open Hours: Monday - Friday  8 am - 6 pm</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">Links</h4>
            <div className="space-y-2">
              <Link to="/contact-us" className="block text-green-600 hover:text-green-700">
                Contact Us
              </Link>
              <a href="#" className="block text-green-600 hover:text-green-700">
                News
              </a>
              <a href="#" className="block text-green-600 hover:text-green-700">
                Careers
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">Social Media</h4>
            <a 
              href="https://www.linkedin.com/company/triple-c-sal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-gray-600 hover:text-green-600"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-gray-600">Triple C © 2025 All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
