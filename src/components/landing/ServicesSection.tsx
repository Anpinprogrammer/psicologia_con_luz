import { SVCS } from '../../utils'
import './styles/ServicesSection.css'

/** Entry animations are observed by LandingPage's shared useScrollAnimation hook. */
export default function ServicesSection() {
  return (
    <section className="services-section" id="services" aria-labelledby="services-title">
      <div className="container">
        <header className="services-section__heading" data-animate="lift">
          <span className="tag-light">Acompañamiento</span>
          <h2 className="st" id="services-title">¿Cómo puedo <em>acompañarte?</em></h2>
          <p>Cada servicio está diseñado para acompañarte de forma honesta, técnica y humana, según lo que tú y tu familia necesiten.</p>
        </header>

        <p className="services-section__swipe-hint">Desliza para explorar los servicios <span aria-hidden="true">→</span></p>
        <div className="services-section__grid" role="region" aria-label="Servicios disponibles" tabIndex={0}>
          {SVCS.map(({ name, desc, note }, index) => (
            <article className="service-card" key={name}
              data-animate="lift" data-delay={(index + 1) * 100}>
              <span className="service-card__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="service-card__title">{name}</h3>
              <p className="service-card__description">{desc}</p>
              {note && <p className="service-card__note">{note}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
