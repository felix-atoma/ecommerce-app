// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/data.json';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    // Extract unique categories with one product each to get category image and info
    const catMap = {};
    data.forEach(product => {
      if (!catMap[product.category]) {
        catMap[product.category] = product;
      }
    });
    setCategories(Object.values(catMap));

    // Use the first "new" item as featured product
    const newItem = data.find(product => product.new);
    setFeatured(newItem);
  }, []);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="bg-black text-white rounded-xl p-8 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Audio Gear</h1>
        <p className="mb-6 max-w-xl mx-auto">
          Discover the best audio equipment from our collection. Shop headphones, speakers, and earphones.
        </p>
        <Link
          to="/shop" // Change this if you have a dedicated shop page route
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Link
              to={`/category/${cat.category}`}
              key={cat.category}
              className="text-center border rounded-lg p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={cat.categoryImage.mobile.replace('./assets/', '/assets/')}
                alt={cat.category}
                className="mx-auto mb-4 w-32 h-32 object-contain"
              />
              <h3 className="text-lg font-bold capitalize">{cat.category}</h3>
              <p className="text-sm text-gray-500">View products</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Product */}
      {featured && (
        <section className="bg-gray-100 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
          <img
            src={featured.image.mobile.replace('./assets/', '/assets/')}
            alt={featured.name}
            className="w-full md:w-1/2 rounded-lg"
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">{featured.name}</h2>
            <p className="mb-4">{featured.description}</p>
            <Link
              to={`/product/${featured.slug}`}
              className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              See Product
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
