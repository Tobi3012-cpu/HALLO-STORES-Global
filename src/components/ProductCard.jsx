import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
        {product.badge && (
          <span className={`badge ${product.badge.includes('OFF') ? 'red' : 'blue'}`}>
            {product.badge}
          </span>
        )}
        <button className="wishlist-btn"><Heart size={16} /></button>
      </div>
      <h3 className="product-title">{product.name}</h3>
      <div className="product-rating">
        <span className="stars">★★★★★</span>
        <span className="reviews">({product.reviews})</span>
      </div>
      <div className="product-price">
        <span className="current-price">₦{product.price.toFixed(2)}</span>
        <span className="old-price">₦{product.oldPrice.toFixed(2)}</span>
      </div>
      <button onClick={() => addToCart(product)} className="add-to-cart-btn">
        <ShoppingCart size={16} /> Add to Cart
      </button>
    </div>
  );
}