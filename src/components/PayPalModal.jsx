import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { createPayPalOrder, capturePayPalOrder } from '../utils/paypalService';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    maxHeight: '90vh',
    overflowY: 'auto',
    maxWidth: '500px',
    width: '100%'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000
  },
};

// Ensure Modal is accessible
Modal.setAppElement('#root');

const PayPalModal = ({ isOpen, onRequestClose, formData, packageData }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Parse price from string (e.g., "$1,200" -> 1200)
  const getNumericPrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  };

  const price = getNumericPrice(packageData?.price);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowPayment(false);
      setOrderID(null);
      setError(null);
    }
  }, [isOpen]);

  // Initialize payment process 
  const handleInitiatePayment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Create a PayPal order via backend API
      const response = await createPayPalOrder(price, formData, {
        name: packageData?.name,
        price: packageData?.price
      });
      
      // Set the order ID and show the payment screen
      setOrderID(response.id);
      setShowPayment(true);
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowPayment(false);
    setOrderID(null);
  };

  // Handle successful payment approval
  const handleApprove = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      // Send capture request to backend API
      const response = await capturePayPalOrder(data.orderID, formData, {
        name: packageData?.name,
        price: packageData?.price,
        amount: price
      });

      if (response.success) {
        // Show success message and close modal
        alert('Transaction completed successfully! A confirmation email will be sent to you shortly. Thank you for your payment.');
        onRequestClose();
      } else {
        setError('Payment process completed but transaction was not successful. Please contact support.');
      }
    } catch (err) {
      console.error('Error capturing order:', err);
      setError('Failed to capture order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Payment Modal"
      className="dark:bg-gray-800 dark:text-white"
    >
      {/* Close button */}
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Loading indicator */}
      {loading && (
        <div className="mb-4 text-center text-primary">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-2">Processing...</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      {!showPayment ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Proceed to Payment</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            You are about to make a payment of <span className="font-bold">{packageData?.price}</span> for the <span className="font-bold">{packageData?.name}</span> package.
          </p>
          
          {/* Review information */}
          <div className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Order Summary</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><span className="font-medium">Name:</span> {formData.fullName}</li>
              <li><span className="font-medium">Email:</span> {formData.email}</li>
              <li><span className="font-medium">Package:</span> {packageData?.name}</li>
              <li><span className="font-medium">Total Amount:</span> {packageData?.price}</li>
            </ul>
          </div>
          
          <button
            onClick={handleInitiatePayment}
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {loading ? 'Processing...' : 'Proceed to PayPal'}
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleBack} className="mb-4 text-primary hover:text-primary-dark">
            &larr; Back
          </button>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Complete Payment</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Please complete your payment of {packageData?.price} using PayPal below.
          </p>
          
          <div className="mt-6">
            {orderID && (
              <PayPalButtons
                key={orderID}
                style={{ 
                  layout: 'vertical',
                  color: 'blue'
                }}
                createOrder={() => orderID}
                onApprove={handleApprove}
                onError={(err) => {
                  console.error('PayPal Buttons Error:', err);
                  setError('An error occurred with the payment process. Please try again.');
                }}
              />
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PayPalModal;
