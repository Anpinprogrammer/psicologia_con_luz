import NavBar from '../layout/NavBar'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ScrollerLink } from 'react-scroll'

import './styles/FullScreen.css'

const FullScreen = () => {
  return (
    <div className="hero-wrap" id='home'>
        {/* Background image */}
        <div className="hero-bg" />

        {/* NAV — sits inside the hero, transparent */}
        <NavBar />

        {/* Hero message */}
        <div className="hero-content">
          <div className="tag fu hero-eyebrow">Bienestar real &amp; especialistas de confianza</div>

          <h1 className="hero-title fu d1">
            Tu bienestar integral,<br />
            <span className="line2">en manos expertas</span>
          </h1>

          <p className="hero-sub fu d2">
            Encuentra el apoyo profesional que necesitas para sanar, fortalecerte y crecer. Conecta con especialistas dedicados a tu salud física y emocional en un solo espacio diseñado para tu tranquilidad.
          </p>

          <div className="hero-btns fu d3">
            <RouterLink
              to={'/agendar-cita'}
              className='bg-amber'
            >
              Agenda tu primera sesión →
            </RouterLink>
            <ScrollerLink
              to='services'
              className='bo-w'
            >
              Conoce nuestros servicios
            </ScrollerLink>
          </div>
        </div>

        {/* Stats strip anchored to bottom */}
        <div className="hero-stats fu d4">
          {[
            { n: "+500", l: "Familias acompañadas" },
            { n: "100%", l: "Online & confidencial" },
            { n: "+5",   l: "Años de experiencia" },
            { n: "ES/EN", l: "Español e inglés" },
          ].map((s, i) => (
            <div className="hero-stat" key={i}>
              <div className="hn">{s.n}</div>
              <div className="hl">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default FullScreen