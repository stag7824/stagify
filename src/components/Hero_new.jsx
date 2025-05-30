import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// Import portfolio images
import portfolio1 from '../assets/images/1.png';
import portfolio2 from '../assets/images/2.png';
import portfolio3 from '../assets/images/3.png';
import portfolio4 from '../assets/images/4.png';
import portfolio5 from '../assets/images/5.png';
import portfolio6 from '../assets/images/6.png';
import portfolio7 from '../assets/images/7.png';

const Hero = () => {
  // Using context for theme-aware styling if needed in the future
  useContext(ThemeContext);
  const heroRef = useRef(null);
  
  // Portfolio slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Portfolio data with compelling descriptions for non-IT clients
  const portfolioItems = [
    {
      image: portfolio1,
      title: "Modern E-Commerce Store",
      description: "Boosted client sales by 300% with mobile-first design",
      tags: ["E-Commerce", "Mobile"]
    },
    {
      image: portfolio2,
      title: "Professional Business Website",
      description: "Increased customer inquiries by 250% in 3 months",
      tags: ["Business", "SEO"]
    },
    {
      image: portfolio3,
      title: "Restaurant Online Ordering",
      description: "Generated $50K+ monthly revenue through online orders",
      tags: ["Restaurant", "Orders"]
    },
    {
      image: portfolio4,
      title: "Real Estate Platform",
      description: "Sold 40% more properties with virtual tours",
      tags: ["Real Estate", "Virtual Tours"]
    },
    {
      image: portfolio5,
      title: "Healthcare Portal",
      description: "Reduced appointment no-shows by 60%",
      tags: ["Healthcare", "Booking"]
    },
    {
      image: portfolio6,
      title: "Corporate Dashboard",
      description: "Streamlined operations saving 20 hours/week",
      tags: ["Corporate", "Efficiency"]
    },
    {
      image: portfolio7,
      title: "Mobile App Interface",
      description: "Achieved 4.8★ rating with 50K+ downloads",
      tags: ["Mobile App", "UX"]
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [portfolioItems.length]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const heroRect = heroRef.current.getBoundingClientRect();
      const mouseX = e.clientX - heroRect.left;
      const mouseY = e.clientY - heroRect.top;
      
      const xPos = (mouseX / heroRect.width - 0.5) * 20;
      const yPos = (mouseY / heroRect.height - 0.5) * 20;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el, index) => {
        const speed = index % 2 === 0 ? 0.03 : 0.02;
        el.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section ref={heroRef} className="py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Web3 Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px] dark:bg-grid-white/[0.05]"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 opacity-10 rounded-full filter blur-3xl animate-float-slow parallax-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 opacity-10 rounded-full filter blur-3xl animate-float parallax-element"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary opacity-10 rounded-full filter blur-3xl animate-pulse-slow parallax-element"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary opacity-5 rounded-full filter blur-3xl animate-float-fast parallax-element"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="relative">
              <div className="absolute -left-6 -top-6 w-20 h-20 bg-primary/20 rounded-full filter blur-xl animate-pulse-slow"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white relative">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-gradient-shift bg-[length:200%_auto]">Web & App</span> <br />
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-secondary animate-gradient-shift bg-[length:200%_auto]">Development</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              We turn your ideas into high-impact websites and mobile apps that help your business succeed online and attract more customers.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#services" className="btn-primary group" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
              }}>
                <span className="mr-2">Explore Services</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#packages" className="btn-secondary group" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#packages').scrollIntoView({ behavior: 'smooth' });
              }}>
                <span className="mr-2">View Packages</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </a>
            </div>
            
            <div className="mt-12 flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900">JS</div>
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900">R</div>
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900">V</div>
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900">F</div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Powered by modern frameworks</span>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="cyber-border">
              <div className="relative z-10 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] group">
                {/* Portfolio Slideshow */}
                <div className="relative h-96 bg-gray-100 dark:bg-gray-800">
                  {portfolioItems.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                        <div className="p-6 w-full">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="text-xs text-yellow-400 font-semibold mb-1 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                CLIENT SUCCESS STORY
                              </div>
                              <div className="text-white font-bold text-lg mb-1">{item.title}</div>
                              <div className="text-green-400 font-semibold text-sm mb-2">{item.description}</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {item.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-white font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Slideshow indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {portfolioItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Navigation arrows */}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Previous slide"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % portfolioItems.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Next slide"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full filter blur-2xl animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/30 rounded-full filter blur-2xl animate-float-slow"></div>
            
            {/* Floating elements */}
            <div className="absolute -right-4 top-1/4 w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center animate-float-fast parallax-element">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute -left-6 bottom-1/3 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center animate-float parallax-element">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
