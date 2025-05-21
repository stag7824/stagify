import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios'; // Import Axios
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#272727',
    color: '#FFE400',
    border: '1px solid #747474',
    borderRadius: '10px',
    padding: '20px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const ModalComponent = ({ isOpen, onRequestClose, selectedPrice, minGroupSize, maxGroupSize }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    headcount: minGroupSize || 1, // Initialize with minGroupSize
    isAdult: false,
    crawlDate: null,
    addOn: false, // Add-on is selected by default for VIP
  });
  const [orderID, setOrderID] = useState(null); // State to store PayPal order ID
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    if (isOpen) {
      setShowPayment(false);
      setFormData({
        name: '',
        email: '',
        headcount: minGroupSize || 1,
        isAdult: false,
        crawlDate: null,
        addOn: false, // Add-on is selected by default for VIP
      });
      setOrderID(null);
      setError(null);
    }
  }, [isOpen, selectedPrice, minGroupSize]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    // if (date && date <= new Date()) {
    //   alert('If you plan to visit today, please contact the organizer directly.');
    // } 
      // else 
    // {
      setFormData({
        ...formData,
        crawlDate: date,
      });
    // }
  };

  const calculateTotalPrice = () => {
    const headcount = parseInt(formData.headcount, 10) || 0;
    const addOnTotal = formData.addOn ? headcount * 10 : 0;
    const baseTotalPrice = selectedPrice * headcount;
    return parseFloat(baseTotalPrice + addOnTotal).toFixed(2);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.crawlDate || !formData.isAdult) {
      setError('Please fill in all required fields and confirm all attendees are adults.');
      return;
    }

    // Validate headcount
    const headcount = parseInt(formData.headcount, 10);
    if (headcount < minGroupSize || (maxGroupSize && headcount > maxGroupSize)) {
      setError(`Headcount must be between ${minGroupSize} and ${maxGroupSize || 'unlimited'}.`);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const totalAmount = calculateTotalPrice();

      // Send form data and amount to the backend to create an order
      const response = await axios.post(`${import.meta.env.VITE_PUB_CRAWL_API_URL}/paypal/create-order`, {
        amount: totalAmount,
        formData,
      });

      const { id } = response.data; // PayPal order ID
      setOrderID(id);
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

  // Handle payment approval
  const handleApprove = async (data, actions) => {
    setLoading(true);
    setError(null);
    try {
      // Capture the order on the backend
      const response = await axios.post(`${import.meta.env.VITE_PUB_CRAWL_API_URL}/paypal/capture-order`, {
        orderID: data.orderID,
      });

      // Assuming backend handles saving to Firebase and sending email
      alert('Transaction completed successfully! A confirmation email will be sent to you shortly. Thank you for booking with us.');
      onRequestClose(); // Close the modal after successful payment
    } catch (err) {
      console.error('Error capturing order:', err);
      setError('Failed to capture order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = calculateTotalPrice();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Payment Modal"
      ariaHideApp={false} // Add this line if you encounter accessibility warnings
    >
      {/* Close Button */}
      <button
        onClick={onRequestClose}
        className="absolute top-2 right-2 text-2xl text-[#FFE400] hover:text-[#FF652F]"
      >
        &times;
      </button>

      {/* Display loading indicator */}
      {loading && (
        <div className="mb-4 text-center text-[#FFE400]">
          Processing...
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className="mb-4 text-center text-red-500">
          {error}
        </div>
      )}

      {!showPayment ? (
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-2xl mb-4 text-[#FFE400]">Complete Your Payment</h2>
          <p className="mb-4 text-[#FFE400]">You have selected a ticket worth USD{selectedPrice}. Please provide your details below.</p>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name" className="text-[#FFE400]">Name</Label>
              <Input
                required
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="bg-[#1b1b1b] text-[#FFE400] border-[#747474]"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-[#FFE400]">Email</Label>
              <Input
                required
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="bg-[#1b1b1b] text-[#FFE400] border-[#747474]"
              />
            </div>
            <div>
              <Label htmlFor="headcount" className="text-[#FFE400]">
                Headcount (min {minGroupSize}, max {maxGroupSize || 'unlimited'})
              </Label>
              <Input
                required
                id="headcount"
                name="headcount"
                type="number"
                min={minGroupSize}
                max={maxGroupSize || undefined}
                value={formData.headcount}
                onChange={handleChange}
                placeholder="Number of people"
                className="bg-[#1b1b1b] text-[#FFE400] border-[#747474]"
              />
            </div>
            {/* Add-On Checkbox */}
           {/* {selectedPrice !== 23.99 && ( */}
              {/* <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="addOn"
                  name="addOn"
                  checked={formData.addOn}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FFE400] border-gray-300 rounded"
                />
                <Label htmlFor="addOn" className="text-[#FFE400]">
                  Add unlimited drinks for €10 per person (selected bar only)
                </Label>
              </div> */}
            {/* )} */}
            {/* {selectedPrice == 23.99 && ( */}
              {/* <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="addOn"
                  name="addOn"
                  checked={true}
                  disabled
                  className="h-4 w-4 text-[#FFE400] border-gray-300 rounded"
                />
                <Label htmlFor="addOn" className="text-[#FFE400]">
                  *Unlimited drink addOn is included in the VIP ticket
                </Label>
              </div> */}
            {/* )} */}
            {/* Crawl Date Picker */}
            <div className="flex items-center space-x-2">
              <Label htmlFor="crawlDate" className="text-[#FFE400]">Crawl Date</Label>
              <DatePicker
                selected={formData.crawlDate}
                onChange={handleDateChange}
                minDate={new Date()}
                placeholderText="Select a date"
                className="w-full px-4 py-2 border rounded-md bg-[#1b1b1b] text-[#FFE400] border-[#747474]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAdult"
                name="isAdult"
                checked={formData.isAdult}
                onChange={handleChange}
                className="h-4 w-4 text-[#FFE400] border-gray-300 rounded"
              />
              <Label htmlFor="isAdult" className="text-[#FFE400]">I confirm that all attendees are adults.</Label>
            </div>
          </div>
          <p className="mt-4 text-[#FFE400]">Total Price: USD{totalPrice}</p>
          <Button type="submit" className="mt-4 w-full bg-[#14A76C] hover:bg-[#FF652F] text-white" disabled={loading}>
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </form>
      ) : (
        <>
          <button onClick={handleBack} className="mb-4 text-[#FF652F]">
            &larr; Back
          </button>
          <h2 className="text-2xl mb-4 text-[#FFE400]">Complete Your Payment</h2>
          <p className="mb-4 text-[#FFE400]">You have selected a ticket worth USD{totalPrice}. Please proceed with the payment below.</p>
          <div className="mt-6">
            {orderID && (
              <PayPalButtons
                // Force the buttons to re-render when orderID changes
                key={orderID}
                style={{ layout: 'vertical', color: 'white' }}
                createOrder={(data, actions) => {
                  // Use the orderID created on the backend
                  return orderID;
                }}
                onApprove={handleApprove}
                onError={(err) => {
                  console.error('PayPal Buttons Error:', err);
                  setError('An error occurred with the payment process. Please try again.');
                }}
              />
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default ModalComponent;