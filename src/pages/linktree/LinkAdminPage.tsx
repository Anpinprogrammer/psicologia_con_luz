import React, { useState, useRef } from 'react'
import type { LinkItem, ProfileData } from './linktree.types'
import { DEFAULT_PROFILE, DEFAULT_LINKS } from './linktree.constants'
import { useDragSort } from './useDragSort'
import LinkCard     from './LinkCard'
import PhonePreview from './PhonePreview'
import './LinkAdminPage.css'

const LOGO = 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N1QyCV9DrYsFR4irNtOO/media/695d42f6d5b483386fc5927c.png'

const LinkAdminPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [links,   setLinks]   = useState<LinkItem[]>(DEFAULT_LINKS)
  const [saved,   setSaved]   = useState(false)
  const nextId = useRef(Math.max(...DEFAULT_LINKS.map(l => l.id), 0) + 1)

  /* Drag sort hook */
  const { dragHandlers, draggingId, overTargetId } = useDragSort(links, setLinks)

  /* Profile updates */
  const upProfile = (k: keyof ProfileData, v: string) =>
    setProfile(p => ({ ...p, [k]: v }))

  /* Link updates */
  const upLink = (id: number, field: keyof LinkItem, value: string | boolean) =>
    setLinks(ls => ls.map(l => l.id === id ? { ...l, [field]: value } : l))

  const deleteLink = (id: number) =>
    setLinks(ls => ls.filter(l => l.id !== id))

  const addLink = () => {
    const newLink: LinkItem = {
      id:     nextId.current++,
      icon:   '🔗',
      title:  '',
      desc:   '',
      url:    '',
      active: true,
    }
    setLinks(ls => [...ls, newLink])
  }

  /* Save */
  const handleSave = () => {
    // TODO: persist to Supabase
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  /* Initials for avatar preview */
  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="la-root">

      {/* ── TOP BAR ── */}
      <header className="la-topbar">
        <div className="la-topbar-left">
          <img src={LOGO} alt="Mindheart" className="la-topbar-logo" />
          <span className="la-topbar-divider" />
          <span className="la-topbar-title">Links</span>
          <span className="la-topbar-badge">Admin</span>
        </div>
        <div className="la-topbar-right">
          {saved && <span className="la-saved-badge">¡Guardado!</span>}
          <a
            href="/links"
            target="_blank"
            rel="noopener noreferrer"
            className="la-btn-ghost"
          >
            Ver página pública ↗
          </a>
          <button className="la-btn-save" onClick={handleSave}>
            Guardar cambios
          </button>
        </div>
      </header>

      {/* ── TWO COLUMNS ── */}
      <div className="la-layout">

        {/* ── LEFT: EDITOR ── */}
        <div className="la-editor">

          {/* Profile section */}
          <section className="la-section">
            <h3 className="la-section-title">Perfil</h3>

            {/* Avatar */}
            <div className="la-profile-row">
              <div className="la-avatar-preview">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.name} />
                ) : (
                  <span>{initials || 'M'}</span>
                )}
              </div>
              <div className="la-avatar-url">
                <p className="la-avatar-hint">URL de foto de perfil</p>
                <input
                  className="la-input"
                  placeholder="https://tu-foto.jpg"
                  value={profile.avatarUrl}
                  onChange={e => upProfile('avatarUrl', e.target.value)}
                  style={{ fontSize: '0.78rem' }}
                />
              </div>
            </div>

            <div className="la-field">
              <label className="la-label">Nombre</label>
              <input
                className="la-input"
                value={profile.name}
                onChange={e => upProfile('name', e.target.value)}
              />
            </div>

            <div className="la-field">
              <label className="la-label">Biografía</label>
              <textarea
                className="la-input la-textarea"
                value={profile.bio}
                onChange={e => upProfile('bio', e.target.value)}
                rows={2}
              />
            </div>
          </section>

          {/* Links section */}
          <section className="la-section">
            <h3 className="la-section-title">
              Tus enlaces
              <span className="la-section-hint">
                Arrastra para reordenar
              </span>
            </h3>

            <div className="la-drag-list">
              {links.map(link => (
                <LinkCard
                  key={link.id}
                  link={link}
                  isDragging={draggingId  === link.id}
                  isOver={overTargetId === link.id}
                  dragHandlers={dragHandlers(link.id)}
                  onChange={upLink}
                  onDelete={deleteLink}
                />
              ))}
            </div>

            <button className="la-btn-add" onClick={addLink}>
              + Agregar enlace
            </button>
          </section>

        </div>

        {/* ── RIGHT: PREVIEW ── */}
        <div className="la-preview-col">
          <PhonePreview profile={profile} links={links} />
        </div>

      </div>
    </div>
  )
}

export default LinkAdminPage
