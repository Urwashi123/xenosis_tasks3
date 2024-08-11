
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
