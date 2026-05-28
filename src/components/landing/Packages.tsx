import './styles/Packages.css';
import { Heart, Brain, Sprout, Leaf } from 'lucide-react';


const Packages = () => {
  const packages = [
    {
      icon:
        <Leaf style={{ color: "#5B6C7B" }}/>
        /**
         * 
         
      (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4C12 4 10 8 10 10C10 14 13 18 16 22C19 18 22 14 22 10C22 8 20 4 16 4Z" stroke="#5B6C7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 22V28" stroke="#5B6C7B" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 28H20" stroke="#5B6C7B" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )*/,
      badge: '1 SESIÓN',
      title: 'Espacio inicial',
      description: 'Ideal para iniciar tu proceso terapéutico o abordar una situación puntual.',
      checkIcon: 'purple',
      sessions: '1 sesión individual',
    },
    {
      icon:
        <Brain style={{ color: 'A67B4E' }} />
        /**
         * 
         
      (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 6C10 6 8 12 8 16C8 22 12 26 16 28C20 26 24 22 24 16C24 12 22 6 16 6Z" stroke="#A67B4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="16" cy="14" r="2" stroke="#A67B4E" strokeWidth="1.5"/>
          <path d="M12 20C12 20 13.5 22 16 22C18.5 22 20 20 20 20" stroke="#A67B4E" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )*/,
      badge: '4 SESIONES',
      title: 'Proceso de acompañamiento',
      description: 'Un espacio para comenzar a trabajar emociones, pensamientos y herramientas de manera más constante.',
      checkIcon: 'gold',
      sessions: '4 sesiones individuales',
      popular: true,
    },
    {
      icon:
        <Heart />
      /**
       * (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 28C16 28 6 22 6 14C6 10 9 7 13 7C14.5 7 16 7.8 16 9.5C16 7.8 17.5 7 19 7C23 7 26 10 26 14C26 22 16 28 16 28Z" stroke="#5B6C7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )*/,
      badge: '8 SESIONES',
      title: 'Proceso terapéutico continuo',
      description: 'Pensado para quienes desean profundizar en su proceso emocional y generar cambios más conscientes y sostenibles.',
      checkIcon: 'purple',
      sessions: '8 sesiones individuales',
    },
  ];

  return (
    <section className="packages-section" id='packages'>
      <div className="packages-container">
        <h2 className="packages-title">
          Procesos de acompañamiento emocional <span className="heart-emoji">💛</span>
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
                <div className="package-icon">{pkg.icon}</div>
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
        <Sprout style={{ color: "#A67B4E" }} size={28}/>
          <p className="info-text">
            Los procesos continuos permiten profundizar, fortalecer herramientas emocionales
            y generar <strong>cambios más reales y sostenibles</strong> en tu bienestar.
          </p>
          <Heart style={{ color: "#A67B4E" }} size={28} />
        </div>

        <button className="cta-button">
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
