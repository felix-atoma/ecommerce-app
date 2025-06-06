// src/components/ui/Input.jsx
import React from 'react';

// Option 1: Named export (matches your import)
export const Input = ({ 
  className = '', 
  type = 'text',
  ...props 
}) => {
  return (
    <input
      type={type}
      className={`
        w-full px-3 py-2 border border-gray-300 rounded-md
        shadow-sm focus:outline-none focus:ring-2
        focus:ring-blue-500 focus:border-blue-500
        transition duration-150 ease-in-out
        ${className}
      `}
      {...props}
    />
  );
};

// Option 2: Alternative default export
// export default Input;