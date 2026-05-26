import { useState } from 'react'
import type { LinkItem, ProfileData } from '../linktree/linktree.types'
import { LOGO } from '../../utils'
import LinkCard from '../../components/linktree/LinkCard'
import './LinkPublicPage.css'

const MOCK_PROFILE: ProfileData = {
  name:      'Dra. Valentina Restrepo',
  bio:       'Psicóloga clínica · Acompañamiento emocional, crianza consciente y bienestar familiar. Más de 5 años acompañando familias latinoamericanas.',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
}

const MOCK_LINKS: LinkItem[] = [
  {
    id:     1,
    icon:   '📅',
    title:  'Agenda tu primera cita',
    desc:   'Sesión virtual · 50 min · Desde $70 USD',
    url:    'https://mindheart.co/therapy-formulario-de-filtro',
    active: true,
  },
  {
    id:     2,
    icon:   '🌐',
    title:  'Sitio web oficial',
    desc:   'mindheart.co/therapy',
    url:    'https://mindheart.co/therapy',
    active: true,
  },
  {
    id:     3,
    icon:   '📸',
    title:  'Instagram',
    desc:   '@psicologia.con.luz',
    url:    'https://instagram.com',
    active: true,
  },
  {
    id:     4,
    icon:   '🎥',
    title:  'YouTube',
    desc:   'Videos sobre crianza y bienestar',
    url:    'https://youtube.com',
    active: true,
  },
  {
    id:     5,
    icon:   '🎙️',
    title:  'Podcast — Crianza con Luz',
    desc:   'Disponible en Spotify y Apple Podcasts',
    url:    'https://spotify.com',
    active: true,
  },
  {
    id:     6,
    icon:   '📖',
    title:  'Blog',
    desc:   'Artículos sobre salud mental y familia',
    url:    'https://mindheart.co/blog',
    active: true,
  },
  {
    id:     7,
    icon:   '💬',
    title:  'WhatsApp',
    desc:   'Escríbeme directamente',
    url:    'https://wa.me/573000000000',
    active: false,
  },
]

/**
 * interface LinkPublicPageProps {
  profile: ProfileData
  links:   LinkItem[]
}
 */


/* ── Small reusable icons ── */
const ShareIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5"  r="3"/>
    <circle cx="6"  cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

/* ── Main Page ── */
const LinkPublicPage = () => {
  const [toastVisible, setToastVisible] = useState(false)

  const initials = MOCK_PROFILE.name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const activeLinks = MOCK_LINKS.filter(l => l.active)

  /* First active link becomes the featured CTA — or find the "cita" one */
  const featuredLink = activeLinks.find(l =>
    l.title.toLowerCase().includes('cita') ||
    l.title.toLowerCase().includes('agenda')
  ) ?? activeLinks[0]

  const regularLinks = activeLinks.filter(l => l.id !== featuredLink?.id)

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: MOCK_PROFILE.name, url })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        setToastVisible(true)
        setTimeout(() => setToastVisible(false), 2200)
      }
    } catch {
      /* user cancelled share */
    }
  }

  return (
    <div className="lpp-page">
      {/* Background decorations */}
      <div className="lpp-deco lpp-d1" />
      <div className="lpp-deco lpp-d2" />
      <div className="lpp-deco lpp-d3" />
      <div className="lpp-blob lpp-blob-1" />
      <div className="lpp-blob lpp-blob-2" />

      {/* Copied toast */}
      <div className={`lpp-toast${toastVisible ? ' show' : ''}`}>
        ¡Enlace copiado al portapapeles!
      </div>

      {/* ── Header ── */}
      <header className="lpp-header">
        <div className="lpp-logo">
          <img src={LOGO} alt="Mindheart Therapy" />
        </div>
        <button className="lpp-share-btn" onClick={handleShare}>
          <ShareIcon />
          Compartir
        </button>
      </header>

      {/* ── Profile card ── */}
      <div className="lpp-profile">
        {/* Avatar */}
        <div className="lpp-avatar-wrap">
          <div className="lpp-avatar">
            {MOCK_PROFILE.avatarUrl ? (
              <img src={MOCK_PROFILE.avatarUrl} alt={MOCK_PROFILE.name} />
            ) : (
              <span className="lpp-avatar-initials">{initials || 'M'}</span>
            )}
          </div>
          <div className="lpp-avatar-badge">
            <CheckIcon />
          </div>
        </div>

        {/* Name + bio */}
        <h1 className="lpp-name">{MOCK_PROFILE.name}</h1>
        <div className="lpp-title-tag">Psicóloga clínica</div>
        <p className="lpp-bio">{MOCK_PROFILE.bio}</p>

        {/* Stats */}
        <div className="lpp-stats">
          {[
            { n: '+500', l: 'familias' },
            { n: '5+',   l: 'años'     },
            { n: '100%', l: 'online'   },
          ].map(s => (
            <div className="lpp-stat" key={s.l}>
              <span className="lpp-stat-n">{s.n}</span>
              <span className="lpp-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Links ── */}
      <div className="lpp-links">
        {/* Featured CTA */}
        {featuredLink && (
          <LinkCard link={featuredLink} featured />
        )}

        {/* Regular links */}
        {regularLinks.map(link => (
          <LinkCard key={link.id} link={link} featured={false} />
        ))}
      </div>

      {/* ── Footer ── */}
      <footer className="lpp-footer">
        <div className="lpp-footer-brand">
          Creado con <strong>Mindheart Links</strong>
        </div>
        <div className="lpp-footer-links">
          <a href="/privacidad">Privacidad</a>
          <a href="/terminos">Términos</a>
          <a href="/contacto">Contacto</a>
        </div>
      </footer>
    </div>
  )
}

export default LinkPublicPage
