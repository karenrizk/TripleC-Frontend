import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { getData } from 'country-list'

interface FormData {
  firstName: string
  lastName: string
  email: string
  areaCode: string
  phone: string
  company: string
  country: string
  courseInterest?: string
  message: string
}

const countries = getData().map(country => country.name).sort()

interface ContactFormProps {
  initialCourse?: string
}

export const ContactForm = ({ initialCourse = '' }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    areaCode: '',
    phone: '',
    company: '',
    country: '',
    ...(initialCourse && { courseInterest: initialCourse }),
    message: ''
  })

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.areaCode.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.company.trim() !== '' &&
      formData.country !== '' &&
      formData.message.trim() !== ''
    )
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form Data:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-green-600">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="John"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-green-600">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-green-600">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john.doe@example.com"
          required
        />
      </div>

      {/* Area Code and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="areaCode">
            Area Code <span className="text-green-600">*</span>
          </Label>
          <Input
            id="areaCode"
            name="areaCode"
            type="text"
            value={formData.areaCode}
            onChange={handleInputChange}
            placeholder="+1"
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="phone">
            Phone <span className="text-green-600">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(555) 123-4567"
            required
          />
        </div>
      </div>

      {/* Company and Country */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">
            Company <span className="text-green-600">*</span>
          </Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company Name"
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="country">
            Country <span className="text-green-600">*</span>
          </Label>
          <Select value={formData.country} onValueChange={handleCountryChange} required>
            <SelectTrigger id="country" className="w-full">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Interest - Only shown when coming from reservation */}
      {initialCourse && (
        <div className="space-y-2">
          <Label htmlFor="courseInterest">
            Course Interest
          </Label>
          <Input
            id="courseInterest"
            name="courseInterest"
            value={formData.courseInterest || ''}
            onChange={handleInputChange}
            placeholder="Which course are you interested in?"
            readOnly
            className="bg-gray-50"
          />
        </div>
      )}

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-green-600">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell us how we can help you..."
          rows={6}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="lg" 
          className="w-full md:w-auto"
          disabled={!isFormValid()}
        >
          Send Message
        </Button>
      </div>
    </form>
  )
}
