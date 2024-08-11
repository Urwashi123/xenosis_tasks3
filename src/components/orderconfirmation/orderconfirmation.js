// OrderConfirmation.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, amount } = location.state || {};

  return (
    <div className="order-confirmation">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your order ID is: {orderId}</p>
      <p>Total Amount: ${amount}</p>
    </div>
  );
};

export default OrderConfirmation;
