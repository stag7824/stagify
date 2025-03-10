import { useContext } from 'react';
import { testimonials } from '../data/services';
import { ThemeContext } from '../context/ThemeContext';

const Testimonials = () => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 relative transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="pt-4">
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-4">
                    {testimonial.avatar === 'avatar1' && (
                      <span className="text-xl font-bold text-primary">{testimonial.name.charAt(0)}</span>
                    )}
                    {testimonial.avatar === 'avatar2' && (
                      <span className="text-xl font-bold text-primary">{testimonial.name.charAt(0)}</span>
                    )}
                    {testimonial.avatar === 'avatar3' && (
                      <span className="text-xl font-bold text-primary">{testimonial.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;