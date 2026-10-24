import { useScrollAnimation, replayScrollAnimation } from '../../hooks/useScrollAnimation'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import AboutSection from '../../components/landing/AboutSection'
import Hero from '../../components/landing/Hero'
import ServicesSection from '../../components/landing/ServicesSection'
import PricingSection from '../../components/landing/PricingSection'
import ProcessSection from '../../components/landing/ProcessSection'
import IsItForMeSection from '../../components/landing/IsItForMeSection'
import TrustSection from '../../components/landing/TrustSection'
import FAQSection from '../../components/landing/FAQSection'
import FinalCTASection from '../../components/landing/FinalCTASection'

import './Landing.css'

const LandingPage = () => {

  useScrollAnimation()
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.replace('#', '')
    replayScrollAnimation(id)
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 80)

    return () => window.clearTimeout(timer)
  }, [location.hash])

  return (
    <>
        <Hero />

        <AboutSection />

        <ServicesSection />

        <PricingSection />

        <IsItForMeSection />

        <ProcessSection />

      {/* ══════ PILLARS ══════ 
      <section className='section-bg'>
        <div className="container">
          <div className="pil-g">
            <div>
              <span className="tag-light">Por qué elegirnos</span>
              <h2 className="st">Mereces un espacio<br /><em>seguro y actualizado</em><br />para trabajar en ti</h2>
              <ul className="pil-list" style={{ marginTop:"2rem" }}>
                {PILLARS.map((p, i) => (
                  <li className="pil-item" key={i}>
                    <span className="pil-ck">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pil-imgs-test">
              <img src={T2} alt="Terapeuta" />
            </div>
          </div>
        </div>
      </section>
      */}

      {/* ══════ TEAM ══════ 
      <section className="team-bg" id='team'>
        <div className="container">
          <div className="team-g">
            <div className="team-imgs-test">
              <img src={T1} alt="Equipo" />
            </div>
            <div>
              <span className="tag-light">El equipo</span>
              <h2 className="st">El equipo que<br /><em>te acompaña</em></h2>
              <p className="sb" style={{ marginBottom:"1.1rem" }}>En Mindheart Therapy tenemos un equipo de psicólogas mágister en clínica y 100% respetuosas con la infancia y la crianza consciente.</p>
              <p className="sb" style={{ marginBottom:"1.1rem" }}>Trabajamos desde enfoques basados en evidencia, con supervisión clínica periódica y bajo protocolos éticos claros que cuidan tanto a quienes consultan como a quienes acompañan.</p>
              <p className="sb" style={{ marginBottom:"2.2rem" }}>Todas las terapeutas trabajan bajo el marco de Mindheart, liderado y supervisado por <strong>Manuela Molina</strong>, psicóloga y referente internacional en crianza consciente.</p>
              <Link
                to={'/agendar-cita'}
                className='bg'
              > 
                Agenda tu primera sesión →
              </Link>
            </div>
          </div>
        </div>
      </section>
      */}

      <TrustSection />

      <FAQSection />

      <FinalCTASection />
    </>
  )
}

export default LandingPage
