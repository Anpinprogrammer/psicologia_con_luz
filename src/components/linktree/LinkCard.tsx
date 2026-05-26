import React from 'react'
import { type LinkItem } from '../../pages/linktree/linktree.types'
import { ICON_BG } from '../../pages/linktree/linktree.constants'

import './linkcard.css'

/* ── Link Card ── */
interface LinkCardProps {
  link:     LinkItem
  featured: boolean
}

const LinkCard = ({ link, featured } : LinkCardProps) => {
  return (
    <a
        href={link.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={`lpp-link${featured ? ' featured' : ''}`}
      >
        <div
          className="lpp-link-icon"
          style={{ background: featured ? 'rgba(255,255,255,0.2)' : (ICON_BG[link.icon] ?? '#EDE8FA') }}
        >
          {link.icon}
        </div>
        <div className="lpp-link-body">
          {featured && <span className="lpp-feat-badge">Reserva tu espacio</span>}
          <span className="lpp-link-title">{link.title}</span>
          {link.desc && <span className="lpp-link-desc">{link.desc}</span>}
        </div>
        <span className="lpp-link-arrow">{featured ? '→' : '›'}</span>
      </a>
  )
}

export default LinkCard