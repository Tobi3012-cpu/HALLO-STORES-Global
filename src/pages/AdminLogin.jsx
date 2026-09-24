import { useState } from 'react';
import AdminPage from './AdminPage';
import { Lock } from 'lucide-react';

// 👇 CHANGE THIS PASSWORD TO YOUR OWN SECRET PASSWORD
const ADMIN_PASSWORD = 'hallo2024!';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      // Save auth to sessionStorage so you don't need to log in on every refresh
      sessionStorage.setItem('halloAdminAuth', 'true');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  // Check if already authenticated in this browser session
  if (sessionStorage.getItem('halloAdminAuth') === 'true') {
    return <AdminPage />;
  }

  if (isAuthenticated) {
    return <AdminPage />;
  }

  return (
    <div className="container section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', backgroundColor: '#EFF6FF', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <Lock size={32} color="#2563EB" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0F172A' }}>Admin Access</h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Enter the password to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ textAlign: 'center', fontSize: '1rem' }}
              autoFocus
            />
          </div>
          {error && (
            <p style={{ color: '#EF4444', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}