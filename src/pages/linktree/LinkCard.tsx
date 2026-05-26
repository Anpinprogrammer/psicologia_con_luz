import React, { useState } from 'react'
import type { LinkItem } from './linktree.types'
import { ICON_BG } from './linktree.constants'
import IconPicker from './IconPicker'
import './components.css'

interface DragHandlers {
  draggable:   true
  onDragStart: (e: React.DragEvent) => void
  onDragEnd:   (e: React.DragEvent) => void
  onDragOver:  (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop:      (e: React.DragEvent) => void
}

interface LinkCardProps {
  link:         LinkItem
  isDragging:   boolean
  isOver:       boolean
  dragHandlers: DragHandlers   // ← sin import externo
  onChange:     (id: number, field: keyof LinkItem, value: string | boolean) => void
  onDelete:     (id: number) => void
}

const LinkCard: React.FC<LinkCardProps> = ({
  link, isDragging, isOver, dragHandlers, onChange, onDelete,
}) => {
  const [pickerOpen, setPickerOpen] = useState(false)

  return (
    <div
      {...dragHandlers}
      className={`lc-card${isDragging ? ' dragging' : ''}${isOver ? ' over' : ''}`}
    >
      {/* Top row: handle + icon + inputs + delete */}
      <div className="lc-top">

        {/* Drag handle */}
        <div className="lc-handle" title="Arrastrar para reordenar">
          <span /><span /><span />
        </div>

        {/* Icon button + picker */}
        <div className="lc-icon-wrap">
          <button
            type="button"
            className="lc-icon-btn"
            style={{ background: ICON_BG[link.icon] ?? '#EDE8FA' }}
            onClick={() => setPickerOpen(p => !p)}
            title="Cambiar ícono"
          >
            {link.icon}
          </button>
          {pickerOpen && (
            <div className="lc-picker-pop">
              <IconPicker
                current={link.icon}
                onSelect={icon => onChange(link.id, 'icon', icon)}
                onClose={() => setPickerOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Text inputs */}
        <div className="lc-inputs">
          <input
            className="lc-inp"
            placeholder="Título del enlace"
            value={link.title}
            onChange={e => onChange(link.id, 'title', e.target.value)}
          />
          <input
            className="lc-inp"
            placeholder="Descripción (opcional)"
            value={link.desc}
            onChange={e => onChange(link.id, 'desc', e.target.value)}
          />
          <input
            className="lc-inp lc-inp-url"
            placeholder="https://..."
            value={link.url}
            onChange={e => onChange(link.id, 'url', e.target.value)}
          />
        </div>

        {/* Delete */}
        <button
          type="button"
          className="lc-del"
          onClick={() => onDelete(link.id)}
          title="Eliminar enlace"
        >
          ✕
        </button>
      </div>

      {/* Bottom row: visible toggle */}
      <div className="lc-bottom">
        <button
          type="button"
          className={`lc-toggle${link.active ? ' on' : ''}`}
          onClick={() => onChange(link.id, 'active', !link.active)}
          aria-label={link.active ? 'Ocultar' : 'Mostrar'}
        >
          <div className="lc-toggle-knob" />
        </button>
        <span className="lc-toggle-lbl">
          {link.active ? 'Visible' : 'Oculto'}
        </span>
      </div>
    </div>
  )
}

export default LinkCard
