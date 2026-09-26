import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { MyOrdersProvider } from './context/MyOrdersContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage'; // <-- Import new page
import DealsPage from './pages/DealsPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import AdminPage from './pages/AdminPage';
import Spinner from './components/Spinner';
import CheckoutPage from './pages/CheckoutPage';

import AdminLogin from './pages/AdminLogin'; // <-- Import
import OrderTrackingPage from './pages/OrderTrackingPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderLookupPage from './pages/OrderLookupPage';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spinner />;

  return (
    <AdminProvider>
      <MyOrdersProvider>
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
                <Route path="my-orders" element={<MyOrdersPage />} />
                <Route path="track-order" element={<OrderLookupPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </MyOrdersProvider>
    </AdminProvider>
  );
}