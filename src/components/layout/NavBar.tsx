import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
// Acceso de cuenta pausado; conservar para reactivarlo.
// import { useNavigate } from 'react-router-dom'
// import AuthModal from '../ui/AuthModal'
// import { useAuthModal } from '../../hooks/useAuthModal'
import { useAuthContext } from '../../context/AuthContext'
import './navbar.css'
import { replayScrollAnimation } from '../../hooks/useScrollAnimation'

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
  const { user } = useAuthContext()
  // Al reactivar cuenta: const { user, signOut, loading } = useAuthContext()
  // const { isOpen, view, open, close } = useAuthModal()
  const [menu, setMenu] = useState({ route: '', open: false })
  const location = useLocation()
  // const navigate = useNavigate()
  const menuOpen = menu.open && menu.route === location.key
  const navRef = useRef<HTMLElement>(null)
  const menuId = useId()
  const menuButton = useRef<HTMLButtonElement>(null)
  const closeMenu = () => {
    setMenu({ route: location.key, open: false })
    if (menuOpen) menuButton.current?.focus()
  }
  const isHome = location.pathname === '/'
  const hasNavigation = Boolean(user) || isHome || location.pathname === '/blog'
  const links = user ? memberLinks : publicLinks

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const dismiss = () => {
      setMenu({ route: location.key, open: false })
      menuButton.current?.focus()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
      if (event.key !== 'Tab') return
      const controls = Array.from(navRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), [tabindex="0"]'
      ) ?? []).filter(element => element.getClientRects().length > 0)
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1201px)')
    const onDesktop = () => { if (desktop.matches) dismiss() }
    const frame = requestAnimationFrame(() => {
      navRef.current?.querySelector<HTMLElement>('.nav-links a')?.focus()
    })
    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktop)
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen, location.key])

  /* Acceso de cuenta pausado temporalmente.
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

  */

  return (
    <>
      <nav ref={navRef} aria-label="Navegación principal" className={`nav ${menuOpen ? 'nav-menu-open' : ''} ${isStatic ? 'nav-static' : ''}`}>
        <Link className="nav-brand" to="/" aria-label="Psicología con luz — Inicio" onClick={() => {
          closeMenu()
          if (isHome) {
            replayScrollAnimation('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}>
          <img className="nav-brand-icon" src="/img/logo_solo.png" alt="" width="40" height="42" />
          <span className="nav-brand-name" aria-hidden="true">Psicología<span>con luz</span></span>
        </Link>

        {hasNavigation && (
          <ul id={menuId} className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
            {links.map(({ target, label }) => (
              <li key={target}>
                {isHome ? (
                  <ScrollLink to={target} href={`#${target}`} smooth duration={500} offset={-88}
                    spy activeClass="active-tab" onClick={() => { closeMenu(); replayScrollAnimation(target) }}>
                    {label}
                  </ScrollLink>
                ) : <Link to={`/#${target}`} onClick={closeMenu}>{label}</Link>}
              </li>
            ))}
            <li><NavLink to="/blog" className={({ isActive }) => isActive ? 'active-tab' : ''} onClick={() => { closeMenu(); replayScrollAnimation('blog') }}>Blog</NavLink></li>
            {/* <li className="nav-mobile-account">{accountButton('nav-cta-ghost')}</li> */}
            <li className="nav-mobile-actions">
            {isHome || location.pathname === '/blog' ? (
            <Link to="/agendar-cita" className="nav-cta-fill" onClick={closeMenu}>Agenda tu sesión <span aria-hidden="true">→</span></Link>
          ) : <Link to="/" className="btn-back" onClick={closeMenu}>← Volver al inicio</Link>}
            </li>
          </ul>
        )}

        <div className={`nav-right ${hasNavigation ? 'nav-right-collapsible' : ''}`}>
          {/* {accountButton(`nav-cta-ghost ${hasNavigation ? 'nav-desktop-account' : ''}`)} */}
          {isHome || location.pathname === '/blog' ? (
            <Link to="/agendar-cita" className="nav-cta-fill" onClick={closeMenu}>Agenda tu sesión <span aria-hidden="true">→</span></Link>
          ) : <Link to="/" className="btn-back" onClick={closeMenu}>← Volver al inicio</Link>}
        </div>
        {hasNavigation && (
          <button ref={menuButton} className={`ham ${menuOpen ? 'ham-open' : ''}`} type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}
            aria-controls={menuId} onClick={() => setMenu({ route: location.key, open: !menuOpen })}>
            <span /><span /><span />
          </button>
        )}
      </nav>
      {/* <AuthModal isOpen={isOpen} onClose={close} initialView={view} /> */}
    </>
  )
}

export default NavBar
