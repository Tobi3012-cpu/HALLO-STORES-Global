import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ArrowLeft, Loader2, Package } from 'lucide-react';
import { API_URL } from '../config';

export default function OrderLookupPage() {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/orders/lookup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Order not found');
      }

      // Success — go straight to the tracking page
      navigate(`/order/${data.order_number}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: '480px' }}>
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
        <ArrowLeft size={16} /> Back
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          backgroundColor: '#EFF6FF',
          padding: '1rem',
          borderRadius: '50%',
          marginBottom: '1rem'
        }}>
          <Package size={28} color="#2563EB" />
        </div>
        <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>Track Your Order</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Enter your order number and the email you used at checkout.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="tracking-card">
        <div className="form-group">
          <label>Order Number</label>
          <input
            type="text"
            placeholder="HS-2026-0001"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            autoFocus
            style={{ textTransform: 'uppercase' }}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && (
          <p style={{
            color: 'var(--danger)',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
          style={{
            width: '100%',
            justifyContent: 'center',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="btn-spinner" />
              Searching...
            </>
          ) : (
            <>
              <Search size={16} />
              Find My Order
            </>
          )}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        Can't find your order number? Check your confirmation email.
      </p>
    </div>
  );
}