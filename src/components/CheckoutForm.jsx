// src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  country: ''
};

const CheckoutForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { cartItems, clearCart } = useCart();

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = 'Required';
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSuccess();
    clearCart();
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      {Object.keys(initialState).map(field => (
        <div key={field}>
          <label className="block capitalize font-semibold mb-1">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
      ))}
      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 w-full"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
