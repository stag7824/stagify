import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Stats from './components/Stats'
import Packages from './components/Packages'
import Contact from './components/Contact'
import TechStack from './components/TechStack'
import { initScrollAnimations, addAnimationClasses, initCounterAnimations } from './utils/scrollAnimations'

function App() {
  // Initialize scroll animations when the app loads
  useEffect(() => {
    // Add animation classes to elements
    addAnimationClasses();
    
    // Initialize the intersection observer for scroll animations
    const observer = initScrollAnimations();
    
    // Initialize counter animations for statistics
    initCounterAnimations();
    
    // Clean up the observer when component unmounts
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <Services />
          <Packages />
          <TechStack />
          <Testimonials />
          <Stats />
          <Contact />
        </main>
        <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} TechServices. All rights reserved.</p>
            <p className="mt-2 text-gray-400 text-sm">Designed and developed with modern technologies</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
