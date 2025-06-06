
// src/pages/Category.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data/data.json';

const Category = () => {
  const { categoryName } = useParams();
  const categoryItems = data.filter(product => product.category === categoryName);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{categoryName}</h1>
      {categoryItems.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryItems.map(product => (
            <Link
              to={`/product/${product.slug}`}
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image.mobile.replace('./', '/')}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;