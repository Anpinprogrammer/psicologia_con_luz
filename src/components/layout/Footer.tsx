import { useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { replayScrollAnimation } from '../../hooks/useScrollAnimation'
import './Footer.css'

function externalUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined
  } catch { return undefined }
}

const menuLinks = [
  { to: '/#about', label: '¿Quién te acompaña?', id: 'about' },
  { to: '/#services', label: 'Acompañamiento', id: 'services' },
  { to: '/#packages', label: 'Planes', id: 'packages' },
  { to: '/#foryou', label: '¿Es para mí?', id: 'foryou' },
  { to: '/blog', label: 'Blog' },
  { to: '/#contact', label: 'Contáctanos', id: 'contact' },
]

const helpLines = [
  { number: '123', href: 'tel:123', label: 'Emergencias · Colombia' },
  { number: '106', href: 'tel:106', label: 'Escucha y apoyo psicosocial · Bogotá' },
  { number: '01 8000 112 439', href: 'tel:018000112439', label: 'Línea Psicoactiva · Bogotá' },
  { number: '155', href: 'tel:155', label: 'Orientación a mujeres víctimas de violencia · Colombia' },
]

function SocialIcon({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'LinkedIn' && <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7M7 7h.01M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>}
    {name === 'Instagram' && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>}
    {name === 'WhatsApp' && <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-4.7A8.5 8.5 0 1 1 20.5 11.5Z" /><path d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 2c-1 3-5 1-7-1S6 9 8 7Z" /></>}
    {name === 'TikTok' && <><path d="M14 3v12a4 4 0 1 1-4-4M14 3c1 4 3 5 6 5M14 7c2 3 4 4 6 4" /></>}
  </svg>
}

export default function Footer() {
  const location = useLocation()
  const socialTooltipId = useId()
  const [activeSocial, setActiveSocial] = useState<string | null>(null)
  const phone = String(import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')
  const socials = [
    { name: 'LinkedIn', href: externalUrl(import.meta.env.VITE_LINKEDIN_URL) },
    { name: 'Instagram', href: externalUrl(import.meta.env.VITE_INSTAGRAM_URL) },
    { name: 'WhatsApp', href: phone ? `https://wa.me/${phone}` : undefined },
    { name: 'TikTok', href: externalUrl(import.meta.env.VITE_TIKTOK_URL) },
  ]
  const legalLinks = [
    { label: 'Términos y condiciones', href: externalUrl(import.meta.env.VITE_TERMS_URL) },
    { label: 'Política de privacidad', href: externalUrl(import.meta.env.VITE_PRIVACY_URL) },
  ]
  const navigateToSection = (id?: string) => {
    if (!id || location.pathname !== '/') return
    replayScrollAnimation(id)
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <footer className="site-footer">
      <div className="container site-footer__container">
        <div className="site-footer__grid">
          <div className="site-footer__brand footer-brand">
            <Link className="site-footer__brand-link" to="/" aria-label="Psicología con luz — Inicio" onClick={() => {
              if (location.pathname === '/') {
                replayScrollAnimation('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}>
              <div className="footer-logo-icon-wrapper">
                <img src="/img/logo_solo.png" alt="" width="48" height="48" />
              </div>
              <span className="site-footer__brand-text" aria-hidden="true">
                <span className="site-footer__brand-title">Psicología</span>
                <span className="site-footer__brand-subtitle">con luz</span>
              </span>
            </Link>
            <p>Mereces un espacio seguro y cercano para comprender lo que sientes y cuidar tu bienestar emocional.</p>
          </div>

          <nav className="site-footer__column" aria-label="Menú del pie de página">
            <h2>Menú</h2>
            <ul>{menuLinks.map(({ to, label, id }) => <li key={to}><Link to={to} onClick={() => navigateToSection(id)}>{label}</Link></li>)}</ul>
          </nav>

          <div className="site-footer__column">
            <h2>Legal</h2>
            <ul>{legalLinks.map(({ label, href }) => <li key={label}>{href ? (
              <a href={href} target="_blank" rel="noopener noreferrer">{label}<span className="site-footer__sr-only"> (abre en una nueva pestaña)</span></a>
            ) : <span className="site-footer__pending">{label}<small>Próximamente</small></span>}</li>)}</ul>
          </div>

          <div className="site-footer__column">
            <h2>Redes</h2>
            <ul className="site-footer__social-list">
              {socials.map(({ name, href }, index) => {
                const tooltipId = `${socialTooltipId}-${index}`
                const tooltipOpen = activeSocial === name
                return (
                  <li className="site-footer__social-item" key={name}
                    onMouseEnter={() => setActiveSocial(name)} onMouseLeave={() => setActiveSocial(null)}
                    onFocus={() => setActiveSocial(name)} onBlur={() => setActiveSocial(null)}
                    onKeyDown={event => { if (event.key === 'Escape') setActiveSocial(null) }}>
                    {href ? (
                      <a className="site-footer__social site-footer__social--active" href={href}
                        target="_blank" rel="noopener noreferrer" aria-label={`${name} (abre en una nueva pestaña)`}
                        aria-describedby={tooltipOpen ? tooltipId : undefined}>
                        <SocialIcon name={name} />
                      </a>
                    ) : (
                      <button className="site-footer__social" type="button" aria-label={`${name}: próximamente`}
                        aria-describedby={tooltipOpen ? tooltipId : undefined} onClick={() => setActiveSocial(name)}>
                        <SocialIcon name={name} />
                      </button>
                    )}
                    {tooltipOpen && <span className="site-footer__tooltip" id={tooltipId} role="tooltip">
                      {name}{!href && <span>Próximamente</span>}
                    </span>}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <aside className="site-footer__support" aria-labelledby="footer-support-title">
          <div className="site-footer__support-heading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 22 20H2ZM12 9v5m0 3h.01" /></svg>
            <h2 id="footer-support-title">Líneas de atención y emergencia</h2>
          </div>
          <ul className="site-footer__help-lines">{helpLines.map(({ number, href, label }) => (
            <li key={number}><a href={href}><strong>{number}</strong><span>{label}</span></a></li>
          ))}</ul>
          <p className="site-footer__sources">Información de atención: <a href="https://bogota.gov.co/mi-ciudad/salud/donde-llamar-para-recibir-atencion-psicosocial-y-juridica-en-bogota" target="_blank" rel="noopener noreferrer">Alcaldía de Bogotá<span className="site-footer__sr-only"> (abre en una nueva pestaña)</span></a> · <a href="https://radio.policia.gov.co/index.php/patrulla-purpura" target="_blank" rel="noopener noreferrer">Policía Nacional<span className="site-footer__sr-only"> (abre en una nueva pestaña)</span></a></p>
        </aside>

        <div className="site-footer__bottom">
          <p>© 2026 Psicología con luz. Todos los derechos reservados.</p>
          <p>Acompañamiento creado con luz y cuidado <span aria-hidden="true">♥</span></p>
        </div>
      </div>
    </footer>
  )
}
