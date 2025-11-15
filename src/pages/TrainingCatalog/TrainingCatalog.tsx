import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Checkbox } from '../../components/ui/checkbox'
import { Label } from '../../components/ui/label'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../components/ui/collapsible'
import { ChevronDown, Search, Filter } from 'lucide-react'
import coursesData from '../../data/courses.json'
import NSE12Img from '@/assets/NSE1-2.svg'
import NSE3Img from '@/assets/NSE3.svg'
import NSE45CloudImg from '@/assets/NSE4-5-Cloud.svg'
import NSE45NetworkingImg from '@/assets/NSE4-5-Networking.svg'
import NSE45SASEImg from '@/assets/NSE4-5-SASE.svg'
import NSE45SecurityImg from '@/assets/NSE4-5-Security.svg'
import NSE67CloudImg from '@/assets/NSE6-7-Cloud.svg'
import NSE67NetworkingImg from '@/assets/NSE6-7-Networking.svg'
import NSE67SASEImg from '@/assets/NSE6-7-SASE.svg'
import NSE67SecurityImg from '@/assets/NSE6-7-Security.svg'
import NSE8Img from '@/assets/NSE8.svg'

interface Course {
  name: string
  nse_level: string
  description: string
}

interface Certification {
  name: string
  nse_levels: string[]
  courses: Course[]
}

interface CoursesData {
  certifications: Certification[]
}

export const TrainingCatalog = () => {
  const navigate = useNavigate()
  const [openCertification, setOpenCertification] = useState<number | null>(null)
  const [openCourse, setOpenCourse] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedNSELevels, setSelectedNSELevels] = useState<string[]>([])
  const data: CoursesData = coursesData

  // Extract all unique NSE levels
  const allNSELevels = useMemo(() => {
    const levels = new Set<string>()
    data.certifications.forEach(cert => {
      cert.courses.forEach(course => {
        levels.add(course.nse_level)
      })
    })
    return Array.from(levels).sort((a, b) => {
      const numA = parseInt(a.replace('NSE ', ''))
      const numB = parseInt(b.replace('NSE ', ''))
      return numA - numB
    })
  }, [data])

  const toggleNSELevel = (level: string) => {
    setSelectedNSELevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    )
  }

  // Filter certifications based on search and NSE level filters
  const filteredCertifications = useMemo(() => {
    return data.certifications
      .map(cert => {
        // Filter courses based on search query and NSE level
        const filteredCourses = cert.courses.filter(course => {
          const matchesSearch = searchQuery === '' ||
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.name.toLowerCase().includes(searchQuery.toLowerCase())

          const matchesNSELevel = selectedNSELevels.length === 0 ||
            selectedNSELevels.includes(course.nse_level)

          return matchesSearch && matchesNSELevel
        })

        // Return certification with filtered courses if any courses match
        if (filteredCourses.length > 0) {
          return { ...cert, courses: filteredCourses }
        }
        return null
      })
      .filter((cert): cert is Certification => cert !== null)
  }, [data, searchQuery, selectedNSELevels])

  const handleDetails = (certName: string, courseName: string) => {
    console.log(`Details clicked for: ${certName} - ${courseName}`)
  }

  const handleReservation = (certName: string, courseName: string) => {
    const courseInfo = `${certName} - ${courseName}`
    navigate('/contact-us', { state: { course: courseInfo } })
  }

  const toggleCourse = (certIndex: number, courseName: string) => {
    const key = `${certIndex}-${courseName}`
    setOpenCourse(openCourse === key ? null : key)
  }

  // Function to get the appropriate logo based on certification name and NSE levels
  const getCertificationLogo = (cert: Certification): string => {
    const certName = cert.name.toLowerCase()
    const levels = cert.nse_levels.join(' ').toLowerCase()

    // NSE 8
    if (levels.includes('nse 8')) {
      return NSE8Img
    }

    // NSE 6-7 certifications
    if (levels.includes('nse 6') || levels.includes('nse 7')) {
      if (certName.includes('cloud')) {
        return NSE67CloudImg
      }
      if (certName.includes('network') || certName.includes('secure networking')) {
        return NSE67NetworkingImg
      }
      if (certName.includes('sase')) {
        return NSE67SASEImg
      }
      if (certName.includes('security operations') || certName.includes('security')) {
        return NSE67SecurityImg
      }
    }

    // NSE 4-5 certifications
    if (levels.includes('nse 4') || levels.includes('nse 5')) {
      if (certName.includes('cloud')) {
        return NSE45CloudImg
      }
      if (certName.includes('network')) {
        return NSE45NetworkingImg
      }
      if (certName.includes('sase')) {
        return NSE45SASEImg
      }
      if (certName.includes('security operations') || certName.includes('security')) {
        return NSE45SecurityImg
      }
    }

    // NSE 3
    if (levels.includes('nse 3')) {
      return NSE3Img
    }

    // NSE 1-2
    if (levels.includes('nse 1') || levels.includes('nse 2')) {
      return NSE12Img
    }

    // Default fallback
    return NSE12Img
  }

  // Function to get course logo based on NSE level
  const getCourseLogo = (nseLevel: string): string => {
    const level = nseLevel.toLowerCase()

    if (level.includes('8')) {
      return NSE8Img
    }
    if (level.includes('7') || level.includes('6')) {
      return NSE67SecurityImg
    }
    if (level.includes('5') || level.includes('4')) {
      return NSE45SecurityImg
    }
    if (level.includes('3')) {
      return NSE3Img
    }
    return NSE12Img
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Fortinet Training Catalog</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our comprehensive Fortinet Network Security Expert (NSE) certification paths 
          and training programs to advance your cybersecurity career.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search certifications, courses, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedNSELevels.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {selectedNSELevels.length}
              </span>
            )}
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white border rounded-lg p-4 shadow-sm mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Filter by NSE Level</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allNSELevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={selectedNSELevels.includes(level)}
                    onCheckedChange={() => toggleNSELevel(level)}
                  />
                  <Label
                    htmlFor={level}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
            {selectedNSELevels.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedNSELevels([])}
                className="mt-3 text-green-600 hover:text-green-700"
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}

        {/* Results count */}
        <div className="text-sm text-gray-600 mb-2">
          {filteredCertifications.length} certification{filteredCertifications.length !== 1 ? 's' : ''} found
          {searchQuery && ` for "${searchQuery}"`}
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {filteredCertifications.map((cert, certIndex) => (
          <Collapsible
            key={certIndex}
            open={openCertification === certIndex}
            onOpenChange={(isOpen) => setOpenCertification(isOpen ? certIndex : null)}
            className="border-2 rounded-lg bg-white shadow-md"
          >
            <CollapsibleTrigger className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="text-left flex items-start gap-3">
                <img 
                  src={getCertificationLogo(cert)} 
                  alt={cert.name}
                  className="h-12 w-12 shrink-0 object-contain"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{cert.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cert.nse_levels.map((level, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {cert.courses.length} course{cert.courses.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-6 w-6 text-gray-500 transition-transform duration-200 shrink-0 ${
                  openCertification === certIndex ? 'transform rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="px-6 pb-4">
              <div className="space-y-3 mt-2">
                {cert.courses.map((course, courseIndex) => {
                  const courseKey = `${certIndex}-${course.name}`
                  const isOpen = openCourse === courseKey

                  return (
                    <div
                      key={courseIndex}
                      className="border rounded-md bg-gray-50 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleCourse(certIndex, course.name)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <img 
                            src={getCourseLogo(course.nse_level)} 
                            alt={course.nse_level}
                            className="h-8 w-8 shrink-0 object-contain"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{course.name}</h3>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              {course.nse_level}
                            </span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 transition-transform duration-200 shrink-0 ml-2 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-2 bg-white border-t">
                          <p className="text-gray-700 text-sm mb-4">{course.description}</p>
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleDetails(cert.name, course.name)}
                              size="sm"
                              variant="default"
                              disabled
                            >
                              Details
                            </Button>
                            <Button
                              onClick={() => handleReservation(cert.name, course.name)}
                              size="sm"
                              variant="outline"
                            >
                              Reservation
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
