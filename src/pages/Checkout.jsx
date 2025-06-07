import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const {
    cart = [],
    removeFromCart,
    updateQuantity,
    cartTotal = 0,
    vat = 0,
    shipping = 50,
    grandTotal = 0,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    paymentMethod: 'e-money',
    eMoneyNumber: '',
    eMoneyPIN: '',
  });

  const [errors, setErrors] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'email', 'phone', 'address', 'zip', 'city', 'country'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Required field';
      }
    });

    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.paymentMethod === 'e-money' && !formData.eMoneyNumber) {
      newErrors.eMoneyNumber = 'Required field';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Order submitted:', { ...formData, cart });
      clearCart();
      setOrderConfirmed(true);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-white rounded-lg p-8 shadow-md">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold mb-4">Thank you for your order</h1>
          <p className="text-gray-600 mb-6">
            You will receive an email confirmation shortly.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg flex-grow">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <img 
                        src={item.image || '/placeholder-product.jpg'} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded mr-4"
                        onError={(e) => {
                          e.target.src = '/placeholder-product.jpg';
                        }}
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">${item.price?.toFixed(2) || '0.00'}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">x{item.quantity || 1}</p>
                  </div>
                ))
              ) : (
                <p>No items in your order</p>
              )}
            </div>
            
            <div className="bg-gray-900 text-white p-6 rounded-lg md:w-1/3">
              <h3 className="uppercase text-gray-400 mb-4">Grand Total</h3>
              <p className="text-lg font-bold">${grandTotal.toFixed(2)}</p>
            </div>
          </div>
          
          <Link
            to="/"
            className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Link to="/" className="text-gray-500 hover:text-orange-500 mb-8 inline-block">
        Go Back
      </Link>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          
          <div className="mb-8">
            <h3 className="text-orange-500 uppercase text-sm font-bold mb-4">Billing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Alexei Ward"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="alexei@mail.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+1 202-555-0136"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-orange-500 uppercase text-sm font-bold mb-4">Shipping Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="1137 Williams Avenue"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="10001"
                  />
                  {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="New York"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="United States"
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-orange-500 uppercase text-sm font-bold mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Payment Method</p>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="e-money"
                      checked={formData.paymentMethod === 'e-money'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    e-Money
                  </label>
                  
                  <label className="flex items-center p-3 border rounded cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Cash on Delivery
                  </label>
                </div>
              </div>
              
              {formData.paymentMethod === 'e-money' ? (
                <div>
                  <div className="mb-4">
                    <label htmlFor="eMoneyNumber" className="block text-sm font-medium mb-1">
                      e-Money Number
                    </label>
                    <input
                      type="text"
                      id="eMoneyNumber"
                      name="eMoneyNumber"
                      value={formData.eMoneyNumber}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded ${errors.eMoneyNumber ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="238521993"
                    />
                    {errors.eMoneyNumber && <p className="text-red-500 text-sm mt-1">{errors.eMoneyNumber}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="eMoneyPIN" className="block text-sm font-medium mb-1">
                      e-Money PIN
                    </label>
                    <input
                      type="text"
                      id="eMoneyPIN"
                      name="eMoneyPIN"
                      value={formData.eMoneyPIN}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="6891"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full mr-4">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-6">Summary</h3>
          
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={item.image || '/placeholder-product.jpg'} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded mr-4"
                        onError={(e) => {
                          e.target.src = '/placeholder-product.jpg';
                        }}
                      />
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-gray-600">${item.price?.toFixed(2) || '0.00'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="px-2 text-gray-500 hover:text-orange-500"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity || 1}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="px-2 text-gray-500 hover:text-orange-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (20%)</span>
                  <span>${vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="font-bold">Grand Total</span>
                  <span className="font-bold text-orange-500">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
              >
                Continue & Pay
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}