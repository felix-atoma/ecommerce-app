// src/components/OrderSummaryModal.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import calculateTotals from '../utils/calculateTotals';

const OrderSummaryModal = ({ isOpen, onClose }) => {
  const { cartItems } = useCart();
  if (!isOpen) return null;

  const { productTotal, shipping, vat, grandTotal } = calculateTotals(cartItems);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p className="mb-6">You will receive an email confirmation shortly.</p>

        <div className="text-left mb-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <span>{item.name} x{item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="text-left font-semibold">
          <p>Product Total: ${productTotal}</p>
          <p>Shipping: ${shipping}</p>
          <p>VAT (20%): ${vat}</p>
          <p className="mt-2 text-xl">Grand Total: ${grandTotal}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryModal;