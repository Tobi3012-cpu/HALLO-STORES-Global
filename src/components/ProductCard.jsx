import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} />
          {product.badge && (
            <span className={`badge ${product.badge.includes('OFF') ? 'red' : 'blue'}`}>
              {product.badge}
            </span>
          )}
          <button className="wishlist-btn" onClick={handleWishlist} aria-label="Add to wishlist">
            <Heart size={16} />
          </button>
        </div>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="reviews">({product.reviews})</span>
        </div>
        <div className="product-price">
          <span className="current-price">₦{product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="old-price">₦{product.oldPrice.toLocaleString()}</span>
          )}
        </div>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}