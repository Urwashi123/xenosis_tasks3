import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { CartProvider } from './CartContext';
import ProductList from './components/ProductList';
import Cart from './components/cart';
import Checkout from './components/checkout';
import OrderConfirmation from './components/orderconfirmation';
import './components/styles.scss';

const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 29.99 },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 39.99 },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 49.99 },
];

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ProductList products={products} />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
