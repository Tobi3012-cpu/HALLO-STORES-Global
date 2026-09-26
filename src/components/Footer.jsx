import { Instagram, Facebook, Twitter, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <h2>Hallo<span style={{ color: '#2563EB' }}>Stores</span></h2>
        <p style={{ marginBottom: '1.5rem' }}>Premium drones and handheld games delivered across Nigeria.</p>

        <div className="footer-socials">
          <a href="https://www.instagram.com/hallostore2026?stkn=OTNlOHBkY2M4NWdw&utm_source=qr " target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://www.facebook.com/share/19VZjfREJJ/?mibextid=wwXIfr " target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          
          <a href="https://wa.me/23487070346743" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <MessageCircle size={20} />
          </a>
          <a href="mailto:halloglobalstores@gmail.com" aria-label="Email">
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