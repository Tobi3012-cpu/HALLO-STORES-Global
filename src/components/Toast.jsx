import { useEffect } from 'react';
import { Check, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { justAdded, clearToast, setIsCartOpen } = useCart();

  // Auto-dismiss after 3 seconds, restart timer if a new item is added
  useEffect(() => {
    if (!justAdded) return;

    const timer = setTimeout(() => {
      clearToast();
    }, 3000);

    return () => clearTimeout(timer);
  }, [justAdded, clearToast]);

  if (!justAdded) return null;

  const handleViewCart = () => {
    clearToast();
    setIsCartOpen(true);
  };

  return (
    <div className="toast-wrapper" key={justAdded.toastId}>
      <div className="toast">
        <img src={justAdded.product.image} alt={justAdded.product.name} className="toast-image" />

        <div className="toast-info">
          <div className="toast-check">
            <span className="toast-check-icon"><Check size={10} strokeWidth={3} /></span>
            <span className="toast-label">Added to cart</span>
          </div>
          <p className="toast-name">{justAdded.product.name}</p>
        </div>

        <button className="toast-view-btn" onClick={handleViewCart}>
          <ShoppingBag size={14} />
          <span>View</span>
        </button>

        <button className="toast-close" onClick={clearToast} aria-label="Dismiss">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}