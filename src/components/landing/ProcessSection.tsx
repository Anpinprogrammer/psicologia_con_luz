import './styles/ProcessSection.css'

const steps = [
  {
    title: 'Nos cuentas lo que buscas y escoges tu terapeuta',
    description: 'Llenas un formulario y nosotros te llevamos a las opciones de terapeutas que se alineen contigo.',
  },
  {
    title: 'Sesiones online y cuidadas',
    description: 'Te conectas desde cualquier lugar a un espacio cercano, cuidado y confidencial.',
  },
  {
    title: 'Acompañamiento sostenido',
    description: 'Avanzas a tu ritmo, con la posibilidad de continuar, ajustar o cambiar según lo que necesites.',
  },
] as const

/** The landing page's shared IntersectionObserver reveals each step in sequence. */
export default function ProcessSection() {
  return (
    <section className="process-section" id="process" aria-labelledby="process-title">
      <div className="container process-section__container">
        <header className="process-section__heading" data-animate="lift">
          <span className="process-section__badge">El proceso</span>
          <h2 id="process-title">¿Cómo <em>funciona?</em></h2>
        </header>
        <ol className="process-section__timeline" role="list">
          {steps.map(({ title, description }, index) => (
            <li className="process-step" key={title}>
              <span className="process-step__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="process-step__copy" data-animate="lift" data-delay={index * 150}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
