import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  const location = useLocation();

  // Hide on admin pages
  if (location.pathname.startsWith('/hallo-control-panel')) return null;
  // Hide on checkout (avoid distraction)
  if (location.pathname === '/checkout') return null;

  const message = encodeURIComponent(
    "Hi Hallo Stores! 👋\n\nI have a question about your products."
  );

  return (
    <a
      href={`https://wa.me/${2347070345743}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} />
      <span className="floating-whatsapp-tooltip">Chat with us</span>
    </a>
  );
}