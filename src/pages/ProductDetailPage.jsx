import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Heart, Star, Truck, RotateCcw, ShieldCheck,
  Facebook, Twitter, Instagram, Minus, Plus, ChevronLeft,
  ChevronRight, Share2, Check
} from 'lucide-react';
import { featuredProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const RECENTLY_VIEWED_KEY = 'hallo_recently_viewed';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = featuredProducts.find(p => p.id === parseInt(productId));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('info');
  const [wishlisted, setWishlisted] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Save to recently viewed + load history
  useEffect(() => {
    if (!product) return;

    // Load previous products
    try {
      const stored = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
      const filtered = stored.filter(id => id !== product.id);
      const updated = [product.id, ...filtered].slice(0, 6);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      setRecentlyViewed(updated);
    } catch {
      setRecentlyViewed([product.id]);
    }

    // Reset UI on product change
    setSelectedImage(0);
    setSelectedColor(0);
    setQuantity(1);
    setActiveTab('info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2 className="section-title">Product not found</h2>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const gallery = product.gallery || [product.image];
  const colors = product.colors || [];
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Related: same category, excluding current product
  const related = featuredProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  // Recently viewed products (excluding current)
  const recentProducts = recentlyViewed
    .filter(id => id !== product.id)
    .map(id => featuredProducts.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 5);

  const handleAddToCart = () => {
    // Add quantity times by calling addToCart multiple times
    // OR better — add to cart with quantity directly
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const goToImage = (dir) => {
    setSelectedImage(prev => {
      if (dir === 'next') return (prev + 1) % gallery.length;
      return (prev - 1 + gallery.length) % gallery.length;
    });
  };

  const shareUrl = `https://hallo-stores-global.vercel.app/product/${product.id}`;
  const shareText = `Check out ${product.name} on Hallo Stores!`;

  return (
    <div className="container section">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/categories">Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Product Main Section */}
      <div className="product-detail-grid">
        {/* LEFT: Image Gallery */}
        <div className="product-gallery">
          <div className="product-main-image">
            <img src={gallery[selectedImage]} alt={product.name} />

            {gallery.length > 1 && (
              <>
                <button className="gallery-nav prev" onClick={() => goToImage('prev')} aria-label="Previous">
                  <ChevronLeft size={20} />
                </button>
                <button className="gallery-nav next" onClick={() => goToImage('next')} aria-label="Next">
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {product.badge && (
              <span className={`badge ${product.badge.includes('OFF') ? 'red' : 'blue'}`}>
                {product.badge}
              </span>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="product-thumbnails">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="product-info">
          <h1 className="product-detail-title">{product.name}</h1>

          {/* Rating */}
          <div className="product-detail-rating">
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  size={16}
                  fill={i <= Math.round(product.rating) ? '#F59E0B' : 'none'}
                  color="#F59E0B"
                />
              ))}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="product-detail-price">
            <span className="current">₦{product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <>
                <span className="old">₦{product.oldPrice.toLocaleString()}</span>
                <span className="discount-badge-inline">-{discount}%</span>
              </>
            )}
          </div>

          {/* Short description */}
          <p className="product-detail-desc">{product.description}</p>

          {/* Colors */}
          {colors.length > 0 && (
            <div className="product-option">
              <label className="option-label">
                Color: <strong>{colors[selectedColor].name}</strong>
              </label>
              <div className="color-swatches">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`color-swatch ${selectedColor === idx ? 'active' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(idx)}
                    aria-label={color.name}
                    title={color.name}
                  >
                    {selectedColor === idx && <Check size={14} color={color.value === '#F1F5F9' || color.value === '#E2E8F0' ? '#0F172A' : '#FFFFFF'} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="product-option">
            <label className="option-label">Quantity</label>
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease"
              >
                <Minus size={14} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} aria-label="Increase">
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Add to Cart + Wishlist */}
          <div className="product-actions-row">
            <button className="add-to-cart-detail" onClick={handleAddToCart}>
              <ShoppingCart size={18} />
              Add to Cart — ₦{(product.price * quantity).toLocaleString()}
            </button>
            <button
              className={`wishlist-detail-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => setWishlisted(!wishlisted)}
              aria-label="Add to wishlist"
            >
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Social Share */}
          <div className="product-share">
            <span>Share:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
              <Facebook size={16} />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
              <Twitter size={16} />
            </a>
            <a href={`https://www.instagram.com/hallostore2026`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(shareUrl);
                alert('Link copied!');
              }}
              aria-label="Copy link"
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* Trust strip */}
          <div className="product-trust-strip">
            <div><Truck size={16} /> <span>Fast delivery</span></div>
            <div><RotateCcw size={16} /> <span>Returns accepted</span></div>
            <div><ShieldCheck size={16} /> <span>Secure payment</span></div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs">
        <div className="product-tabs-header">
          <button className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>
            Product Info
          </button>
          <button className={activeTab === 'delivery' ? 'active' : ''} onClick={() => setActiveTab('delivery')}>
            Delivery & Returns
          </button>
          <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>
            Reviews ({product.reviews.toLocaleString()})
          </button>
        </div>

        <div className="product-tabs-body">
          {activeTab === 'info' && (
            <div>
              <ul className="specs-list">
                {(product.specs || []).map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
              <p className="product-long-desc">{product.description}</p>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div>
              <h4>Delivery Information</h4>
              <p>{product.delivery || 'Delivered within 2-4 business days nationwide.'}</p>
              <h4>Returns Policy</h4>
              <p>We accept returns within 7 days of delivery if the item is unused and in its original packaging. Contact us on WhatsApp to start a return.</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="reviews-summary">
                <div className="reviews-average">
                  <div className="big-rating">{product.rating.toFixed(1)}</div>
                  <div className="stars-row">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={18} fill={i <= Math.round(product.rating) ? '#F59E0B' : 'none'} color="#F59E0B" />
                    ))}
                  </div>
                  <div className="review-count">Based on {product.reviews.toLocaleString()} reviews</div>
                </div>
                <div className="reviews-cta">
                  <p>Enjoying this product? Leave a review and help other shoppers.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="product-section">
          <div className="section-header">
            <h2 className="section-title">May We Suggest</h2>
            <Link to="/categories" className="view-all">View All</Link>
          </div>
          <div className="products-grid">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentProducts.length > 0 && (
        <section className="product-section">
          <div className="section-header">
            <h2 className="section-title">Your Recently Viewed Products</h2>
          </div>
          <div className="recently-viewed-grid">
            {recentProducts.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} className="recently-viewed-item">
                <div className="recently-viewed-image">
                  <img src={p.image} alt={p.name} />
                </div>
                <p className="recently-viewed-name">{p.name}</p>
                <p className="recently-viewed-price">₦{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}