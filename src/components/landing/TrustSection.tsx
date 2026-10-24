import { TESTS } from '../../utils'
import './styles/TrustSection.css'

const pillars = ['Respeto por tu historia', 'Escucha con sensibilidad', 'Cuidado consciente'] as const

function LightMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 5c0 10-5 15-15 15 10 0 15 5 15 15 0-10 5-15 15-15-10 0-15-5-15-15Z" />
    </svg>
  )
}

/** These are the team's care principles, rather than clinical testimonials. */
export default function TrustSection() {
  return (
    <section className="trust-section" id="trust" aria-labelledby="trust-title">
      <div className="container trust-section__container">
        <header className="trust-section__heading" data-animate="lift">
          <span className="tag-light">Confianza</span>
          <h2 className="st" id="trust-title">Confianza construida <em>con cuidado</em></h2>
        </header>

        <aside className="trust-section__manifesto" aria-labelledby="trust-commitment" data-animate="focus">
            <h3 id="trust-commitment">Ética y compromiso</h3>
            <p>No utilizamos testimonios clínicos ni promesas de resultados, porque creemos que el cuidado emocional se sostiene desde la ética, no desde la exposición. Lo que sí ofrecemos es un marco claro, humano y responsable para acompañar procesos emocionales con respeto y sensibilidad.</p>
        </aside>

        <div className="trust-section__grid">
          {TESTS.map(({ q }, index) => (
            <article className="trust-pillar" key={pillars[index]} data-animate="lift" data-delay={index * 120}
              aria-labelledby={`trust-pillar-${index}`}>
              <span className="trust-pillar__light"><LightMark /></span>
              <h3 id={`trust-pillar-${index}`}>{pillars[index]}</h3>
              <p className="trust-pillar__text">{q}</p>
              <p className="trust-pillar__signature">Equipo Psicología con Luz</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
