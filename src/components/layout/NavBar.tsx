import { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { LOGO } from '../../utils';
import AuthModal from '../ui/AuthModal';
import { useAuthModal } from '../../hooks/useAuthModal';
import { useAuthContext } from '../../context/AuthContext';

import './navbar.css'

const NavBar = ({ static: isStatic = false }: { static?: boolean }) => {
  const { user, signOut, loading } = useAuthContext()
  const { isOpen, view, open, close } = useAuthModal();
  const [stuck, setStuck] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const h = () => setStuck(window.scrollY > window.innerHeight - 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleLogout = async () => {
    signOut()
    navigate('/')
  }

  if(loading) return 'Cargando...'

  return (
        <>
          <nav className={`nav ${stuck ? "stuck" : ""} ${isStatic ? "nav-static" : ""}`}>
            {user ? (
              <>
                <ScrollLink to="home">
                  <div className="nav-logo"><img src={LOGO} alt="Psicologia con Luz" /></div>
                </ScrollLink>
                <ul className="nav-links">
                  <li>
                    <ScrollLink to="about">
                      Inicio
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="services">
                      Tareas
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="team">
                      Citas
                    </ScrollLink>
                  </li>
                  <li>
                    <RouterLink to="/blog">
                      Blog
                    </RouterLink>
                  </li>
                </ul>
              </>
            ) : (
              <>
                {location.pathname === '/' || location.pathname === '/blog' ? (
                  <>
                    <ScrollLink to="home">
                      <div className="nav-logo"><img src={LOGO} alt="Psicologia con Luz" /></div>
                    </ScrollLink>
                    <ul className="nav-links">
                      <li>
                        <ScrollLink to="about">
                          Quiénes somos
                        </ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="services">
                          Servicios
                        </ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="team">
                          Nuestro Equipo
                        </ScrollLink>
                      </li>
                      <li>
                        <RouterLink to="/blog">
                          Blog
                        </RouterLink>
                      </li>
                    </ul>
                  </>
                ) : (
                  <RouterLink to="/">
                    <div className="nav-logo"><img src={LOGO} alt="Psicologia con Luz" /></div>
                  </RouterLink>
                )}
              </>
            )}

            <div className="nav-right">
              <button
                className="nav-cta-ghost"
                onClick={() => {
                  if (user) {
                    handleLogout()
                  } else {
                    open('login')
                  }
                }}
              >
                {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
              </button>

              {location.pathname === '/' ? (
                <RouterLink
                  to="/agendar-cita"
                  className="nav-cta-fill"
                >
                  Agenda tu sesión →
                </RouterLink>
              ) : (
                <button className="btn-back" onClick={() => navigate("/")}>← Volver al inicio</button>
              )}
            </div>
            <div className="ham"><span /><span /><span /></div>
          </nav>
          <AuthModal
            isOpen={isOpen}
            onClose={close}
            initialView={view}
          />
        
    </>
  )
}

export default NavBar