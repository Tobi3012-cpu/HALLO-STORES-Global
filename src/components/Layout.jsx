import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import Toast from './Toast';
import FloatingWhatsApp from './FloatingWhatsapp';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
      <FloatingWhatsApp />
    </>
  );
}