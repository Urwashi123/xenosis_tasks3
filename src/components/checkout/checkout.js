// Checkout.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { data: clientSecret } = await axios.post('/create-payment-intent', {
      amount: calculateTotal(cartItems),
    });

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error('Payment error:', error);
      setLoading(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        // Handle successful payment
        // Clear cart, show confirmation, etc.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
