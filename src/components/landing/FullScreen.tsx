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
          <div className="tag fu hero-eyebrow">Comprender, sentir y transformar 🧠💛</div>

          <h1 className="hero-title fu d1">
            Acompañamiento psicológico desde lo humano,<br className="hero-title-break" />
            <span className="line2">la escucha y el bienestar emocional</span>
          </h1>

          <p className="hero-sub fu d2">
            Un espacio para comprender lo que sientes, transformar pensamientos y construir herramientas para tu bienestar emocional.
          </p>

          <div className="hero-btns fu d3">
            <RouterLink
              to={'/agendar-cita'}
              className='bg-amber'
            >
              Agenda tu espacio →
            </RouterLink>
            <ScrollerLink
              to='services'
              className='bo-w'
            >
              ¿Cómo puedo acompañarte?
            </ScrollerLink>
          </div>
        </div>

        {/* Stats strip anchored to bottom */}
        <div className="hero-stats fu d4">
          {[
            {
              n: "+500",
              l: "Procesos acompañados con empatía y compromiso"
            },
            {
              n: "Humano 🧠",
              l: "Psicología cercana, desde lo humano"
            },
            {
              n: "Virtual 🌎",
              l: "Sesiones desde cualquier lugar"
            },
            {
              n: "Presencial 🇨🇴",
              l: "Atención en Santiago de Cali"
            }
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
