import { API_URL } from '../config';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, Loader2 } from 'lucide-react';
import PaystackPop from '@paystack/inline-js';
import SuccessModal from '../components/SuccessModal';
import ConfirmingModal from '../components/ConfirmingModal';
import AlertModal from '../components/AlertModal';

export default function CheckoutPage() {
  const { cart, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Alert state
  const [alert, setAlert] = useState({
    isOpen: false,
    type: 'error',
    title: '',
    message: '',
  });

  const showAlert = (type, title, message) => {
    setAlert({ isOpen: true, type, title, message });
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSuccessClose = () => {
    setSuccessData(null);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // No shipping — final total is just the cart total
    const finalTotal = cartTotal;
    const amountInKobo = Math.round(finalTotal * 100);

    try {
      const initResponse = await fetch(`${API_URL}/api/paystack/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          amount: amountInKobo,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      if (!initResponse.ok) {
        throw new Error('Server error');
      }

      const initData = await initResponse.json();

      if (!initData.access_code) {
        throw new Error('Failed to initialize payment');
      }

      const popup = new PaystackPop();

      popup.resumeTransaction(initData.access_code, {
        onSuccess: async (transaction) => {
          setIsConfirming(true);

          try {
            const verifyResponse = await fetch(`${API_URL}/api/paystack/verify/${transaction.reference}`);
            const verifyData = await verifyResponse.json();

            if (verifyData.status === 'success') {
              setTimeout(() => {
                setIsConfirming(false);
                setSuccessData({
                  name: formData.name,
                  email: formData.email,
                  orderNumber: verifyData.order_number,
                });
                clearCart();
              }, 1200);
            } else {
              setIsConfirming(false);
              showAlert(
                'error',
                'Verification Failed',
                'We could not verify your payment. If you were charged, please contact support with your order details.'
              );
            }
          } catch (error) {
            console.error("Verification error:", error);
            setIsConfirming(false);
            showAlert(
              'warning',
              'Connection Issue',
              'We could not verify your payment due to a network issue. Please check your internet connection or contact support.'
            );
          } finally {
            setIsProcessing(false);
          }
        },
        onCancel: () => {
          setIsProcessing(false);
          showAlert(
            'info',
            'Payment Cancelled',
            'You closed the payment window. Your order has not been placed. You can try again whenever you are ready.'
          );
        },
      });

    } catch (error) {
      console.error("Initialization error:", error);
      setIsProcessing(false);
      
      if (!navigator.onLine) {
        showAlert(
          'warning',
          'No Internet Connection',
          'Please check your internet connection and try again.'
        );
      } else {
        showAlert(
          'error',
          'Payment Unavailable',
          'We could not start the payment process. Please try again in a moment or contact support if the issue persists.'
        );
      }
    }
  };

  if (cart.length === 0 && !successData) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2 className="section-title">Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
          style={{ marginTop: '1rem', display: 'inline-flex' }}
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container section">
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
          fontWeight: '500',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="section-title" style={{ marginBottom: '2rem' }}>Checkout</h1>

      <div className="checkout-grid">
        <div className="checkout-form-container">
          <h2>Contact & Delivery Information</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="johndoe@gmail.com"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+234 801 234 5678"
                onChange={handleInputChange}
                value={formData.phone}
              />
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                name="address"
                required
                rows="3"
                placeholder="123 Main St, City, Country"
                onChange={handleInputChange}
                value={formData.address}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={isProcessing}
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '1rem',
                opacity: isProcessing ? 0.7 : 1,
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="btn-spinner" />
                  Opening Payment...
                </>
              ) : (
                `Pay Now - ₦${cartTotal.toFixed(2)}`
              )}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-info">
                  <h4>{item.name}</h4>
                  <p>₦{item.price.toFixed(2)}</p>

                  <div className="cart-qty-controls" style={{ marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="qty-btn"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-display" style={{ fontSize: '0.875rem' }}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="qty-btn"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row total">
              <span>Total</span>
              <span>₦{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmingModal isOpen={isConfirming} />

      <SuccessModal
        isOpen={!!successData}
        customerName={successData?.name}
        customerEmail={successData?.email}
        orderNumber={successData?.orderNumber}
        onClose={handleSuccessClose}
      />

      <AlertModal
        isOpen={alert.isOpen}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={closeAlert}
      />
    </div>
  );
}