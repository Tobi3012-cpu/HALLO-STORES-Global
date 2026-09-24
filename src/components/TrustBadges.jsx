import { Truck, ShieldCheck, Headphones, Banknote } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: <Truck size={24} />, title: 'Fast Shipping', desc:'Delivered in 2-3 business days' },
    
    { icon: <ShieldCheck size={24} />, title: 'Secure Checkout', desc: '100% secure payment' },
    { icon: <Headphones size={24} />, title: '24/7 Support', desc: "We're here to help" },
  ];

  return (
    <section className="trust-badges">
      <div className="container trust-grid">
        {badges.map((badge, idx) => (
          <div key={idx} className="trust-item">
            <div className="trust-icon">{badge.icon}</div>
            <div className="trust-text">
              <h4>{badge.title}</h4>
              <p>{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}