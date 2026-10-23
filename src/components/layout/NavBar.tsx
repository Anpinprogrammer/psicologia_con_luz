import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { LOGO, LOGO_NOMBRE } from '../../utils'
import AuthModal from '../ui/AuthModal'
import { useAuthModal } from '../../hooks/useAuthModal'
import { useAuthContext } from '../../context/AuthContext'
import './navbar.css'

const publicLinks = [
  { target: 'about', label: '¿Quién te acompaña?' },
  { target: 'services', label: 'Acompañamiento' },
  { target: 'packages', label: 'Planes' },
  { target: 'foryou', label: '¿Es para mí?' },
] as const
const memberLinks = [
  { target: 'about', label: 'Inicio' },
  { target: 'services', label: 'Tareas' },
  { target: 'team', label: 'Citas' },
] as const

type NavBarProps = { static?: boolean }

const NavBar = ({ static: isStatic = false }: NavBarProps) => {
  const { user, signOut, loading } = useAuthContext()
  const { isOpen, view, open, close } = useAuthModal()
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const menuId = useId()
  const menuButton = useRef<HTMLButtonElement>(null)
  const closeMenu = () => setMenuOpen(false)
  const isHome = location.pathname === '/'
  const hasNavigation = Boolean(user) || isHome || location.pathname === '/blog'
  const links = user ? memberLinks : publicLinks

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(closeMenu, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1201px)')
    const onDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    window.addEventListener('keydown', onEscape)
    desktop.addEventListener('change', onDesktop)
    return () => {
      window.removeEventListener('keydown', onEscape)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])

  const handleAccount = async () => {
    closeMenu()
    if (user) {
      await signOut()
      navigate('/')
    } else {
      open('login')
    }
  }

  const accountButton = (className: string) => (
    <button type="button" className={className} onClick={handleAccount} disabled={loading}>
      {loading ? 'Cargando…' : user ? 'Cerrar sesión' : 'Iniciar sesión'}
    </button>
  )

  return (
    <>
      <nav aria-label="Navegación principal" className={`nav ${stuck ? 'stuck' : ''} ${isStatic ? 'nav-static' : ''}`}>
        <Link className="nav-brand" to="/" aria-label="Psicología con luz — Inicio" onClick={() => {
          closeMenu()
          if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
        }}>
          <span className="logo-container">
            <img className="nav-logo" src={LOGO} alt="Psicología con luz" />
            <img className="nav-logo-mobile" src={LOGO_NOMBRE} alt="Psicología con luz" />
          </span>
        </Link>

        {hasNavigation && (
          <ul id={menuId} className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
            {links.map(({ target, label }) => (
              <li key={target}>
                {isHome ? (
                  <ScrollLink to={target} href={`#${target}`} smooth duration={500} offset={-112}
                    spy activeClass="active-tab" onClick={closeMenu}>
                    {label}
                  </ScrollLink>
                ) : <Link to={`/#${target}`} onClick={closeMenu}>{label}</Link>}
              </li>
            ))}
            <li><NavLink to="/blog" className={({ isActive }) => isActive ? 'active-tab' : ''} onClick={closeMenu}>Blog</NavLink></li>
            {isHome || location.pathname === '/blog' ? (
            <Link to="/agendar-cita" className="nav-cta-fill" onClick={closeMenu}>Agenda tu sesión <span aria-hidden="true">→</span></Link>
          ) : <Link to="/" className="btn-back" onClick={closeMenu}>← Volver al inicio</Link>}
            {/** 
            <li className="nav-mobile-account">{accountButton('nav-cta-ghost')}</li>
            */}
          </ul>
        )}

        <div className="nav-right">
          {accountButton(`nav-cta-ghost ${hasNavigation ? 'nav-desktop-account' : ''}`)}
          {isHome || location.pathname === '/blog' ? (
            <Link to="/agendar-cita" className="nav-cta-fill" onClick={closeMenu}>Agenda tu sesión <span aria-hidden="true">→</span></Link>
          ) : <Link to="/" className="btn-back" onClick={closeMenu}>← Volver al inicio</Link>}
        </div>
        {hasNavigation && (
          <button ref={menuButton} className={`ham ${menuOpen ? 'ham-open' : ''}`} type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}
            aria-controls={menuId} onClick={() => setMenuOpen(value => !value)}>
            <span /><span /><span />
          </button>
        )}
      </nav>
      <AuthModal isOpen={isOpen} onClose={close} initialView={view} />
    </>
  )
}

export default NavBar
