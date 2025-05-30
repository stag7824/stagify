import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import { useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Header from "./components/Header";
import OfferBanner from "./components/OfferBanner";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import Packages from "./components/Packages";
import Contact from "./components/Contact";
import TechStack from "./components/TechStack";
import {
  initScrollAnimations,
  addAnimationClasses,
  initCounterAnimations,
} from "./utils/scrollAnimations";

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

  // PayPal configuration options
  const getPayPalClientId = () => {
    const isDevelopment = import.meta.env.VITE_ENV === "production";
    return isDevelopment
      ? import.meta.env.VITE_PAYPAL_CLIENT_LIVE_ID
      : import.meta.env.VITE_PAYPAL_CLIENT_ID;
  };

  const paypalOptions = {
    "client-id": getPayPalClientId() || "test", // Use development or live client ID based on environment
    currency: "USD",
    intent: "capture",
  };

  return (
    <ThemeProvider>
      <PayPalScriptProvider options={paypalOptions}>
        <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
          {import.meta.env.VITE_SHOW_BANNER === 'true' && <OfferBanner />}
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
              <p>
                &copy; {new Date().getFullYear()} Stagify. All rights reserved.
              </p>
              <p className="mt-2 text-gray-400 text-sm">
                Turning your ideas into high-impact digital solutions
              </p>
            </div>
          </footer>
        </div>
      </PayPalScriptProvider>
    </ThemeProvider>
  );
}

export default App;
