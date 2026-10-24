import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AB1 } from '../../utils'
import './styles/AboutSection.css'

/** Observe the small experience card so the count also runs on short mobile screens. */
function useExperienceCounter() {
  const counterRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = counterRef.current
    if (!element) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let inView = false
    const stop = () => cancelAnimationFrame(frame)
    const start = () => {
      stop()
      if (motion.matches) {
        setCount(5)
        return
      }
      setCount(0)
      let started: number | undefined
      const tick = (now: number) => {
        started ??= now
        const progress = Math.min((now - started) / 1400, 1)
        const eased = 1 - (1 - progress) ** 2
        setCount(progress === 1 ? 5 : Math.min(4, Math.floor(eased * 5)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    if (!('IntersectionObserver' in window)) {
      frame = requestAnimationFrame(() => setCount(5))
      return stop
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) start()
      else {
        stop()
        setCount(motion.matches ? 5 : 0)
      }
    }, { threshold: 0.35, rootMargin: '-6% 0px -4% 0px' })
    observer.observe(element)

    const replay = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== 'about') return
      if (inView) start()
      else {
        stop()
        setCount(motion.matches ? 5 : 0)
      }
    }
    const onMotionChange = () => {
      stop()
      if (motion.matches) setCount(5)
      else if (inView) start()
    }
    window.addEventListener('landing:replay', replay)
    motion.addEventListener('change', onMotionChange)
    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('landing:replay', replay)
      motion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return { counterRef, count }
}

export default function AboutSection() {
  const { counterRef, count } = useExperienceCounter()

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="container about-section__grid">
        <div className="about-section__visual" data-animate="focus">
          <img src={AB1} alt="Psicóloga de Psicología con luz" className="about-section__photo" loading="lazy" />
          <div ref={counterRef} className={`about-section__experience ${count === 5 ? 'is-complete' : ''}`}
            role="img" aria-label="Más de 5 años acompañando">
            <div className="about-section__number" aria-hidden="true">
              <span className="about-section__plus">+</span><span>{count}</span>
            </div>
            <span className="about-section__experience-label" aria-hidden="true">años acompañando</span>
          </div>
        </div>

        <div className="about-section__copy" data-animate="focus" data-delay="180">
          <span className="tag-light about-section__badge">Sobre mí</span>
          <h2 className="st" id="about-title">Acompañar procesos <em>También</em> es cuidar historias</h2>
          <p>Acompaño procesos emocionales en niños, adolescentes, jóvenes y adultos desde un enfoque cognitivo conductual con una mirada humana, cercana y consciente.</p>
          <p>Creo en la importancia de crear espacios terapéuticos seguros, donde cada persona pueda expresar lo que siente, comprender sus emociones y desarrollar herramientas para afrontar sus dificultades de una manera más saludable.</p>
          <p>El proceso terapéutico busca ayudarte a identificar patrones de pensamiento, comprender cómo influyen en tus emociones y conductas, y construir cambios conscientes que favorezcan tu bienestar emocional y tu calidad de vida. 💛</p>
          <Link to="/agendar-cita" className="about-section__cta">Comienza tu proceso <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  )
}
