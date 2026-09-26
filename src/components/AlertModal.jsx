import { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle, X } from 'lucide-react';

export default function AlertModal({ 
  isOpen, 
  type = 'info',     // 'error' | 'warning' | 'success' | 'info'
  title, 
  message, 
  onClose,
  buttonText = 'Got it'
}) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const config = {
    error:   { icon: <XCircle size={28} />,      color: '#EF4444', bg: '#FEF2F2', label: 'Error' },
    warning: { icon: <AlertCircle size={28} />,  color: '#F59E0B', bg: '#FFFBEB', label: 'Warning' },
    success: { icon: <CheckCircle2 size={28} />, color: '#16A34A', bg: '#F0FDF4', label: 'Success' },
    info:    { icon: <Info size={28} />,         color: '#2563EB', bg: '#EFF6FF', label: 'Info' },
  }[type] || config.info;

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
        <button className="alert-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="alert-icon-wrapper" style={{ backgroundColor: config.bg, color: config.color }}>
          {config.icon}
        </div>

        <h2 className="alert-title" style={{ color: config.color }}>
          {title || config.label}
        </h2>

        <p className="alert-message">{message}</p>

        <button 
          className="alert-btn" 
          style={{ backgroundColor: config.color }}
          onClick={onClose}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}