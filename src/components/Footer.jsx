import { Mail, MessageCircle } from 'lucide-react';

// Custom SVG brand icons (Lucide removed these in newer versions)
const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <h2>Hallo<span style={{ color: '#2563EB' }}>Stores</span></h2>
        <p style={{ marginBottom: '1.5rem' }}>Premium drones and handheld games delivered across Nigeria.</p>

        <div className="footer-socials">
          <a href="https://www.instagram.com/hallostore2026" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon size={20} />
      </a>
          <a href="https://www.facebook.com/share/19VZjfREJJ/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FacebookIcon size={20} />
          </a>
          <a href="https://wa.me/2347070345743" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <MessageCircle size={20} />
          </a>
          <a href="mailto:hallostoresglobal@gmail.com" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#475569', marginTop: '1.5rem' }}>
          © {new Date().getFullYear()} Hallo Stores. All rights reserved.
        </p>
      </div>
    </footer>
  );
}