import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/data.json';

const Shop = () => {
  // Handle both direct array and { products: [...] } formats
  const products = Array.isArray(data) ? data : data?.products || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products ({products.length})</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No products found</p>
          <Link 
            to="/" 
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Return Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => {
            if (!product?.id) return null; // Skip invalid products
            
            // Handle image path
            let imageUrl = product.image?.mobile || product.image;
            if (typeof imageUrl === 'string') {
              imageUrl = imageUrl.replace('./', '/'); // Fix path format
            }

            return (
              <Link
                to={`/product/${product.slug || product.id}`}
                key={product.id}
                className="border rounded-lg p-4 hover:shadow-lg transition flex flex-col h-full"
              >
                <div className="flex-grow flex items-center justify-center">
                  <img
                    src={imageUrl || '/placeholder-product.png'}
                    alt={product.name || 'Product image'}
                    className="w-full h-48 object-contain mb-4"
                    onError={(e) => {
                      e.target.src = '/placeholder-product.png';
                    }}
                  />
                </div>
                <div className="mt-auto">
                  <h2 className="text-lg font-semibold">{product.name || 'Unnamed Product'}</h2>
                  <p className="text-gray-500">
                    ${product.price?.toLocaleString() || '0.00'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shop;