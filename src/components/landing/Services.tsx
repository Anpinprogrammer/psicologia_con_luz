import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SVCS } from '../../utils'
//import { Link } from 'react-router-dom'

import './styles/Services.css'

const Services = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState(0)

  const scrollToService = (index: number) => {
    const track = trackRef.current
    if (!track) return

    const nextIndex = Math.max(0, Math.min(index, SVCS.length - 1))
    const service = track.children[nextIndex] as HTMLElement | undefined

    if (service) {
      service.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
      setActiveService(nextIndex)
    }
  }

  const handleServicesScroll = () => {
    const track = trackRef.current
    if (!track) return

    const trackCenter = track.scrollLeft + track.clientWidth / 2
    const nextIndex = Array.from(track.children).reduce((closestIndex, child, index) => {
      const service = child as HTMLElement
      const serviceCenter = service.offsetLeft + service.offsetWidth / 2
      const closestService = track.children[closestIndex] as HTMLElement
      const closestCenter = closestService.offsetLeft + closestService.offsetWidth / 2

      return Math.abs(serviceCenter - trackCenter) < Math.abs(closestCenter - trackCenter)
        ? index
        : closestIndex
    }, 0)

    setActiveService(nextIndex)
  }

  return (
    <section className="svc-bg" id='services'>
        <div className="container">
          <div className="svc-hd">
            <span className="tag-light">Acompañamiento</span>
            <h2 className="st">¿Cómo puedo <em>acompañarte?</em></h2>
            <p className="sb">Cada servicio está diseñado para acompañarte de forma honesta, técnica y humana, según lo que tú y tu familia necesiten.</p>
          </div>
          <div className="svc-carousel">
            <div
              className="svc-grid"
              ref={trackRef}
              onScroll={handleServicesScroll}
              aria-label="Servicios disponibles"
            >
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
            <div className="svc-carousel-controls" aria-label="Controles del carrusel de servicios">
              <button
                className="svc-carousel-btn svc-carousel-btn-prev"
                type="button"
                onClick={() => scrollToService(activeService - 1)}
                disabled={activeService === 0}
                aria-label="Servicio anterior"
              >
                <ChevronLeft size={20} strokeWidth={1.9} />
              </button>

              <button
                className="svc-carousel-btn svc-carousel-btn-next"
                type="button"
                onClick={() => scrollToService(activeService + 1)}
                disabled={activeService === SVCS.length - 1}
                aria-label="Siguiente servicio"
              >
                <ChevronRight size={20} strokeWidth={1.9} />
              </button>
            </div>
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
