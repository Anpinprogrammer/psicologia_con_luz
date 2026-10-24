import { Link } from 'react-router-dom'
import { FOR_ITEMS } from '../../utils'
import './styles/IsItForMeSection.css'

function LightCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  )
}

/** Entry effects use the landing page's shared IntersectionObserver. */
export default function IsItForMeSection() {
  return (
    <section className="for-me-section" id="foryou" aria-labelledby="for-me-title">
      <div className="container for-me-section__grid">
        <header className="for-me-section__heading" data-animate="lift">
          <span className="tag-light">¿Es para mí?</span>
          <h2 className="st" id="for-me-title">El acompañamiento psicológico <em>puede ayudarte si…</em></h2>
        </header>

        <figure className="for-me-section__visual" data-animate="focus" data-delay="120">
          <img className="for-me-section__photo" src="/img/therapist.jpg"
            alt="Dos personas conversando en un espacio de consulta" loading="lazy" width="3840" height="2160" />
          <figcaption className="for-me-section__caption">Un espacio para escucharte, comprender y avanzar a tu ritmo.</figcaption>
        </figure>

        <ul className="for-me-section__list" role="list">
          {FOR_ITEMS.map(({ t }, index) => (
            <li className="for-me-section__item" key={t} data-animate="lift" data-delay={index * 80}>
              <LightCheck />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <div className="for-me-section__action" data-animate="pop">
          <Link className="for-me-section__cta" to="/agendar-cita">Comenzar mi proceso <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  )
}
