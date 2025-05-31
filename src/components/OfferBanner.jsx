import { useState, useEffect } from 'react';

const OfferBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer for demo purposes
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white shadow-lg animate-pulse-subtle">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-300 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-sm md:text-base">LIMITED TIME OFFER!</span>
            </div>
            <div className="hidden md:block text-sm">
              <span className="font-medium">🚀 Get Your Business Online Today - </span>
              <span className="font-bold">50% OFF Professional Websites!</span>
              <span className="ml-2 bg-yellow-400 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                SAVE $750+
              </span>
            </div>
            <div className="md:hidden text-xs">
              <span className="font-bold">50% OFF Websites!</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Countdown Timer */}
            {/* <div className="flex items-center space-x-1 bg-black/20 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-mono font-bold">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div> */}
            
            <a 
              href="#packages" 
              className="bg-white text-red-600 px-4 py-1 rounded-full text-sm font-bold hover:bg-yellow-100 transition-colors duration-300 transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Claim Now!
            </a>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close offer banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
