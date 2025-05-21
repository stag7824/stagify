'use client'
import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, BeerIcon, CameraIcon, MusicIcon, UserIcon } from 'lucide-react'
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AnimatedLogo from '@/components/AnimatedLogo'
import Loader from '@/components/Loader'

import ModalComponent from '../components/ModalComponent';


import pubImage1 from '../assets/images/pub/pub1.jpg';
import pubImage2 from '../assets/images/pub/pub2.jpg';
import pubImage3 from '../assets/images/pub/pub3.jpg';
import pubImage4 from '../assets/images/pub/pub4.jpg';

// import slide1 from '../assets/images/slideshow/slide1.jpg'
// import slide2 from '../assets/images/slideshow/slide2.jpg'
// import slide3 from '../assets/images/slideshow/slide3.jpg'

import SwirlAnimation from '../components/SwirlAnimation'


const initialOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD"
};


const center = {
  lat: 47.505194,
  lng: 19.063522,
};


// const slides = [
//   slide1,
//   slide2,
//   slide3
// ]

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Ruin Bars in Budapest",
    description: "Explore the unique charm of Budapest's famous ruin bars",
    content: "Discover the hidden gems of Budapest's nightlife scene with our guide to the top 10 ruin bars. From eclectic decor to amazing atmosphere, these bars offer a truly unique experience.",
    imageUrl: "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*yoO1lbPbaK6k_sqq.jpg",
    link: "https://alisyed1.medium.com/your-guide-to-top-10-ruin-bars-in-budapest-b2c142c336fa"
  },
  // Add more blog posts here
];

const pricingOptions = [
  {
    title: "Standard Ticket 🍺",
    description: "Perfect for solo travelers",
    price: "custom", // Changed from fixed price to custom
    defaultPrice: 20, // Default price suggestion
    perks: [
      "Entry to 4-5 venues",
      "Welcome shots",
      "Drink discounts",
      "Free Welcome Shots",
      "SKIP THE LINE, VIP ENTRY"
    ],
    minGroupSize: 1,
    maxGroupSize: 100,
    cardStyles: {
      card: "bg-[#272727] border-[#747474] transform hover:scale-105 transition-transform duration-300",
      title: "text-[#FFE400]",
      description: "text-[#747474]",
      price: "text-[#FFE400]",
      button: "w-full bg-[#14A76C] hover:bg-[#FF652F] text-white",
    },
  },
  {
    title: "Group Ticket 🎉",
    description: "For groups of 4 or more",
    price: 29.5,
    priceNote: "per person",
    perks: [
      "All Standard features",
      "Group photo",
      "Priority entry",
      "Free Welcome Shots",
      "SKIP THE LINE, VIP ENTRY"
    ],
    minGroupSize: 4,
    maxGroupSize: null, // No maximum
    cardStyles: {
      card: "bg-[#272727] border-[#747474] border-4 border-[#FFE400] transform hover:scale-105 transition-transform duration-300",
      title: "text-[#FFE400]",
      description: "text-[#747474]",
      price: "text-[#FFE400]",
      button: "w-full bg-[#14A76C] hover:bg-[#FF652F] text-white",
    },
  },
  // {
  //   title: "VIP Experience 👑",
  //   description: "Ultimate party package",
  //   price: 23.99,
  //   perks: [
  //     "All Group features",
  //     "Skip the line",
  //     "Personal guide",
  //     "Unlimited Drinks in Selected bars",
  //     "Free Welcome Shots",
  //     "SKIP THE LINE, VIP ENTRY"
  //   ],
  //   minGroupSize: 5,
  //   maxGroupSize: null, // No maximum
  //   cardStyles: {
  //     card: "bg-[#272727] border-[#747474] border-4 border-[#FF652F] transform hover:scale-105 transition-transform duration-300",
  //     title: "text-[#FF652F]",
  //     description: "text-[#747474]",
  //     price: "text-[#FFE400]",
  //     button: "w-full bg-[#14A76C] hover:bg-[#FF652F] text-white",
  //   },
  // },
];


function HomeScreen() {
  const [activeTab, setActiveTab] = useState('overview')
  // const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const [darkMode, setDarkMode] = useState(true)
  const pricingRef = useRef(null)
  const blogsRef = useRef(null)
  const contactRef = useRef(null)
  const packagesRef = useRef(null)
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [customPrice, setCustomPrice] = useState(20); // State for custom price input

  const [minGroupSize, setMinGroupSize] = useState(1);
  const [maxGroupSize, setMaxGroupSize] = useState(99);

  const handleCardDetail = (option) => {
    // If price is custom, use the customPrice value
    const finalPrice = option.price === "custom" ? customPrice : option.price;
    
    setSelectedPrice(finalPrice);
    setMinGroupSize(option.minGroupSize);
    setMaxGroupSize(option.maxGroupSize);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPrice(null);
    setMinGroupSize(1);
    setMaxGroupSize(99);
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length)
  //   }, 5000)
  //   return () => clearInterval(interval)
  // }, [])

  // useEffect(() => {
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  //   setDarkMode(prefersDark)
  // }, [])

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
  };


  // Loader
  const [isLoading, setIsLoading] = useState(true);
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode)
  // }

  return (
    <div className={`min-h-screen bg-[#272727] text-[#FFE400]`}>
      <header className="container mx-auto p-4">
        <nav className="flex justify-between items-center">
          {/* <a href="/" className="text-2xl font-bold text-[#FF652F]">Budapest Pub Crawl</a> */}
          <div className="flex items-center">
            <AnimatedLogo />
            <h1 className="text-2xl font-bold neon-text ml-2 text-white">Budapest Pub Crawl</h1>
          </div>
          <div className="hidden md:flex space-x-4">
            <button onClick={() => scrollTo(packagesRef)} className="text-[#FFE400] hover:text-[#14A76C]">Tours</button>
            <button onClick={() => scrollTo(pricingRef)} className="text-[#FFE400] hover:text-[#14A76C]">Pricing</button>
            <button onClick={() => scrollTo(blogsRef)} className="text-[#FFE400] hover:text-[#14A76C]">Blog</button>
            <button onClick={() => scrollTo(blogsRef)} className="text-[#FFE400] hover:text-[#14A76C]">Contact</button>
          </div>
          {/* night or day light mode */}
          {/* <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-[#747474] text-[#14A76C]">
              {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-full hover:bg-[#747474] text-[#14A76C]">
              {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div> */}
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <button onClick={() => scrollTo(packagesRef)} className="block w-full text-left py-2 text-[#FFE400] hover:text-[#14A76C]">Tours</button>
            <button onClick={() => scrollTo(pricingRef)} className="block w-full text-left py-2 text-[#FFE400] hover:text-[#14A76C]">Pricing</button>
            <button onClick={() => scrollTo(blogsRef)} className="block w-full text-left py-2 text-[#FFE400] hover:text-[#14A76C]">Blog</button>
            <button onClick={() => scrollTo(blogsRef)} className="block w-full text-left py-2 text-[#FFE400] hover:text-[#14A76C]">Contact</button>
          </div>
        )}
      </header>

      <main className="container mx-auto p-4">
        <section className="h-[60vh] relative overflow-hidden rounded-xl mb-12">
          <SwirlAnimation />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4 text-[#FF652F]">
                Experience Budapest Nightlife
              </h2>
              <p className="text-xl mb-8 text-[#FFE400]">
                Join the best pub crawl in the heart of Hungary
              </p>
              <Button
                size="lg"
                onClick={() => scrollTo(packagesRef)}
                className="bg-[#14A76C] hover:bg-[#FF652F] text-white"
              >
                Book Now
              </Button>
            </div>
          </div>
        </section>

        <section id="tours" ref={packagesRef} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#FF652F]">Our Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="text-[#FFE400] data-[state=active]:bg-[#14A76C]">Overview</TabsTrigger>
                <TabsTrigger value="schedule" className="text-[#FFE400] data-[state=active]:bg-[#14A76C]">Schedule</TabsTrigger>
                <TabsTrigger value="meetup" className="text-[#FFE400] data-[state=active]:bg-[#14A76C]">Meet-up</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card className="bg-[#272727] border-[#747474]">
                  <CardHeader>
                    <CardTitle className="text-[#FF652F]">Pub Crawl Experience</CardTitle>
                    <CardDescription className="text-[#747474]">Discover the best bars and clubs in Budapest</CardDescription>
                  </CardHeader>
                  <CardContent className="text-[#FFE400]">
                    <p>Join us for an unforgettable night out in Budapest! Our pub crawl includes:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Visit to 4-5 popular bars and clubs</li>
                      <li>Free welcome shot at each venue</li>
                      <li>Exclusive drink discounts</li>
                      <li>Professional party guide</li>
                      <li>Photos of your night out</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => scrollTo(pricingRef)} className="bg-[#14A76C] text-white hover:bg-[#FF652F]" >Book Now</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="schedule">
                <Card className="bg-[#272727] border-[#747474]">
                  <CardHeader>
                    <CardTitle className="text-[#FF652F]">Tour Schedule</CardTitle>
                    <CardDescription className="text-[#747474]">Plan your night out</CardDescription>
                  </CardHeader>
                  <CardContent className="text-[#FFE400]">
                    <ul className="space-y-2">
                      <li className="flex items-center"><CalendarIcon className="mr-2" /> Every day</li>
                      <li className="flex items-center"><UserIcon className="mr-2" /> Meet at 9:30 PM</li>
                      <li className="flex items-center"><BeerIcon className="mr-2" /> First bar at 10:00 PM</li>
                      <li className="flex items-center"><MusicIcon className="mr-2" /> Club entry around 12:00 AM</li>
                      <li className="flex items-center"><CameraIcon className="mr-2" /> Photos shared next day</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="meetup">
                <Card className="bg-[#272727] border-[#747474]">
                  <CardHeader>
                    <CardTitle className="text-[#FF652F]">Meet-up Location</CardTitle>
                    <CardDescription className="text-[#747474]">Find us easily in the heart of Budapest</CardDescription>
                  </CardHeader>
                  <CardContent className="text-[#FFE400]">
                    <div className="flex items-center mb-4">
                      <MapPinIcon className="mr-2" />
                      <span>Oktogon, right next to burger king</span>
                    </div>
                    <div className="h-64 bg-[#747474] rounded-lg relative">
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader /> {/* Display the loader while the iframe is loading */}
                        </div>
                      )}
                      <iframe
                        src="https://storage.googleapis.com/maps-solutions-xd1vvgpm4w/locator-plus/a9i3/locator-plus.html"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        onLoad={handleIframeLoad}
                      ></iframe>
                    </div>
                  </CardContent>
                  <div className="mt-4">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#14A76C] text-white px-4 py-2 rounded-full hover:bg-[#FF652F] transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="grid grid-cols-2 gap-4">
              <img src={pubImage1} alt="Pub scene 1" width={300} height={200} className="rounded-lg" />
              <img src={pubImage2} alt="Pub scene 2" width={300} height={200} className="rounded-lg" />
              <img src={pubImage3} alt="Pub scene 3" width={300} height={200} className="rounded-lg" />
              <img src={pubImage4} alt="Pub scene 4" width={300} height={200} className="rounded-lg" />
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section id="pricing" ref={pricingRef} className="mb-12">
          <PayPalScriptProvider options={initialOptions}>
            <section id="pricing" className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-[#FF652F]">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingOptions.map((option, index) => (
                  <Card key={index} className={option.cardStyles.card}>
                    <CardHeader>
                      <CardTitle className={option.cardStyles.title}>{option.title}</CardTitle>
                      <CardDescription className={option.cardStyles.description}>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {option.price === "custom" ? (
                        <div className="space-y-2">
                          <p className={`text-xl font-bold ${option.cardStyles.price}`}>Custom Price (USD)</p>
                          <Input 
                            type="number" 
                            min="1"
                            value={customPrice} 
                            onChange={(e) => setCustomPrice(Number(e.target.value))}
                            className="bg-[#747474] text-[#FFE400]" 
                          />
                        </div>
                      ) : (
                        <>
                          <p className={`text-4xl font-bold ${option.cardStyles.price}`}>USD {option.price}</p>
                          {option.priceNote && (
                            <p className="text-sm text-[#747474]">{option.priceNote}</p>
                          )}
                        </>
                      )}
                      <ul className="mt-4 space-y-2 text-[#FFE400]">
                        {option.perks.map((perk, i) => (
                          <li key={i}>✓ {perk}</li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={option.cardStyles.button}
                        onClick={() => handleCardDetail(option)}
                      >
                        Select
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <ModalComponent
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              selectedPrice={selectedPrice}
              minGroupSize={minGroupSize}
              maxGroupSize={maxGroupSize}
              handlePayment={handleCardDetail}
            />
          </PayPalScriptProvider>
        </section>

        {/* Blog section */}
        <section id="blog" ref={blogsRef} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#FF652F]">Latest from our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-[#272727] border-[#747474]">
                <CardHeader>
                  <CardTitle className="text-[#FFE400]">{post.title}</CardTitle>
                  <CardDescription className="text-[#747474]">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={post.imageUrl} alt="Ruin bar" className="rounded-lg mb-4" />
                  <p className="line-clamp-3 text-[#FFE400]">{post.content}</p>
                </CardContent>
                <CardFooter>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#14A76C] text-white hover:bg-[#FF652F]">
                      Read More
                      <span className="sr-only"> about {post.title}</span>
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" ref={contactRef} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#FF652F]">Contact Us</h2>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.facebook.com/profile.php?id=61566527638561" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="w-8 h-8 text-blue-600" alt="Facebook" />
            </a>
            {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-8 h-8 text-pink-500" alt="Instagram" />
            </a> */}
            <a href="https://wa.me/+36707768045" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="w-8 h-8 text-green-500" alt="WhatsApp" />
            </a>
            <a href="mailto:contact@budapestpubcrawl.club" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="w-8 h-8 text-red-500" alt="Email" />
            </a>
            <a href="tel:+36707768045" target="_blank" rel="noopener noreferrer">
              <FaPhone className="w-8 h-8 text-blue-500" alt="Call Us" />
            </a>
          </div>
          <Card className="max-w-md mx-auto bg-[#272727] border-[#747474]">
            <CardHeader>
              <CardTitle className="text-[#FF652F]">Get in Touch</CardTitle>
              <CardDescription className="text-[#747474]">Have questions? We&apos;re here to help!</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="text-[#FFE400]">Name</Label>
                    <Input required id="name" name="name" placeholder="Your name" className="bg-[#747474] text-[#FFE400] placeholder-[#FFE400] placeholder-opacity-50" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="text-[#FFE400]">Email</Label>
                    <Input required id="email" name="email" placeholder="Your email" type="email" className="bg-[#747474] text-[#FFE400] placeholder-[#FFE400] placeholder-opacity-50" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="message" className="text-[#FFE400]">Message</Label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      placeholder="Your message"
                      className="flex h-20 w-full rounded-md border border-input bg-[#747474] px-3 py-2 text-sm ring-offset-background placeholder:text-[#FFE400] placeholder-opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-[#FFE400]"
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4 w-full bg-[#14A76C] hover:bg-[#FF652F] text-white">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-[#272727] text-[#FFE400] py-8 border-t border-[#747474]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#FF652F]">Budapest Pub Crawl</h3>
              <p className="text-[#747474]">Experience the best nightlife Budapest has to offer!</p>
              <p className="text-[#747474] mt-2">Join us for an unforgettable night as we explore the city&apos; famous ruin pubs, enjoy exclusive drink specials, and meet fellow travelers from around the world.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#FFE400]">Quick as</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollTo(packagesRef)} className="text-[#FFE400] hover:text-[#14A76C]">Tours</button></li>
                <li><button onClick={() => scrollTo(pricingRef)} className="text-[#FFE400] hover:text-[#14A76C]">Pricing</button></li>
                <li><button onClick={() => scrollTo(blogsRef)} className="text-[#FFE400] hover:text-[#14A76C]">Blog</button></li>
                <li><button onClick={() => scrollTo(blogsRef)} className="text-[#FFE400] hover:text-[#14A76C]">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#FFE400]">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61566527638561" target='_black' rel='noopener noreferrer' className="text-[#FFE400] hover:text-[#14A76C]">Facebook</a>
                {/* <a href="#" className="text-[#FFE400] hover:text-[#14A76C]">Instagram</a>
                <a href="#" className="text-[#FFE400] hover:text-[#14A76C]">Twitter</a> */}
              </div>
              <div>
                <h4 className="text-lg font-semibold mt-4 mb-2 text-[#FFE400]">Contact Us</h4>
                <ul className="space-y-2">
                  <li className="text-[#FFE400]">Email us: <a href="mailto:contact@budapestpubcrawl.club" className="hover:text-[#14A76C]">contact@budapestpubcrawl.club</a></li>
                  <li className="text-[#FFE400]">Call us: <a href="tel:+36707768045" className="hover:text-[#14A76C]">+36707768045</a></li>
                </ul>
              </div>
            </div>

          </div>
          <div className="mt-8 text-center text-[#747474]">
            <p>Made with ❤️ by Dev Team</p>
          </div>
          <div className="mt-1 text-center text-[#747474]">
            <p>&copy; 2024 Budapest Pub Crawl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


export default HomeScreen;