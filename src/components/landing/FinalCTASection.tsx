import { Link } from 'react-router-dom'
import './styles/FinalCTASection.css'

export default function FinalCTASection() {
  return (
    <section className="final-cta-section" aria-labelledby="final-cta-title">
      <div className="container final-cta-section__content" data-animate="lift">
        <h2 id="final-cta-title">Es momento de <em>priorizar tu bienestar</em></h2>
        <p>Agenda tu sesión y da el primer paso hacia una vida más saludable, física y emocionalmente.</p>
        <Link to="/agendar-cita" className="final-cta-section__button">
          Agenda tu primera sesión <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
        </Link>
      </div>
    </section>
  )
}
