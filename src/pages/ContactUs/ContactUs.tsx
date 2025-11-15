import { useLocation } from 'react-router-dom'
import { ContactForm } from '../../components/ContactForm'

export const ContactUs = () => {
  const location = useLocation()
  const courseInterest = location.state?.course || ''

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have a question or want to request a quotation ? 
          <br />
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>
      <ContactForm initialCourse={courseInterest} />
    </div>
  )
}
