import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← Import navigate hook
import ProductCart from '../components/ProductCard';

const SHIPPING_COST = 50;
const VAT_RATE = 0.2;

const Cart = () => {
  const navigate = useNavigate(); // ← Initialize navigation hook

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = id => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const productTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const vatAmount = productTotal * VAT_RATE;
  const total = productTotal + vatAmount + SHIPPING_COST;

  const handleCheckout = () => {
    navigate('/checkout'); // ← Navigate to the checkout route
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <ProductCart
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      {cartItems.length > 0 && (
        <div className="mt-8 border-t pt-6 space-y-3 max-w-md ml-auto">
          <div className="flex justify-between">
            <span>Product Total:</span>
            <span>${productTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Cost:</span>
            <span>${SHIPPING_COST.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT (20%):</span>
            <span>${vatAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full mt-4 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition rounded"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
