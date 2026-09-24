import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Search, User, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { isNewArrivalsOn } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="announcement-bar">
        🔥 Summer Sale is Live! Get up to 60% OFF <Link to="/deals">Shop Now →</Link>
      </div>
      
      <div className="container nav-content">
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="logo" onClick={closeMenu}>Hallo<span>Stores</span></Link>
        
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/categories" className={({ isActive }) => isActive ? "active" : ""}>Categories</NavLink>
          <NavLink to="/deals" className={({ isActive }) => isActive ? "active" : ""}>Deals</NavLink>
          {isNewArrivalsOn && (
            <NavLink to="/new-arrivals" className={({ isActive }) => isActive ? "active" : ""}>New Arrivals</NavLink>
          )}
        </nav>

        <div className="nav-actions">
          <div className="search-bar">
            <input type="text" placeholder="Search for products..." />
            <Search className="search-icon" size={18} />
          </div>
          <button className="icon-btn hide-mobile"><User size={20} /></button>
          <button className="icon-btn hide-mobile"><Heart size={20} /></button>
          <button className="icon-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>
        <NavLink to="/categories" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
          Categories
        </NavLink>
        <NavLink to="/deals" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
          Deals
        </NavLink>
        {isNewArrivalsOn && (
          <NavLink to="/new-arrivals" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
            New Arrivals
          </NavLink>
        )}
      </div>
    </header>
  );
}