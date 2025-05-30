import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const { currentTheme, setCurrentTheme, themes, effectiveTheme, SYSTEM_THEME, isSystemTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if banner should be shown
  const showBanner = import.meta.env.VITE_SHOW_BANNER === 'true';
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <header className={`sticky ${showBanner ? 'top-16' : 'top-0'} z-40 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <img src="/stagify-logo.svg" alt="Stagify Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient-shift bg-[length:200%_auto]">Stagify</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#services" className="nav-link" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
          }}>Services</a>
          <a href="#packages" className="nav-link" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#packages').scrollIntoView({ behavior: 'smooth' });
          }}>Packages</a>
          <a href="#testimonials" className="nav-link" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#testimonials').scrollIntoView({ behavior: 'smooth' });
          }}>Testimonials</a>
          <a href="#stats" className="nav-link" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#stats').scrollIntoView({ behavior: 'smooth' });
          }}>Stats</a>
          <a href="#contact" className="nav-link" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
          }}>Contact</a>
        </nav>
        
        {/* Mobile Navigation */}
        <div 
          className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        
        <nav className={`fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 z-50 shadow-2xl p-6 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col space-y-4">
            <a href="#services" className="nav-link block py-2" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}>Services</a>
            <a href="#packages" className="nav-link block py-2" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#packages').scrollIntoView({ behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}>Packages</a>
            <a href="#testimonials" className="nav-link block py-2" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#testimonials').scrollIntoView({ behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}>Testimonials</a>
            <a href="#stats" className="nav-link block py-2" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#stats').scrollIntoView({ behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}>Stats</a>
            <a href="#contact" className="nav-link block py-2" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}>Contact</a>
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button 
              onClick={() => setCurrentTheme(currentTheme === SYSTEM_THEME ? (effectiveTheme === 'light' ? 'dark' : 'light') : (currentTheme === 'light' ? 'dark' : 'light'))}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Theme settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                {/* For system theme, show icon based on the effective theme */}
                {isSystemTheme && effectiveTheme === 'light' && (
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                )}
                {isSystemTheme && effectiveTheme === 'dark' && (
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                )}
                {/* For manually selected themes */}
                {!isSystemTheme && currentTheme === 'light' && <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />}
                {!isSystemTheme && currentTheme === 'dark' && <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />}
                {!isSystemTheme && currentTheme === 'purple' && <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />}
                {!isSystemTheme && currentTheme === 'green' && <path fillRule="evenodd" d="M4.382 4.968a1 1 0 011.414 0l4.243 4.243a1 1 0 01-1.414 1.414L4.382 6.382a1 1 0 010-1.414z" clipRule="evenodd" />}
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-20">
              {/* System Theme Option */}
              <button
                key={SYSTEM_THEME}
                onClick={() => setCurrentTheme(SYSTEM_THEME)}
                className={`block w-full text-left px-4 py-2 text-sm ${isSystemTheme ? 'bg-gray-100 dark:bg-gray-700 text-primary' : 'text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                  </span>
                  System Default {isSystemTheme && <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({effectiveTheme})</span>}
                </div>
              </button>
              
              {/* Other Theme Options */}
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme.id)}
                  className={`block w-full text-left px-4 py-2 text-sm ${currentTheme === theme.id ? 'bg-gray-100 dark:bg-gray-700 text-primary' : 'text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {theme.icon === 'sun' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {theme.icon === 'moon' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      )}
                      {theme.icon === 'palette' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                        </svg>
                      )}
                      {theme.icon === 'leaf' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.382 4.968a1 1 0 011.414 0l4.243 4.243a1 1 0 01-1.414 1.414L4.382 6.382a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                    {theme.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;