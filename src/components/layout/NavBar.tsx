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
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const h = () => setStuck(window.scrollY > window.innerHeight - 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash]);

  const handleLogo = () => {
    setMenuOpen(false)
    navigate('/')
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  const handleLogout = async () => {
    signOut()
    setMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)
  const navLinksClass = `nav-links ${menuOpen ? 'nav-links-open' : ''}`

  if(loading) return 'Cargando...'

  return (
        <>
          <nav className={`nav ${stuck ? "stuck" : ""} ${isStatic ? "nav-static" : ""}`}>
            <button
              onClick={handleLogo}
              style={{
                textDecoration:'none',
                border:'none',
                outline:'none',
                background:'transparent',
                padding:0,
                cursor:'pointer'
              }}
            >
              <div className="nav-logo"><img src={LOGO} alt="Psicologia con Luz" /></div>
            </button>
            {user ? (
              <>
                <ul className={navLinksClass}>
                  <li>
                    <ScrollLink to="about" onClick={closeMenu}>
                      Inicio
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="services" onClick={closeMenu}>
                      Tareas
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="team" onClick={closeMenu}>
                      Citas
                    </ScrollLink>
                  </li>
                  <li>
                    <RouterLink to="/blog" onClick={closeMenu}>
                      Blog
                    </RouterLink>
                  </li>
                </ul>
              </>
            ) : (
              <>
                {location.pathname === '/' || location.pathname === '/blog' ? (
                  <>
                  { location.pathname === '/' ? (
                    <ul className={navLinksClass}>
                      <li>
                        <ScrollLink to="about" onClick={closeMenu}>
                          ¿Quién te Acompaña?
                        </ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="services" onClick={closeMenu}>
                          Acompañamiento
                        </ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="packages" onClick={closeMenu}>
                          Planes
                        </ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="team" onClick={closeMenu}>
                          Nuestro Equipo
                        </ScrollLink>
                      </li>
                      <li>
                        <RouterLink to="/blog" onClick={closeMenu}>
                          Blog
                        </RouterLink>
                      </li>
                    </ul>
                  ) : (
                    <ul className={navLinksClass}>
                      <li>
                        <RouterLink to="/#about" onClick={closeMenu}>
                          ¿Quién te Acompaña?
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/#services" onClick={closeMenu}>
                          Acompañamiento
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/#packages" onClick={closeMenu}>
                          Planes
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/#team" onClick={closeMenu}>
                          Nuestro Equipo
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/blog" onClick={closeMenu}>
                          Blog
                        </RouterLink>
                      </li>
                    </ul>
                  )

                  }
                  </>
                ) : null}
              </>
            )}

            <div className="nav-right">
              <button
                className="nav-cta-ghost"
                onClick={() => {
                  if (user) {
                    handleLogout()
                  } else {
                    setMenuOpen(false)
                    open('login')
                  }
                }}
              >
                {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
              </button>

              {location.pathname === '/' || location.pathname === '/blog' ? (
                <RouterLink
                  to="/agendar-cita"
                  className="nav-cta-fill"
                  onClick={closeMenu}
                >
                  Agenda tu sesión →
                </RouterLink>
              ) : (
                <button className="btn-back" onClick={() => { closeMenu(); navigate("/") }}>← Volver al inicio</button>
              )}
            </div>
            <button
              className={`ham ${menuOpen ? 'ham-open' : ''}`}
              type="button"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(open => !open)}
            >
              <span /><span /><span />
            </button>
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
