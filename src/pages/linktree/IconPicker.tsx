import React from 'react'
import { AVAILABLE_ICONS, ICON_BG } from './linktree.constants'
import './components.css'

interface IconPickerProps {
  current:  string
  onSelect: (icon: string) => void
  onClose:  () => void
}

const IconPicker: React.FC<IconPickerProps> = ({ current, onSelect, onClose }) => (
  <div className="ip-wrap">
    {AVAILABLE_ICONS.map(ic => (
      <button
        key={ic}
        className={`ip-opt${ic === current ? ' selected' : ''}`}
        style={{ background: ic === current ? undefined : ICON_BG[ic] }}
        onClick={() => { onSelect(ic); onClose() }}
        type="button"
      >
        {ic}
      </button>
    ))}
  </div>
)

export default IconPicker
