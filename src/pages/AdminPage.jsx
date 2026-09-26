import { useAdmin } from '../context/AdminContext';
import { featuredProducts } from '../data/products';
import { ToggleLeft, ToggleRight, Check, RefreshCw } from 'lucide-react';
import AdminOrders from './AdminOrders';

// Then add <AdminOrders /> inside the admin-grid or below it
export default function AdminPage() {
  const { 
    isFlashSaleOn, toggleFlashSale, 
    isNewArrivalsOn, toggleNewArrivals,
    newArrivalIds, toggleNewArrivalProduct,
    flashSaleEndTime, resetFlashSaleTimer
  } = useAdmin();

  const endDate = new Date(flashSaleEndTime).toLocaleString();

  return (
    <div className="container section">
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div className="admin-grid">
        <div className="admin-card">
          <h2>Feature Toggles</h2>
          <div className="admin-toggle-row">
            <span>Show Flash Sale</span>
            <button onClick={toggleFlashSale} className={`toggle-btn ${isFlashSaleOn ? 'on' : 'off'}`}>
              {isFlashSaleOn ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
            </button>
          </div>
          <div className="admin-toggle-row">
            <span>Enable New Arrivals Page</span>
            <button onClick={toggleNewArrivals} className={`toggle-btn ${isNewArrivalsOn ? 'on' : 'off'}`}>
              {isNewArrivalsOn ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
            </button>
          </div>
          
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Flash Sale Timer</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Current End Time: <br/> <strong>{endDate}</strong>
            </p>
            <button 
              onClick={resetFlashSaleTimer}
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <RefreshCw size={16} /> Reset Timer (3 Days)
            </button>
          </div>
        </div>

        <div className="admin-card">
          <h2>Select New Arrival Products</h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Check the products you want to feature in the New Arrivals section.
          </p>
          <div className="admin-product-list">
            {featuredProducts.map(product => (
              <div key={product.id} className="admin-product-item">
                <img src={product.image} alt={product.name} />
                <div className="admin-product-info">
                  <h4>{product.name}</h4>
                  <p>₦{product.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => toggleNewArrivalProduct(product.id)}
                  className={`check-btn ${newArrivalIds.includes(product.id) ? 'checked' : ''}`}
                >
                  {newArrivalIds.includes(product.id) && <Check size={16} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <AdminOrders />
      </div>
    </div>
  );
}