import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Button } from '../../components/ui/button'

const AnimatedNumber = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1500 // 1.5 seconds
          const steps = 60
          const increment = end / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, hasAnimated])

  return (
    <h2 ref={ref} className="text-5xl font-semibold text-green-600 mb-2">
      {count}{suffix}
    </h2>
  )
}

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Statistics Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {/* Stat 1 */}
          <div>
            <AnimatedNumber end={1994} />
            <p className="text-gray-700 text-sm font-medium">Year of</p>
            <p className="text-gray-700 text-sm font-medium">establishment</p>
          </div>

          {/* Stat 2 */}
          <div>
            <AnimatedNumber end={500} suffix="+" />
            <p className="text-gray-700 text-sm font-medium">Of customers</p>
            <p className="text-gray-700 text-sm font-medium">worldwide</p>
          </div>

          {/* Stat 3 */}
          <div>
            <AnimatedNumber end={10} suffix="+" />
            <p className="text-gray-700 text-sm font-medium">Countries with active</p>
            <p className="text-gray-700 text-sm font-medium">client base</p>
          </div>

          {/* Stat 4 */}
          <div>
            <AnimatedNumber end={50} />
            <p className="text-gray-700 text-sm font-medium">International</p>
            <p className="text-gray-700 text-sm font-medium">Partners</p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-6 pb-16">
        <Tabs defaultValue="mission" className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 h-auto bg-transparent border-b">
            <TabsTrigger 
              value="mission" 
              className="text-base py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent"
            >
              Mission / Vision
            </TabsTrigger>
            <TabsTrigger 
              value="values" 
              className="text-base py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent"
            >
              Values
            </TabsTrigger>
            <TabsTrigger 
              value="glance" 
              className="text-base py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent"
            >
              At a glance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mission" className="mt-8 max-w-4xl mx-auto px-4">
            <div className="space-y-8">
              {/* Mission */}
              <div>
                <h3 className="text-4xl font-bold text-green-600 mb-4">Mission</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our mission is to deliver advanced and innovative ICT services and solutions tailored to our customers' needs. We aim to excel in various domains, including IT Infrastructure, IT Security, Data Center, Cloud Computing, Internet of Things and Artificial Intelligence.
                </p>
              </div>

              {/* Vision */}
              <div>
                <h3 className="text-4xl font-bold text-green-600 mb-4">Vision</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  We aspire to be a premier ICT solution provider, leading the way in the new digital era by leveraging cutting-edge technologies within the region.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="values" className="mt-8 max-w-4xl mx-auto px-4">
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-4">Values</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                At the core of our company are the principles that guide every interaction and decision: <span className="italic">Respect</span> for individuals and ideas, <span className="italic">Equality</span> in opportunity and collaboration, open and honest <span className="italic">Communication</span>, unwavering <span className="italic">Ethics</span>, and a commitment to <span className="italic">Professionalism</span> in all we do. These values shape our culture, drive innovation, and ensure we deliver trusted and impactful technology solutions.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="glance" className="mt-8 max-w-4xl mx-auto px-4">
            <div>
              <p className="text-green-600 text-lg font-medium mb-2">Indulge your curiosity.</p>
              <h3 className="text-4xl font-bold text-green-600 mb-6">At A Glance</h3>
              
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Triple C is a leading IT solutions provider, delivering tailor-made services to meet the unique needs of every client. We specialize in Networking, IT Infrastructure, Cybersecurity, IP Telephony, Systems, Servers, Storage and other IT solutions. Our team of experts combines technical know-how with industry best practices to deliver reliable and future-proof solutions.
                </p>
                
                <p>
                  We offer comprehensive managed services, backed by world-class technologies from globally recognized vendors. As a premier Fortinet Training Partner, we also provide top-tier cybersecurity training to empower your teams. Whether you're upgrading your infrastructure or securing your digital assets, Triple C is your trusted technology partner.
                </p>
                
                <p>
                  With a client-centric approach, we ensure that every solution is optimized for performance, security, and scalability.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Separator */}
      <div className="container mx-auto px-6">
        <hr className="border-t border-gray-300 max-w-6xl mx-auto" />
      </div>

      {/* Images Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img 
              src="/course-pic.png" 
              alt="Course" 
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex justify-center items-center">
            <img 
              src="/fortinet_training_center.png" 
              alt="Fortinet Training Center" 
              className="w-1/2 h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Fortinet Training Courses Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-green-600 mb-8">Fortinet Training Courses</h2>
          
          <div className="space-y-6 text-gray-600 text-base leading-relaxed">
            <p>
              The Fortinet Network Security Expert (NSE) program has undergone significant enhancements in the fall of 2023 featuring increased scalability, flexibility, and modularity. With new badging, the program now provides a better identification of specific skills and knowledge acquired in a complex industry that supports various roles across multiple cybersecurity solutions and verticals.
            </p>
            
            <p>– The program's restructuring has resulted in five proficiency levels that include a total of 11 certifications.</p>
            
            <p>– Each proficiency level has one or more certifications that align with professional career paths.</p>
            
            <p>– Obtaining a certification will require a minimum number of exams or courses.</p>
            
            <p>– Exam badges will be introduced for each core and elective exam.</p>
            
            <p>– Fortigate Certification Levels</p>

            <p>– FortiGate Administrator</p>
          </div>
          
          {/* Button */}
          <div className="mt-8 flex justify-center">
            <Link to="/training-catalog">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                View Training Catalog
              </Button>
            </Link>
          </div>

          {/* Levels Image */}
          <div className="mt-12 flex justify-start">
            <img 
              src="/levels.png" 
              alt="Certification Levels" 
              className="w-full max-w-4xl h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
