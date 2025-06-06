import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const { id, name, price, quantity, image } = item;

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <img
        src={image.mobile.replace('./', '/')}
        alt={name}
        className="w-20 h-20 object-contain rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-600">${price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
          className="px-2 bg-gray-300 rounded disabled:opacity-50"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => updateQuantity(id, quantity + 1)}
          className="px-2 bg-gray-300 rounded"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeFromCart(id)}
        className="text-red-600 hover:text-red-800 ml-4"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
