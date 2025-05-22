import { useState } from 'react';
import { termsAndConditions, privacyPolicy } from '../data/termsAndConditions';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// PayPal Loader Animation Component
const PayPalLoader = () => (
  <div className="flex flex-col justify-center items-center py-8">
    <div className="relative h-20 w-20">
      {/* Outer spinning ring */}
      <div className="absolute inset-0 border-4 border-t-primary border-r-secondary border-b-primary border-l-secondary rounded-full animate-spin"></div>
      {/* Inner pulsing circle */}
      <div className="absolute inset-4 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse-slow opacity-70"></div>
      {/* Center dot */}
      <div className="absolute inset-8 bg-white dark:bg-gray-800 rounded-full shadow-inner"></div>
    </div>
    <p className="mt-6 text-gray-700 dark:text-gray-300 font-medium">Loading PayPal...</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we connect to PayPal's secure payment system</p>
  </div>
);

// Success Message Component
const SuccessMessage = ({ packageName, onClose }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl border border-primary/20 animate-fade-in-up">
    <div className="flex flex-col items-center text-center">
      {/* Success checkmark with animation */}
      <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 scale-in-center">
        <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" className="animate-draw-check"></path>
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
      
      <div className="bg-gradient-to-r from-primary to-secondary p-px rounded-lg w-24 mb-4">
        <div className="h-1 bg-primary rounded-lg"></div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
        Thank you for purchasing the <span className="font-semibold text-primary">{packageName}</span> package. We've received your payment and will be in touch shortly.
      </p>
      
      <div className="w-full p-5 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-lg mb-7 border border-green-100 dark:border-green-800/30">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="block text-green-600 dark:text-green-400 font-medium mb-1">Next Steps</span>
          A confirmation email with your invoice and further instructions has been sent to your email address. Our team will contact you within 24 hours.
        </p>
      </div>
      
      <button
        onClick={onClose}
        className="px-10 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        Continue
      </button>
    </div>
  </div>
);

const PackageForm = ({ packageData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectDescription: '',
    budget: packageData?.price || '',
    timeline: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Form, 2: Terms, 3: Confirmation
  const [loading, setLoading] = useState(false); // Loading state for PayPal
  const [paypalOrderId, setPaypalOrderId] = useState(null); // PayPal order ID
  const [showPayPal, setShowPayPal] = useState(false); // Toggle PayPal buttons
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Payment success state

  // Get PayPal script loading status
  const [{ isPending }] = usePayPalScriptReducer();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateForm()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (!formData.termsAccepted) {
        setErrors({ ...errors, termsAccepted: 'You must accept the terms and conditions' });
      } else {
        setStep(3);
      }
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 3) {
      try {
        setLoading(true);
        
        // Create a PayPal order through your backend
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000'}/paypal/create-order`, {
          amount: parseFloat(formData.budget.replace(/[^0-9.]/g, '')), // Convert price string to number
          formData,
          packageDetails: {
            name: packageData?.name,
            price: packageData?.price
          }
        });
        
        // Store the order ID and show the PayPal buttons
        setPaypalOrderId(response.data.id);
        setShowPayPal(true);
        
      } catch (error) {
        console.error('Error creating PayPal order:', error);
        toast.error('Error creating payment. Please try again.', {
          duration: 6000,
          position: "top-center",
          style: {
            background: "#ef4444",
            color: "#fff",
            fontWeight: "bold"
          },
          icon: "❌"
        });
      } finally {
        setLoading(false);
      }
    } else {
      handleNextStep();
    }
  };

  // Handle showing the success message when payment is successful 
  if (paymentSuccess) {
    // Force a toast notification here as well for redundancy
    setTimeout(() => {
      toast.success("Payment completed successfully!");
    }, 200);
    
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4"
        // This prevents clicks outside the modal from accidentally closing it
        onClick={(e) => e.stopPropagation()} 
      >
        <SuccessMessage 
          packageName={packageData?.name}
          onClose={() => {
            setPaymentSuccess(false);
            onClose();
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
        {/* Toast container with higher z-index to ensure visibility */}
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {packageData?.name} Package
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{packageData?.price}</p>
        </div>

        {/* Progress indicator */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                1
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Information</div>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                2
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Terms</div>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                3
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Confirm</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Description *</label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  rows="4"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.projectDescription ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Please describe your project requirements"
                ></textarea>
                {errors.projectDescription && <p className="mt-1 text-sm text-red-500">{errors.projectDescription}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Timeline (Optional)</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="3-4 weeks">3-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget</label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-h-[400px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Terms and Conditions</h3>
                
                <div className="prose prose-sm dark:prose-invert">
                  {termsAndConditions.map((term) => (
                    <div key={term.id} className="mb-4">
                      <h4><b>{term.id}. {term.title}</b></h4>
                      <p>{term.content}</p>
                    </div>
                  ))}
                  
                  <h3 className="text-lg font-semibold my-6 text-gray-900 dark:text-white">Privacy Policy</h3>
                  
                  {privacyPolicy.map((policy) => (
                    <div key={policy.id} className="mb-4">
                      <h4><b>{policy.id}. {policy.title}</b></h4>
                      <p>{policy.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  I agree to the terms and conditions
                </label>
              </div>
              {errors.termsAccepted && <p className="mt-1 text-sm text-red-500">{errors.termsAccepted}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Review Your Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="text-gray-900 dark:text-white">{formData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-900 dark:text-white">{formData.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                      <p className="text-gray-900 dark:text-white">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</p>
                      <p className="text-gray-900 dark:text-white">{formData.company || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Project Description</p>
                    <p className="text-gray-900 dark:text-white">{formData.projectDescription}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Timeline</p>
                      <p className="text-gray-900 dark:text-white">{formData.timeline || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget</p>
                      <p className="text-gray-900 dark:text-white">{formData.budget}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    By clicking "Submit & Proceed to Payment", you confirm that all the information provided is correct and you agree to proceed with the selected package.
                  </p>
                </div>
                
                {loading && !showPayPal && (
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">Preparing Payment</h4>
                    <PayPalLoader />
                  </div>
                )}
                
                {showPayPal && paypalOrderId && (
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">Complete Payment with PayPal</h4>
                    
                    {isPending ? (
                      <PayPalLoader />
                    ) : (
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={() => paypalOrderId}
                        onApprove={async (data) => {
                          setLoading(true);
                          try {
                            // Capture the funds from the transaction
                            const response = await axios.post(
                              `${import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000'}/paypal/capture-order`,
                              {
                                orderID: data.orderID,
                                formData,
                                packageDetails: {
                                  name: packageData?.name,
                                  price: packageData?.price
                                }
                              }
                            );
                            
                            // Call the onSubmit function with form data and payment details
                            if (onSubmit) {
                              onSubmit({
                                ...formData,
                                paymentDetails: response.data
                              });
                            }
                            
                            // Show success message
                            setLoading(false);
                            
                            // Set payment success state and show toast
                            setPaymentSuccess(true);
                            
                            // Display toast notification
                            toast.success("Payment completed successfully!", {
                              duration: 6000,
                              position: "top-center",
                              style: {
                                background: "#10b981",
                                color: "#fff",
                                fontWeight: "bold"
                              },
                              icon: "🎉"
                            });
                            
                            // Log to make sure this is being triggered
                            console.log("Payment successful, showing success message");
                          } catch (error) {
                            console.error("Error capturing PayPal order:", error);
                            toast.error("There was a problem with your payment. Please try again.", {
                              duration: 6000,
                              position: "top-center",
                              style: {
                                background: "#ef4444",
                                color: "#fff",
                                fontWeight: "bold"
                              },
                              icon: "❌"
                            });
                            setLoading(false);
                          }
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
            )}
            
            <button
              type="submit"
              disabled={step === 3 && (loading || showPayPal)}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                step === 3 ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary-dark'
              } ${(step === 3 && (loading || showPayPal)) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {step === 1 && 'Continue to Terms'}
              {step === 2 && 'Review Information'}
              {step === 3 && (loading ? 'Processing...' : showPayPal ? 'Payment in Progress...' : 'Submit & Proceed to Payment')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageForm;