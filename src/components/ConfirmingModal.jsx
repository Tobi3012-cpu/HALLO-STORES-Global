import { useEffect } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function ConfirmingModal({ isOpen }) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="confirming-overlay">
      <div className="confirming-modal">
        {/* Animated spinner with shield */}
        <div className="confirming-spinner-wrapper">
          <div className="confirming-spinner-ring"></div>
          <div className="confirming-shield">
            <ShieldCheck size={32} />
          </div>
        </div>

        <h2 className="confirming-title">Confirming Payment</h2>
        <p className="confirming-subtitle">
          Please wait while we verify your payment with Paystack...
        </p>

        {/* Animated dots */}
        <div className="confirming-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="confirming-secure">
          <ShieldCheck size={14} />
          <span>Secured by Paystack</span>
        </div>
      </div>
    </div>
  );
}