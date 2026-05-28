import { Link } from 'react-router-dom'
import FullScreen from '../../components/landing/FullScreen'
import Services from '../../components/landing/Services'
import Packages from '../../components/landing/Packages'
import ForYou from '../../components/landing/ForYou'
import FaqBox from '../../components/landing/FaqBox'

import { AB1, H1, H2, H3, PILLARS, T1, T2, TESTS, FAQS } from '../../utils'
import './Landing.css'

const LandingPage = () => {

 

  return (
    <>
        <FullScreen />

        {/* ══════ ABOUT ══════ */}
        <section className='section-bg' id='about' >
            <div className="container">
            <div className="about-g">
                <div className="about-iw">
                <img src={AB1} alt="Mindheart Therapy" className="about-img" />
                <div className="about-fl">
                    <div className="fn" style={{ fontFamily:"'Playfair Display',serif" }}>+5</div>
                    <div className="fl">años acompañando</div>
                </div>
                </div>
                <div>
                <span className="tag-light">Sobre mi</span>
                <h2 className="st">Acompañar Procesos <em>Tambien</em> es Cuidar Historias</h2>
                <p className="sb" style={{ marginBottom:"1rem" }}>
                    Acompaño procesos emocionales en niños, adolescentes, jóvenes y adultos desde un enfoque cognitivo conductual con una mirada humana, cercana y consciente.
                </p>
                <p className='sb' style={{ marginBottom: "1rem" }}>
                  Creo en la importancia de crear espacios terapéuticos seguros, donde cada persona pueda expresar lo que siente, comprender sus emociones y desarrollar herramientas para afrontar sus dificultades de una manera más saludable.
                </p>
                <p className="sb" style={{ marginBottom:"1.5rem" }}>
                    El proceso terapéutico busca ayudarte a identificar patrones de pensamiento, comprender cómo influyen en tus emociones y conductas, y construir cambios conscientes que favorezcan tu bienestar emocional y tu calidad de vida. 💛 
                </p>
                <a href="#" className="bo">Comienza tu proceso →</a>
                </div>
            </div>
            </div>
        </section>

        <Services />

        <Packages />

        <ForYou />

        {/* ══════ HOW IT WORKS ══════ */}
      <section className="how-bg">
        <div className="container">
          <div className="how-hd">
            <span className="tag-inv" style={{ display:"inline-block", background:"rgba(74,101,128,0.22)", color:"#afc3d4", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", padding:"0.34rem 0.95rem", borderRadius:"50px", marginBottom:"1.1rem" }}>El proceso</span>
            <h2 className="st st-w">¿Cómo <em>funciona?</em></h2>
          </div>
          <div className="steps">
            {[
              { img:H1, n:"01", t:"Nos cuentas lo que buscas y escoges tu terapeuta", d:"Llenas un formulario y nosotros te llevamos a las opciones de terapeutas que se alineen contigo." },
              { img:H2, n:"02", t:"Sesiones online y cuidadas",                        d:"Te conectas desde cualquier lugar al espacio más amoroso y sanador, 100% confidencial." },
              { img:H3, n:"03", t:"Acompañamiento sostenido",                          d:"Ya nunca estarás sola. Avanzas a tu ritmo, con la posibilidad de continuar, ajustar o cambiar según lo que necesites." },
            ].map((s, i) => (
              <div className="step" key={i}>
                <div className="step-n">{s.n}</div>
                <img src={s.img} alt={s.t} className="step-img" />
                <h3 className="step-t">{s.t}</h3>
                <p className="step-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PILLARS ══════ */}
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

      {/* ══════ TEAM ══════ */}
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

      {/* ══════ TESTIMONIALS ══════ */}
      <section className='section-testimonials' style={{ background: '#F2EFF9' }} >
        <div className="container">
          <div className="test-hd">
            <span className="tag-light">Confianza</span>
            <h2 className="st">Confianza construida<br /><em>con cuidado</em></h2>
          </div>
          <p className="ethics">No utilizamos testimonios clínicos ni promesas de resultados, porque creemos que el cuidado emocional se sostiene desde la ética, no desde la exposición. Lo que sí ofrecemos es un marco claro, humano y responsable para acompañar procesos emocionales con respeto y sensibilidad.</p>
          <div className="test-grid">
            {TESTS.map((t, i) => (
              <div className="test-c" key={i}>
                <span className="qm">"</span>
                <p className="qt">{t.q}</p>
                <div className="qa">
                  <strong>{t.a}</strong>
                  <span>{t.r}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className='section-bg' id='contact'>
        <div className="container">
          <div className="faq-w">
            <div>
              <span className="tag-light">Preguntas frecuentes</span>
              <h2 className="st">Tus<br /><em>preguntas</em></h2>
              <p className="sb" style={{ marginBottom:"2rem" }}>Si tienes más dudas, con gusto te acompañamos a resolverlas.</p>
              <a href="#" className="bo">Contáctanos →</a>
            </div>
            <div className="faq-list">
              {FAQS.map((f, i) => <FaqBox key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <div className="cta-band">
        <h2 className="st">Es momento de <br /><em>priorizar tu bienestar</em></h2>
        <p>Agenda tu sesión y da el primer paso hacia una vida más saludable, física y emocionalmente.</p>
        <Link
          to={'/agendar-cita'}
          className='bw'
        > 
          Agenda tu primera sesión →
        </Link>
      </div>
    </>
  )
}

export default LandingPage