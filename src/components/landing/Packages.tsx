import { useNavigate } from 'react-router';
import './styles/Packages.css';
import { packages } from '../../utils';
import { Heart, Sprout } from 'lucide-react';



const Packages = () => {

  const navigate = useNavigate()

  return (
    <section className="packages-section" id='packages'>
      <div className="packages-container">
        <span className="tag-light">Nuestro Acompañamiento</span>
        <h2 className="packages-title">
          Procesos de acompañamiento emocional
          <Heart className="packages-title-icon" size={30} aria-hidden="true" />
        </h2>
        <p className="packages-subtitle">
          Elige el espacio que mejor se adapte a tu proceso. Cada proceso está pensado para acompañarte
          de forma cercana, humana y profesional.
        </p>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`package-card ${pkg.popular ? 'package-card--popular' : ''}`}
            >
              {pkg.popular && (
                <div className="popular-badge">
                  <span>Más elegido</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0L9.5 5.5H15L10.5 9L12 14.5L8 11L4 14.5L5.5 9L1 5.5H6.5L8 0Z"/>
                  </svg>
                </div>
              )}
              <div className="package-header">
                <div className={`package-icon ${pkg.popular && 'gold'} `}>{pkg.icon}</div>
                <span className={`package-badge ${pkg.popular ? 'badge-gold' : 'badge-purple'}`}>
                  {pkg.badge}
                </span>
              </div>
              <h3 className="package-title">{pkg.title}</h3>
              <p className="package-description">{pkg.description}</p>
              <div className="package-divider" />
              <div className="package-feature">
                <span className={`check-icon check-${pkg.checkIcon}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="currentColor"/>
                    <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="feature-text">{pkg.sessions}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="info-banner">
        <Sprout className="info-icon" size={28} aria-hidden="true" />
          <p className="info-text">
            Los procesos continuos permiten profundizar, fortalecer herramientas emocionales
            y generar <strong>cambios más reales y sostenibles</strong> en tu bienestar.
          </p>
          <Heart className="info-icon" size={28} aria-hidden="true" />
        </div>

        <button 
          className="cta-button"
          onClick={() => navigate('/agendar-cita')}
        >
          Quiero comenzar mi proceso <span className="arrow">→</span>
        </button>

        <p className="security-note">
          <span className="lock-icon">🔒</span> Espacios seguros, confidenciales y 100% online.
        </p>
      </div>
    </section>
  );
};

export default Packages;
