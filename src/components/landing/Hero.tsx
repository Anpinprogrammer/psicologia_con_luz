import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'
import NavBar from '../layout/NavBar'
import './styles/Hero.css'

const highlights = [
  { title: '+500', description: 'Procesos acompañados con empatía y compromiso' },
  { title: 'Humano', description: 'Psicología cercana, desde lo humano' },
  { title: 'Virtual', description: 'Sesiones desde cualquier lugar' },
  { title: 'Presencial', description: 'Atención en Santiago de Cali' },
] as const

const backgroundSlides = [
  { src: 'https://www.modigo.se/app/uploads/Pojke_och_psykolog-1-1920x1280.jpg', label: 'Psicóloga atendiendo a un niño en consulta' },
  { src: 'https://static.wixstatic.com/media/c048f1_5439e7f250ac41a893efdbe582143402~mv2.jpg/v1/fill/w_1920,h_1440,al_c,q_85/c048f1_5439e7f250ac41a893efdbe582143402~mv2.jpg', label: 'Acompañamiento infantil en un espacio de consulta' },
  { src: 'https://images.tcdn.com.br/img/img_prod/548342/psicanalise_clinica_com_criancas_e_adolescentes_online_6157_1_5c6e6ecb7115cdd8f2e9f46dc6d5b8b1.jpg', label: 'Psicóloga escuchando a una niña en consulta' },
] as const

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', onChange)
    return () => preference.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return
    const interval = window.setInterval(() => {
      if (!document.hidden) setActiveSlide(current => (current + 1) % backgroundSlides.length)
    }, 6000)
    return () => window.clearInterval(interval)
    // Reset the six-second reading window after manual selection as well.
  }, [paused, reducedMotion, activeSlide])

  return (

  <>
    <NavBar />
  <div className="hero-wrap" id="home">
    <div className={`hero-bg${paused || reducedMotion ? ' hero-bg-paused' : ''}`} aria-hidden="true">
      {backgroundSlides.map(({ src }, index) => (
        <img key={src} className={`hero-bg-slide${activeSlide === index ? ' is-active' : ''}`}
          src={src} alt="" decoding="async" fetchPriority={index === 0 ? 'high' : 'low'} />
      ))}
    </div>
    <div className="hero-overlay" aria-hidden="true" />
    <section className="hero-content" aria-labelledby="hero-title">
      <span className="tag-light hero-eyebrow" data-animate="badge">Comprender, sentir y transformar</span>
      <h1 className="hero-title" id="hero-title">
        <span data-animate="lift" data-delay="140">Acompañamiento psicológico desde lo humano,</span>
        <em data-animate="lift" data-delay="280">la escucha y el bienestar emocional</em>
      </h1>
      <p className="hero-sub" data-animate="lift" data-delay="420">
        Un espacio para comprender lo que sientes, transformar pensamientos y
        construir herramientas para tu bienestar emocional.
      </p>
      <div className="hero-btns" data-animate="pop" data-delay="560">
        <Link to="/agendar-cita" className="hero-cta hero-cta-primary">
          Agenda tu espacio <MoveRight size={18} aria-hidden="true" />
        </Link>
        <a href="#services" className="hero-cta hero-cta-secondary">
          ¿Cómo puedo acompañarte?
        </a>
      </div>
    </section>
    <div className="hero-slider-controls" role="group" aria-label="Fondos del Hero">
      {backgroundSlides.map(({ label }, index) => (
        <button key={label} type="button" className="hero-slider-dot"
          aria-label={`Mostrar fondo ${index + 1}: ${label}`} aria-pressed={activeSlide === index}
          onClick={() => setActiveSlide(index)}><span /></button>
      ))}
      {!reducedMotion && <button type="button" className="hero-slider-pause" aria-pressed={paused}
        aria-label={paused ? 'Reanudar fondos automáticos' : 'Pausar fondos automáticos'}
        onClick={() => setPaused(current => !current)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {paused ? <path d="m9 5 10 7-10 7Z" /> : <path d="M8 5v14M16 5v14" />}
        </svg>
      </button>}
    </div>
    <ul className="hero-stats" aria-label="Nuestro acompañamiento">
      {highlights.map(({ title, description }, index) => (
        <li className="hero-stat" key={title} data-animate="lift" data-delay={680 + index * 110}>
          <strong className="hero-stat-title">{title}</strong>
          <p className="hero-stat-description">{description}</p>
        </li>
      ))}
    </ul>
  </div>
  </>
  )
}
