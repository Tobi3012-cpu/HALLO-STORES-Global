import { useEffect, useState } from 'react';
import { Check, Mail, Sparkles, ShoppingBag, Copy } from 'lucide-react';

export default function SuccessModal({ 
  isOpen, 
  customerName, 
  customerEmail, 
  orderNumber, 
  onClose 
}) {
  const [copied, setCopied] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Auto-close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const firstName = customerName ? customerName.split(' ')[0] : 'there';

  const copyOrderNumber = () => {
    navigator.clipboard?.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        {/* Decorative sparkles */}
        <div className="success-sparkle s1"><Sparkles size={14} /></div>
        <div className="success-sparkle s2"><Sparkles size={10} /></div>
        <div className="success-sparkle s3"><Sparkles size={12} /></div>

        {/* Animated check */}
        <div className="success-check-circle">
          <svg viewBox="0 0 52 52" className="success-check-svg">
            <circle cx="26" cy="26" r="25" fill="none" className="success-check-circle-path" />
            <path fill="none" className="success-check-mark" d="M14 27l8 8 16-16" />
          </svg>
        </div>

        <h2 className="success-title">Order Confirmed!</h2>
        <p className="success-subtitle">
          Thank you, <strong>{firstName}</strong>! 🎉
          <br />
          Your payment was successful.
        </p>

        {/* Order number */}
        {orderNumber && (
          <button className="success-order-box" onClick={copyOrderNumber} type="button">
            <div>
              <span className="success-order-label">Order Number</span>
              <span className="success-order-value">{orderNumber}</span>
            </div>
            <span className="success-copy">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </span>
          </button>
        )}

        {/* Email info */}
        <div className="success-email-box">
          <div className="success-email-icon">
            <Mail size={18} />
          </div>
          <div className="success-email-text">
            <p>
              We've sent a confirmation to
              <br />
              <strong>{customerEmail}</strong>
            </p>
            <p className="success-spam-hint">
              💡 Don't see it? Please check your <strong>Spam</strong> or <strong>Promotions</strong> folder too.
            </p>
          </div>
        </div>

        <button className="success-continue-btn" onClick={onClose} type="button">
          <ShoppingBag size={16} />
          Continue Shopping
        </button>

        <p className="success-footer-note">
          Need help? Reply to the confirmation email and we'll assist you.
        </p>
      </div>
    </div>
  );
}