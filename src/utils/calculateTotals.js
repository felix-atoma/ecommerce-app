// src/utils/calculateTotals.js

const calculateTotals = (cartItems) => {
  const productTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 50;
  const vat = Math.round(productTotal * 0.2);
  const grandTotal = productTotal + shipping + vat;

  return {
    productTotal,
    shipping,
    vat,
    grandTotal,
  };
};

export default calculateTotals;
