import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import PackageForm from './PackageForm';

const Packages = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses and startups looking to establish their digital presence.',
      price: '$1,499',
      features: [
        'Responsive Website Design',
        'Up to 5 Pages',
        'Basic SEO Setup',
        'Contact Form Integration',
        'Mobile Optimization',
        '1 Month Support',
      ],
      cta: 'Get Started',
      popular: false,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Comprehensive solution for growing businesses with advanced functionality needs.',
      price: '$3,999',
      features: [
        'Custom Web Application',
        'Progressive Web App (PWA)',
        'CMS Integration',
        'E-commerce Functionality',
        'Advanced Analytics',
        'User Authentication',
        'Payment Gateway Integration',
        '3 Months Support',
      ],
      cta: 'Go Professional',
      popular: true,
      color: 'from-primary to-purple-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Full-scale digital transformation with custom web and mobile app development.',
      price: '$8,999+',
      features: [
        'Custom Web & Mobile Apps',
        'Native iOS & Android Apps',
        'Advanced Backend Architecture',
        'API Development & Integration',
        'Database Design & Optimization',
        'User Testing & QA',
        'Scalable Cloud Infrastructure',
        'CI/CD Pipeline Setup',
        '6 Months Priority Support',
        'Dedicated Project Manager',
      ],
      cta: 'Contact Us',
      popular: false,
      color: 'from-secondary to-pink-600'
    }
  ];

  return (
    <section id="packages" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      {/* Web3 Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 opacity-10 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 opacity-10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary opacity-5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] dark:bg-grid-white/[0.05]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Service Packages</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose the perfect development package tailored to your business needs and technical requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`package-card relative ${pkg.popular ? 'package-card-popular transform md:-translate-y-4' : ''}`}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              {/* Glow effect on hover */}
              <div 
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${pkg.color} opacity-0 transition-opacity duration-300 ${hoveredPackage === pkg.id ? 'opacity-20' : ''}`}
              ></div>
              
              {pkg.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-6 py-2 bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-bold rounded-full shadow-lg z-20 whitespace-nowrap overflow-visible">
                  Most Popular
                </div>
              )}
              
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{pkg.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[4rem]">{pkg.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{pkg.price}</span>
                  {pkg.id !== 'enterprise' && <span className="text-gray-500 dark:text-gray-400 ml-2">one-time</span>}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setSelectedPackage(pkg)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-primary to-purple-600' 
                      : 'bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                >
                  {pkg.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Need a custom solution? We can create a tailored package just for you.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Request Custom Quote
          </a>
        </div>
      </div>

      {/* Package Form Modal */}
      {selectedPackage && (
        <PackageForm 
          packageData={selectedPackage} 
          onClose={() => setSelectedPackage(null)} 
          onSubmit={(formData) => {
            console.log('Form submitted:', formData);
            // Here you would typically send the data to your backend
            setSelectedPackage(null);
          }} 
        />
      )}
    </section>
  );
};

export default Packages;