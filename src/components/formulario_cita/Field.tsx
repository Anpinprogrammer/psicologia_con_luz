import { cloneElement, useId, type ReactElement } from 'react'
import './styles/Field.css'

type ControlProps = {
  id?: string
  'aria-invalid'?: boolean
  'aria-required'?: boolean
  'aria-describedby'?: string
}
interface FieldProps {
  label: string
  req?: boolean
  error?: string
  fullWidth?: boolean
  children: ReactElement<ControlProps>
}

export default function Field({ label, req, error, fullWidth, children }: FieldProps) {
  const generatedId = useId()
  const id = children.props.id ?? generatedId
  const errorId = `${id}-error`
  const describedBy = [children.props['aria-describedby'], error ? errorId : undefined].filter(Boolean).join(' ') || undefined
  return (
    <div className={`field${fullWidth ? ' field--full' : ''}`}>
      <label htmlFor={id}>{label}{req && <span className="req" aria-hidden="true">*</span>}</label>
      {cloneElement(children, { id, 'aria-invalid': Boolean(error), 'aria-required': req, 'aria-describedby': describedBy })}
      {error && <span className="field-error" id={errorId} role="alert">{error}</span>}
    </div>
  )
}
