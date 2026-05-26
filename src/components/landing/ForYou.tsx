import { FORYOU, FOR_ITEMS } from '../../utils'
import { Link } from 'react-router-dom'
import './styles/ForYou.css'

const ForYou = () => {
  return (
    <section className='section-bg'>
        <div className="container">
          <div className="fy-g">
            <div>
              <span className="tag-light">¿Es para mí?</span>
              <h2 className="st" style={{ marginBottom:"2rem" }}>Este espacio es<br /><em>para ti si…</em></h2>
              <ul className="fy-list">
                {FOR_ITEMS.map((x, i) => (
                  <li className="fy-item" key={i}>
                    <div className="fy-dot" />
                    <div>
                      <strong>{x.t}</strong>
                      <p>{x.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop:"2.5rem" }}>
                <Link
                  to={'/agendar-cita'}
                  className='bg'
                > 
                  Agenda tu primera sesión →
                </Link>
              </div>
            </div>
            <div className="fy-img"><img src={FORYOU} alt="Para ti" /></div>
          </div>
        </div>
      </section>
  )
}

export default ForYou