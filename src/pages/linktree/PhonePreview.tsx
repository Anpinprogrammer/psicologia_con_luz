import React from 'react'
import type { LinkItem, ProfileData } from './linktree.types'
import { ICON_BG } from './linktree.constants'
import './components.css'

interface PhonePreviewProps {
  profile: ProfileData
  links:   LinkItem[]
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ profile, links }) => {
  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const activeLinks = links.filter(l => l.active)

  return (
    <div className="pp-wrap">
      <p className="pp-label">Vista previa en tiempo real</p>

      {/* Phone frame */}
      <div className="pp-frame">
        <div className="pp-notch">
          <div className="pp-notch-pill" />
        </div>

        <div className="pp-screen">
          {/* Avatar */}
          <div className="pp-avatar">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} />
            ) : (
              <span>{initials || 'M'}</span>
            )}
          </div>

          {/* Name + bio */}
          <p className="pp-name">{profile.name || 'Tu nombre'}</p>
          <p className="pp-bio">{profile.bio || 'Tu biografía...'}</p>

          {/* Links */}
          <div className="pp-links">
            {activeLinks.length === 0 && (
              <p className="pp-empty">Agrega enlaces para verlos aquí</p>
            )}
            {activeLinks.map(link => (
              <div key={link.id} className="pp-link">
                <div
                  className="pp-link-icon"
                  style={{ background: ICON_BG[link.icon] ?? '#EDE8FA' }}
                >
                  {link.icon}
                </div>
                <div className="pp-link-text">
                  <span className="pp-link-title">
                    {link.title || 'Sin título'}
                  </span>
                  {link.desc && (
                    <span className="pp-link-desc">{link.desc}</span>
                  )}
                </div>
                <span className="pp-link-arrow">›</span>
              </div>
            ))}
          </div>

          <p className="pp-footer">
            Creado con <strong>Mindheart Links</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PhonePreview
