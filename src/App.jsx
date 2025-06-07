import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Shop from './pages/Shop';
import Category from './pages/Category';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderSummaryModal from './components/OrderSummaryModal';
import { LogIn } from 'lucide-react';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-summary-modal" element={<OrderSummaryModal />} />
        <Route path="shop" element={<Shop />} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="category/:categoryName" element={<Category />} />
      </Route>
    </Routes>
  );
}
