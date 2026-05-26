import React from 'react'
import './styles/Field.css'

interface FieldProps {
    label: string;
    req?: boolean;
    error?: string;
    children: React.ReactNode
}

const Field = ({ label, req, error, children } : FieldProps) => {
  return (
    <div className="field">
      <label>{label}{req && <span className="req">*</span>}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default Field