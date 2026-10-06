export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="drone-loader">
        <div className="drone-track">
          {/* Faint base line */}
          <div className="drone-track-line" />

          {/* Red line that grows behind the drone */}
          <div className="drone-flight-line" />

          {/* Drone icon that flies along */}
          <div className="drone-icon">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Propellers */}
              <ellipse cx="4" cy="6" rx="3" ry="1" fill="#DC2626" opacity="0.85" />
              <ellipse cx="20" cy="6" rx="3" ry="1" fill="#DC2626" opacity="0.85" />
              <ellipse cx="4" cy="18" rx="3" ry="1" fill="#DC2626" opacity="0.85" />
              <ellipse cx="20" cy="18" rx="3" ry="1" fill="#DC2626" opacity="0.85" />

              {/* Arms */}
              <line x1="4" y1="6" x2="10" y2="11" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="20" y1="6" x2="14" y2="11" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="4" y1="18" x2="10" y2="13" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="20" y1="18" x2="14" y2="13" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />

              {/* Body */}
              <rect x="9.5" y="9.5" width="5" height="5" rx="1.2" fill="#111827" />

              {/* Camera */}
              <circle cx="12" cy="14.5" r="1.2" fill="#DC2626" />
            </svg>
          </div>
        </div>

        <p className="drone-loader-text">Loading Hallo Stores…</p>
      </div>
    </div>
  );
}