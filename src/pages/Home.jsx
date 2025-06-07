import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import data from '../data/data.json';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState(null);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  // TODO: Replace this with your real auth logic/context
  const isLoggedIn = false;

  useEffect(() => {
    const catMap = {};
    data.forEach(product => {
      if (!catMap[product.category]) {
        catMap[product.category] = product;
      }
    });
    setCategories(Object.values(catMap));

    const newItem = data.find(product => product.new);
    setFeatured(newItem);
  }, []);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShopClick = () => {
    if (isLoggedIn) {
      navigate('/shop');
    } else {
      navigate('/login'); // or '/signup' or '/auth' depending on your routes
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen max-h-[800px] bg-gray-900 text-white">
        {/* Background Image */}
        <img 
          src="/preview.jpg"
          alt="Premium Products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Our Collection</h1>
          <p className="mb-8 text-lg md:text-xl max-w-2xl">
            Explore our premium selection of products designed for excellence
          </p>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleShopClick}
              className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Shop Now
            </button>
            <button
              onClick={scrollToCategories}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition"
            >
              View More
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="px-4 py-12 max-w-7xl mx-auto">
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
        <section className="px-4 max-w-7xl mx-auto mb-12">
          <div className="bg-gray-100 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
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
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
