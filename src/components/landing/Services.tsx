import { SVCS } from '../../utils'
//import { Link } from 'react-router-dom'

import './styles/Services.css'

const Services = () => {
  return (
    <section className="svc-bg" id='services'>
        <div className="container">
          <div className="svc-hd">
            <span className="tag-light">Nuestro Acompañamiento</span>
            <h2 className="st">¿Cómo puedo <em>acompañarte?</em></h2>
            <p className="sb">Cada servicio está diseñado para acompañarte de forma honesta, técnica y humana, según lo que tú y tu familia necesiten.</p>
          </div>
          <div className="svc-grid">
            {SVCS.map((s, i) => (
              <div className="svc" key={i}>
                <div className="svc-ic">{s.icon}</div>
                <div className="svc-nm">{s.name}</div>
                <p className="svc-ds">{s.desc}</p>
                {s.note && <p className="svc-nt">{s.note}</p>}

                {/** 
                <div className="svc-pr">
                  <span className="am">{s.price}</span>
                  <span className="du">{s.dur}</span>
                </div>
                */}
              </div>
            ))}
          </div>
          {/**
           * 
           
          <div className="disc">
            <div>
              <div className="dp" style={{ color: 'white' }}>15%</div>
              <div className="dl">de descuento</div>
            </div>
            <div className="dc" style={{ flex:1 }}>
              <strong>Tarifa especial para miembros de Refugio</strong>
              <p>Si eres parte de Refugio, tienes un 15% OFF en tu primera sesión individual de acompañamiento.</p>
            </div>
            <a href="#" className="bw">Ver términos</a>
          </div>
          <div style={{ textAlign:"center", marginTop:"3rem" }}>
            <Link
              to={'/agendar-cita'}
              className='bg'
            > 
              Agenda tu primera sesión →
            </Link>
          </div>
          */}
        </div>
      </section>
  )
}

export default Services