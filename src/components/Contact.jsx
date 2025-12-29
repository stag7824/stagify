import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  // Using context for theme-aware styling if needed in the future
  useContext(ThemeContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setFormStatus('submitting'); // Add loading state
    console.log('Contact Form submitted:', formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Form submission response:', data);

      if (!response.ok) {
        // Server returned an error response
        const errorMessage = data.error || data.message || 'Server error occurred';
        console.error('Server error:', errorMessage);
        toast.error(errorMessage);
        setFormStatus('error');
        return;
      }

      // Success case
      toast.success('Message sent successfully!');
      setFormStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormStatus(null);
      }, 3000);

    } catch (error) {
      console.error('Network error submitting form:', error);
      toast.error('Failed to send message. Please check your connection and try again.');
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Toast notifications */}
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          duration: 4000,
          style: {
            zIndex: 10000,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }
        }} 
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ready to elevate your digital presence? Contact us today to discuss how our services can help your business grow.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300 cyber-border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 bg-primary text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                  {/* address */}
                {/* <div className="flex items-start">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="mt-1">123 Business Avenue, Tech City, TC 12345</p>
                  </div>
                </div> */}
                <div className="flex items-start">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="mt-1">contact@bugbrew.tech</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="mt-1">+(367) 077-68045</p>
                  </div>
                </div>
              </div>
              {/* connect with us */}
              {/* <div className="mt-12">
                <h4 className="font-semibold mb-4">Connect with us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.98 0a6.9 6.9 0 01-1.33 3.93 6.94 6.94 0 01-5.9 3.3 6.17 6.17 0 01.94-4.13A6.18 6.18 0 0115.34 0zm3.08 8.04a6.3 6.3 0 00-3.14 5.78c0 3.15 1.73 4.64 4.41 4.64.77 0 1.53-.11 1.74-.16v-3.24l-.04.02c-.29.11-1.06.3-1.61.3-.88 0-1.55-.58-1.55-1.83 0-.77.18-1.58.56-2.23.4-.69.9-1.31 1.63-1.28zm-8.71-.71A5.7 5.7 0 007.28 11a5.77 5.77 0 003.9 1.48 1.55 1.55 0 00-.6-1.22 3.2 3.2 0 00-1.66-.41c-1.56 0-3.13.8-3.13 3.95 0 3.93 2.48 3.93 2.69 3.93 1.13 0 1.94-.31 2.42-.99l.21-.43.03-.06.02-.02.71-1.55h-2.66v-3.22h4.86v.85c0 .38-.01.85-.04 1.23l-.04.41-.09.59-.14.58-.21.65-.31.65-.41.64-.54.58a6.5 6.5 0 01-2.37 1.54c-.9.29-1.88.45-2.91.45-4.21 0-7.22-2.9-7.22-7.16 0-3.94 3.13-7.16 6.98-7.16zm10.71-3.82c1.57.4 3.03.93 4.23 1.67 1.19.74 2.13 1.74 2.65 3.16.52 1.41.78 3.14.78 4.83 0 4.11-2.88 7.2-8.15 7.2-1.35 0-2.49-.19-3.32-.48v7.24h-3.84V0h3.53v4.32c.8-.27 1.94-.52 3.59-.52 1.35 0 2.49.19 3.32.48v3.85c-.8-.27-1.94-.52-3.59-.52-1.35 0-2.49.19-3.32.48v4.32c.8-.27 1.94-.52 3.59-.52 1.35 0 2.49.19 3.32.48v-7.24h3.84v7.24c.8-.27 1.94-.52 3.59-.52z" />
                    </svg>
                  </a>
                </div>
              </div> */}
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6 glass-effect p-4 rounded-lg">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white shadow-sm"
                      placeholder="Your full name"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm"></span>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white shadow-sm"
                      placeholder="your.email@example.com"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm"></span>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Subject</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white shadow-sm"
                      placeholder="How can we help you?"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm"></span>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Message</label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white shadow-sm"
                      placeholder="Tell us about your project or inquiry..."
                      required
                    ></textarea>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ${
                      formStatus === 'submitting' 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : formStatus === 'success'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'btn-primary'
                    }`}
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : formStatus === 'success' ? (
                      'Message Sent! ✓'
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  {formStatus === 'success' && (
                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-center">
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}
                  {formStatus === 'error' && (
                    <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-center">
                      There was an error sending your message. Please check the details and try again.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;