import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, CheckCircle2, Truck, Home, Clock, XCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { API_URL } from '../config';

const STAGES = [
  { key: 'paid',       label: 'Payment Confirmed',  icon: CheckCircle2 },
  { key: 'processing', label: 'Being Packed',       icon: Package },
  { key: 'shipped',    label: 'Shipped',            icon: Truck },
  { key: 'delivered',  label: 'Delivered',          icon: Home },
];

export default function OrderTrackingPage() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/track/${orderNumber}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();

    // Poll every 15 seconds for live updates
    const interval = setInterval(fetchOrder, 15000);
    return () => clearInterval(interval);
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <Loader2 size={32} className="btn-spinner" style={{ color: 'var(--primary)' }} />
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Loading your order...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <XCircle size={48} style={{ color: 'var(--danger)', marginBottom: '1rem' }} />
        <h2 className="section-title">Order Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          We couldn't find an order with number <strong>{orderNumber}</strong>.
        </p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex' }}>Back to Home</Link>
      </div>
    );
  }

  const currentStageIndex = STAGES.findIndex(s => s.key === order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: '500' }}>
        <ArrowLeft size={16} /> Back
      </Link>

      {/* Header */}
      <div className="tracking-header">
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>Order</p>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.5px' }}>
            {order.order_number}
          </h1>
        </div>
        <span className={`status-badge status-${order.status}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Progress tracker */}
      {!isCancelled && (
        <div className="tracker">
          {/* Animated moving bar background */}
          <div className="tracker-track">
            <div 
              className="tracker-progress" 
              style={{ width: `${(Math.max(0, currentStageIndex) / (STAGES.length - 1)) * 100}%` }}
            />
            {order.status === 'processing' && <div className="tracker-pulse" />}
          </div>

          <div className="tracker-stages">
            {STAGES.map((stage, idx) => {
              const isDone = idx <= currentStageIndex;
              const isActive = idx === currentStageIndex;
              const Icon = stage.icon;
              return (
                <div key={stage.key} className={`tracker-stage ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                  <div className="tracker-icon">
                    <Icon size={20} />
                  </div>
                  <span className="tracker-label">{stage.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isCancelled && (
        <div className="cancelled-banner">
          <XCircle size={20} />
          <span>This order was cancelled.</span>
        </div>
      )}

      {/* Order items */}
      <div className="tracking-card">
        <h3 style={{ marginBottom: '1rem', color: 'var(--dark)' }}>Items</h3>
        {order.items.map(item => (
          <div key={item.id} className="tracking-item">
            <span>{item.name} × {item.quantity}</span>
            <span style={{ fontWeight: 600 }}>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="tracking-item" style={{ borderTop: '2px solid var(--border)', marginTop: '0.5rem', paddingTop: '1rem', fontWeight: 800, fontSize: '1.125rem' }}>
          <span>Total</span>
          <span style={{ color: 'var(--primary)' }}>₦{order.total.toLocaleString()}</span>
        </div>
      </div>

      {/* Delivery info */}
      <div className="tracking-card">
        <h3 style={{ marginBottom: '1rem', color: 'var(--dark)' }}>Delivery Details</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--dark)' }}>{order.customer_name}</strong><br />
          {order.customer_address}<br />
          📞 {order.customer_phone}<br />
          ✉️ {order.customer_email}
        </p>
      </div>
    </div>
  );
}