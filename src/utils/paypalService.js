import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Creates a PayPal order
 * @param {number} amount - The amount to charge
 * @param {object} formData - Customer information
 * @param {object} packageDetails - Details about the package being purchased
 * @returns {Promise} - Promise resolving to the PayPal order data
 */
export const createPayPalOrder = async (amount, formData, packageDetails) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/paypal/create-order`, {
      amount,
      formData,
      packageDetails
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw error;
  }
};

/**
 * Captures a PayPal order after approval
 * @param {string} orderID - The PayPal order ID to capture
 * @param {object} formData - Customer information
 * @param {object} packageDetails - Details about the package being purchased
 * @returns {Promise} - Promise resolving to the capture response
 */
export const capturePayPalOrder = async (orderID, formData, packageDetails) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/paypal/capture-order`, {
      orderID,
      formData,
      packageDetails
    });
    
    return response.data;
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    throw error;
  }
};
