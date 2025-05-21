import { useState } from 'react';
import { termsAndConditions, privacyPolicy } from '../data/termsAndConditions';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';

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
        alert('Error creating payment. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      handleNextStep();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
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
                
                {showPayPal && paypalOrderId && (
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">Complete Payment with PayPal</h4>
                    
                    {loading ? (
                      <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">Processing...</span>
                      </div>
                    ) : (
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={() => paypalOrderId}
                        onApprove={async (data, actions) => {
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
                            
                            // Show success message and close form
                            alert("Payment successful! Thank you for your order.");
                            onClose();
                          } catch (error) {
                            console.error("Error capturing PayPal order:", error);
                            alert("There was a problem with your payment. Please try again.");
                          } finally {
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
              disabled={step === 3 && showPayPal}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                step === 3 ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary-dark'
              } ${(step === 3 && showPayPal) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {step === 1 && 'Continue to Terms'}
              {step === 2 && 'Review Information'}
              {step === 3 && (showPayPal ? 'Processing Payment...' : 'Submit & Proceed to Payment')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageForm;