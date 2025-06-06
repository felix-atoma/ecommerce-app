// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data/data.json';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Find product by slug or id from imported data
    const foundProduct = data.find(
      p => p.slug === id || p.id === parseInt(id)
    );
    setProduct(foundProduct || null);
  }, [id]);

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="text-gray-500 hover:text-orange-500 mb-8 inline-block">
        Go Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img
            src={product.image?.mobile?.replace('./', '/') || product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>

        <div>
          {product.new && (
            <span className="text-orange-500 uppercase text-sm tracking-widest">
              New Product
            </span>
          )}
          <h1 className="text-4xl font-bold my-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-xl font-bold mb-6">${product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-4 py-2 text-gray-500 hover:text-orange-500"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-4 py-2 text-gray-500 hover:text-orange-500"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <p className="text-gray-600 whitespace-pre-line">{product.features}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">In the Box</h2>
          <ul className="space-y-2">
            {product.includes?.map((item, index) => (
              <li key={index} className="flex">
                <span className="text-orange-500 font-bold mr-2">{item.quantity}x</span>
                <span className="text-gray-600">{item.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
        <div className="grid gap-6">
          <img
            src={product.gallery?.first?.mobile?.replace('./', '/') || product.image}
            alt={`${product.name} gallery 1`}
            className="rounded-lg"
          />
          <img
            src={product.gallery?.second?.mobile?.replace('./', '/') || product.image}
            alt={`${product.name} gallery 2`}
            className="rounded-lg"
          />
        </div>
        <img
          src={product.gallery?.third?.mobile?.replace('./', '/') || product.image}
          alt={`${product.name} gallery 3`}
          className="rounded-lg row-span-2 h-full object-cover"
        />
      </div>
    </div>
  );
}
