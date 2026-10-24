import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { FAQS } from '../../utils'
import './styles/FAQSection.css'

export default function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const id = useId()
  const phone = String(import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')
  const contactUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent('Hola, tengo una pregunta sobre el acompañamiento psicológico.')}` : null

  return (
    <section className="faq-section" id="contact" aria-labelledby={`${id}-title`}>
      <div className="container faq-section__grid">
        <div className="faq-section__contact" data-animate="focus">
          <span className="tag-light">Preguntas frecuentes</span>
          <h2 className="st" id={`${id}-title`}>Tus <em>preguntas</em></h2>
          <p>Si tienes más dudas, con gusto te acompañamos a resolverlas.</p>
          {contactUrl ? (
            <a className="faq-section__contact-link" href={contactUrl} target="_blank" rel="noopener noreferrer"
              aria-label="Contáctanos por WhatsApp (abre en una nueva pestaña)">Contáctanos <span aria-hidden="true">→</span></a>
          ) : (
            <Link className="faq-section__contact-link" to="/agendar-cita">Contáctanos <span aria-hidden="true">→</span></Link>
          )}
        </div>

        <div className="faq-section__questions" data-animate="lift" data-delay="120">
          {FAQS.map(({ q, a }, index) => {
            const isOpen = openQuestion === index
            const questionId = `${id}-question-${index}`
            const answerId = `${id}-answer-${index}`
            return (
              <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={q}>
                <h3 className="faq-item__heading">
                  <button type="button" className="faq-item__trigger" id={questionId}
                    aria-expanded={isOpen} aria-controls={answerId}
                    onClick={() => setOpenQuestion(current => current === index ? null : index)}>
                    <span>{q}</span>
                    <svg className="faq-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M12 5v14" /></svg>
                  </button>
                </h3>
                <div className="faq-item__answer" id={answerId} role="region" aria-labelledby={questionId}
                  aria-hidden={!isOpen} inert={!isOpen}>
                  <div className="faq-item__answer-inner"><p>{a}</p></div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
