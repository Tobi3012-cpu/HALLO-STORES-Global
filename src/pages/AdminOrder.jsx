import { useEffect, useState } from 'react';
import { API_URL } from '../config';
import { Package, Truck, Home, CheckCircle2, Clock, XCircle, Loader2, RefreshCw } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'paid',       label: 'Paid',       icon: CheckCircle2, color: '#2563EB' },
  { value: 'processing', label: 'Processing', icon: Package,      color: '#D97706' },
  { value: 'shipped',    label: 'Shipped',    icon: Truck,        color: '#16A34A' },
  { value: 'delivered',  label: 'Delivered',  icon: Home,         color: '#059669' },
  { value: 'cancelled',  label: 'Cancelled',  icon: XCircle,      color: '#DC2626' },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderNumber, status) => {
    let trackingNumber = null;
    if (status === 'shipped') {
      trackingNumber = prompt('Enter tracking number (optional):') || null;
    }

    setUpdating(orderNumber);
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderNumber}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, trackingNumber }),
      });
      if (res.ok) {
        await fetchOrders();
      }
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <Loader2 size={32} className="btn-spinner" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="admin-card">
        <h2>Orders</h2>
        <p style={{ color: 'var(--text-muted)' }}>No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, border: 'none', padding: 0 }}>Orders ({orders.length})</h2>
        <button onClick={fetchOrders} className="icon-btn" title="Refresh">
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="orders-list">
        {orders.map(order => {
          const isOpen = expanded === order.id;
          const statusInfo = STATUS_OPTIONS.find(s => s.value === order.status) || STATUS_OPTIONS[0];
          return (
            <div key={order.id} className={`order-row ${isOpen ? 'open' : ''}`}>
              <div 
                className="order-row-header" 
                onClick={() => setExpanded(isOpen ? null : order.id)}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{order.order_number}</span>
                    <span 
                      className="status-pill" 
                      style={{ backgroundColor: `${statusInfo.color}15`, color: statusInfo.color }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                    {order.customer_name} · ₦{order.total.toLocaleString()}
                  </p>
                </div>
              </div>

              {isOpen && (
                <div className="order-row-body">
                  <div className="order-detail">
                    <strong>Customer</strong>
                    <p>{order.customer_name}<br />{order.customer_email}<br />{order.customer_phone}</p>
                  </div>
                  <div className="order-detail">
                    <strong>Delivery Address</strong>
                    <p>{order.customer_address}</p>
                  </div>
                  <div className="order-detail">
                    <strong>Items</strong>
                    {order.items.map(item => (
                      <p key={item.id}>{item.name} × {item.quantity} — ₦{(item.price * item.quantity).toLocaleString()}</p>
                    ))}
                  </div>
                  {order.tracking_number && (
                    <div className="order-detail">
                      <strong>Tracking Number</strong>
                      <p>{order.tracking_number}</p>
                    </div>
                  )}

                  <div className="order-actions">
                    <strong style={{ fontSize: '0.8125rem', display: 'block', marginBottom: '0.5rem' }}>Update Status</strong>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {STATUS_OPTIONS.map(opt => {
                        const Icon = opt.icon;
                        const isActive = order.status === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => updateStatus(order.order_number, opt.value)}
                            disabled={updating === order.order_number || isActive}
                            className="status-update-btn"
                            style={{
                              backgroundColor: isActive ? opt.color : 'transparent',
                              color: isActive ? 'white' : opt.color,
                              borderColor: opt.color,
                              opacity: updating === order.order_number ? 0.5 : 1,
                            }}
                          >
                            {updating === order.order_number ? <Loader2 size={12} className="btn-spinner" /> : <Icon size={12} />}
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}