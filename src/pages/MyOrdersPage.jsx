import { Link } from 'react-router-dom';
import { Package, ArrowLeft, ShoppingBag, Truck } from 'lucide-react';
import { useMyOrders } from '../context/MyOrdersContext';

export default function MyOrdersPage() {
  const { myOrders } = useMyOrders();

  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
          fontWeight: '500'
        }}
      >
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <h1 className="section-title" style={{ marginBottom: '2rem' }}>My Orders</h1>

      {myOrders.length === 0 ? (
        <div className="tracking-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>No orders yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Your orders will appear here after you make a purchase.
          </p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-flex' }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {myOrders.map((order) => (
            <div key={order.orderNumber} className="my-order-card">
              <div className="my-order-header">
                <div>
                  <p className="my-order-label">Order</p>
                  <h3 className="my-order-number">{order.orderNumber}</h3>
                  <p className="my-order-date">
                    {new Date(order.date).toLocaleDateString('en-NG', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="my-order-total">
                  <p className="my-order-label">Total</p>
                  <p className="my-order-amount">₦{order.total.toLocaleString()}</p>
                </div>
              </div>

              <div className="my-order-items">
                {order.items.slice(0, 3).map((item, i) => (
                  <span key={i} className="my-order-item-chip">
                    {item.name} × {item.quantity}
                  </span>
                ))}
                {order.items.length > 3 && (
                  <span className="my-order-item-chip">
                    +{order.items.length - 3} more
                  </span>
                )}
              </div>

              <Link
                to={`/order/${order.orderNumber}`}
                className="my-order-track-btn"
              >
                <Truck size={14} /> Track Order
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}