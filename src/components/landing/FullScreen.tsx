import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'
import NavBar from '../layout/NavBar'
import './styles/FullScreen.css'

const highlights = [
  { title: '+500', description: 'Procesos acompañados con empatía y compromiso' },
  { title: 'Humano', description: 'Psicología cercana, desde lo humano' },
  { title: 'Virtual', description: 'Sesiones desde cualquier lugar' },
  { title: 'Presencial', description: 'Atención en Santiago de Cali' },
] as const

const FullScreen = () => (
  <>
    <NavBar />
  <div className="hero-wrap" id="home">
    <div className="hero-bg" aria-hidden="true" />
    <section className="hero-content" aria-labelledby="hero-title">
      <p className="hero-eyebrow">Comprender, sentir y transformar</p>
      <h1 className="hero-title" id="hero-title">
        Acompañamiento psicológico desde lo humano,
        <em>la escucha y el bienestar emocional</em>
      </h1>
      <p className="hero-sub">
        Un espacio para comprender lo que sientes, transformar pensamientos y
        construir herramientas para tu bienestar emocional.
      </p>
      <div className="hero-btns">
        <Link to="/agendar-cita" className="hero-cta hero-cta-primary">
          Agenda tu espacio <MoveRight size={18} aria-hidden="true" />
        </Link>
        <a href="#services" className="hero-cta hero-cta-secondary">
          ¿Cómo puedo acompañarte?
        </a>
      </div>
    </section>
    <ul className="hero-stats" aria-label="Nuestro acompañamiento">
      {highlights.map(({ title, description }) => (
        <li className="hero-stat" key={title}>
          <strong className="hero-stat-title">{title}</strong>
          <p className="hero-stat-description">{description}</p>
        </li>
      ))}
    </ul>
  </div>
  </>
)

export default FullScreen
