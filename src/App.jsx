import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage'; // <-- Import new page
import DealsPage from './pages/DealsPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import AdminPage from './pages/AdminPage';
import Spinner from './components/Spinner';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AdminLogin from './pages/AdminLogin'; // <-- Import

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spinner />;

  return (
    <AdminProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="categories" element={<CategoriesPage />} />
              {/* Add the new dynamic route below */}
              <Route path="category/:categoryId" element={<CategoryDetailPage />} />
              <Route path="deals" element={<DealsPage />} />
              <Route path="new-arrivals" element={<NewArrivalsPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="checkout" element={<CheckoutPage />} /> {/* <-- Add this */}
              <Route path="hallo-control-panel" element={<AdminLogin />} />
              <Route path="order/:orderNumber" element={<OrderTrackingPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AdminProvider>
  );
}