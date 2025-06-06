import React from 'react';
import CartItem from './CartItem';

const ProductCart = ({ cartItems, updateQuantity, removeFromCart }) => {
  if (cartItems.length === 0) {
    return <p className="p-4">Your cart is empty.</p>;
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
      <div className="mt-6 text-right font-bold text-lg">
        Subtotal: ${subtotal.toFixed(2)}
      </div>
    </div>
  );
};

export default ProductCart;
