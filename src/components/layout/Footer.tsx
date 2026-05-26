import React from 'react'
import { LOGO } from '../../utils'
import './Footer.css'

const Footer = () => {

  const getYear = () => {
    const year = new Date().getFullYear()
    return year
  }

  getYear()

  return (
    <footer>
        <div className="container">
          <div className="footer-g">
            <div className="footer-brand">
              <div className="footer-logo"><img src={LOGO} alt="Psicologia con Luz" /></div>
              <p>Mereces un espacio seguro y actualizado para trabajar en ti.</p>
              <div className="emrg">
                <p><strong>Emergencias:</strong> 123</p>
                <p><strong>Línea crisis emocional (Bogotá):</strong> 106</p>
                <p><strong>Línea Psicoactiva:</strong> 01 8000 112 439</p>
                <p><strong>Apoyo a mujeres en violencia:</strong> Línea 155</p>
              </div>
            </div>
            <div className="fc">
              <h4>Menú</h4>
              <ul>
                <li><a href="#">Quiénes somos</a></li>
                <li><a href="#">Página principal</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Contáctanos</a></li>
                <li><a href="#">Únete al equipo</a></li>
              </ul>
            </div>
            <div className="fc">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Términos y condiciones</a></li>
                <li><a href="#">Política de privacidad</a></li>
                <li><a href="#">Aviso de No Discriminación</a></li>
                <li><a href="#">Servicios Clínicos</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bot">
            <p>© {getYear()} Vitalia. Todos los derechos reservados.</p>
            <p>Hecho con cuidado ♥</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer