import { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Hero = () => {
  // Using context for theme-aware styling if needed in the future
  useContext(ThemeContext);
  const heroRef = useRef(null);
  
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
              <div className="relative z-10 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1">
                <img 
                  src="https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Web Development" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-primary font-semibold mb-1">FEATURED PROJECT</div>
                        <div className="text-white font-bold">Web3 Dashboard Interface</div>
                      </div>
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-white">React</span>
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-white">Web3</span>
                      </div>
                    </div>
                  </div>
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