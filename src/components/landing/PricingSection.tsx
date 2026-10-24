import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { packages, SERVICES } from '../../utils'
import './styles/PricingSection.css'

const benefits = [
  ['Un espacio para comprender lo que sientes', 'Acompañamiento cercano y confidencial'],
  ['Trabajo constante en emociones y pensamientos', 'Herramientas para tu bienestar emocional'],
  ['Espacio para profundizar en tu proceso', 'Herramientas para cambios conscientes y sostenibles'],
]

function Checkmark() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>
}

function GrowthMark() {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 27V14M16 21C6 22 4 15 5 9c7 0 11 4 11 12ZM16 16C16 7 22 4 28 5c0 7-4 12-12 11Z" /></svg>
}

export default function PricingSection() {
  const [activePlan, setActivePlan] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const changePlan = (direction: number) => {
    setActivePlan(current => (current + direction + packages.length) % packages.length)
  }

  return (
    <section className="pricing-section" id="packages" aria-labelledby="pricing-title">
      <div className="container pricing-section__container">
        <header className="pricing-section__heading" data-animate="lift">
          <span className="tag-light">Planes</span>
          <h2 className="st" id="pricing-title">Procesos de <em>acompañamiento</em> emocional</h2>
          <p>Elige el espacio que mejor se adapte a tu proceso. Cada proceso está pensado para acompañarte de forma cercana, humana y profesional.</p>
        </header>

        <div className="pricing-section__carousel">
        <button type="button" className="pricing-section__arrow pricing-section__arrow--prev"
          aria-label="Ver plan anterior" aria-controls="pricing-plans" onClick={() => changePlan(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
        </button>
        <div className="pricing-section__grid" id="pricing-plans"
          onTouchStart={event => {
            const touch = event.touches[0]
            touchStart.current = { x: touch.clientX, y: touch.clientY }
          }}
          onTouchCancel={() => { touchStart.current = null }}
          onTouchEnd={event => {
            const start = touchStart.current
            touchStart.current = null
            if (!start || !window.matchMedia('(max-width: 768px)').matches) return
            const touch = event.changedTouches[0]
            const dx = touch.clientX - start.x
            const dy = touch.clientY - start.y
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) changePlan(dx < 0 ? 1 : -1)
          }}>
          {packages.map((plan, index) => {
            const service = SERVICES.find(item => item.name === plan.title)
            return (
              <article key={plan.title} className={`pricing-card${plan.popular ? ' pricing-card--featured' : ''}${activePlan === index ? ' pricing-card--current' : ''}`}
                data-animate="elevate" data-delay={index * 140} aria-labelledby={`pricing-plan-${index}`}>
                <div className="pricing-card__ribbon-slot">
                  {plan.popular && <span className="pricing-card__ribbon">Más elegido <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z" /></svg></span>}
                </div>
                <header className="pricing-card__header">
                  <div className="pricing-card__topline">
                    <span className="pricing-card__mark"><GrowthMark /></span>
                    <span className="pricing-card__sessions">{plan.badge}</span>
                  </div>
                  <h3 id={`pricing-plan-${index}`}>{plan.title}</h3>
                  <p>{plan.description}</p>
                </header>
                <ul className="pricing-card__benefits">
                  {[plan.sessions, ...benefits[index]].map(benefit => <li key={benefit}><Checkmark /><span>{benefit}</span></li>)}
                </ul>
                <Link className="pricing-card__cta" to={service ? `/agendar-cita?plan=${service.id}` : '/agendar-cita'}
                  aria-label={`Elegir ${plan.title}: ${plan.sessions}`}>
                  {index === 0 ? 'Agendar sesión' : 'Elegir este plan'} <span aria-hidden="true">→</span>
                </Link>
              </article>
            )
          })}
        </div>
        <button type="button" className="pricing-section__arrow pricing-section__arrow--next"
          aria-label="Ver siguiente plan" aria-controls="pricing-plans" onClick={() => changePlan(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
        </button>
        </div>
        <div className="pricing-section__pagination">
          <div className="pricing-section__dots" role="group" aria-label="Seleccionar plan">
            {packages.map((plan, index) => <button key={plan.title} type="button" aria-label={`Ver ${plan.title}`}
              aria-pressed={activePlan === index} onClick={() => setActivePlan(index)}><span /></button>)}
          </div>
          <p role="status" aria-live="polite" aria-atomic="true">Plan {activePlan + 1} de {packages.length}: {packages[activePlan].title}</p>
        </div>

        <aside className="pricing-section__insight" data-animate="focus" aria-label="Sobre los procesos continuos">
          <span className="pricing-section__insight-mark"><GrowthMark /></span>
          <p>Los procesos continuos permiten profundizar, fortalecer herramientas emocionales y generar <strong>cambios más reales y sostenibles</strong> en tu bienestar.</p>
        </aside>
        <p className="pricing-section__privacy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2" /></svg>Espacios seguros y confidenciales. Atención virtual y presencial.</p>
      </div>
    </section>
  )
}
