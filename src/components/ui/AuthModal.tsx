import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import './AuthModal.css'
import { useAuthContext } from '../../context/AuthContext'
import { LOGO } from '../../utils'


// ─── Types ───────────────────────────────────────────────
export type AuthView = 'login' | 'register' | 'forgot'

interface AuthModalProps {
  isOpen:    boolean
  onClose:   () => void
  initialView?: AuthView
}

// ─── Google Icon ─────────────────────────────────────────
const GoogleIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

// ─── Password strength rules ──────────────────────────────
const STRENGTH_RULES = [
  { label: '8 caracteres mínimo', test: (p: string) => p.length >= 8 },
  { label: 'Una letra mayúscula',  test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Un número',            test: (p: string) => /[0-9]/.test(p) },
]

const PAISES = [
  'Colombia','México','Argentina','Chile','España',
  'Estados Unidos','Venezuela','Perú','Ecuador','Otro',
]

// ─── Validation helpers ───────────────────────────────────
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)


// ════════════════════════════════════════════════════════
// VIEW: Login
// ════════════════════════════════════════════════════════
interface LoginViewProps {
  onSwitch: (v: AuthView) => void;
  onClose:  () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onSwitch }) => {

  const { signInWithGoogle, signIn } = useAuthContext()
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  //const [remember, setRemember] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [errors,   setErrors]   = useState<{ email?: string; password?: string }>({})
  const [loading,  setLoading]  = useState(false)
  //const [showGooglePicker, setShowGooglePicker] = useState(false)


  
  const handleSubmit = async () => {
    const e: typeof errors = {}
    if (!isEmail(email))        e.email    = 'Ingresa un correo válido'
    if (password.length < 6)    e.password = 'Mínimo 6 caracteres'
    if (Object.keys(e).length)  { setErrors(e); return }
    setErrors({})
    setLoading(true)
    await signIn(email, password)
    navigate('/patient')
  }

  return (
    <>
      <div className="am-body">
        <div className="am-field">
          <label className="am-label">Correo electrónico <span className="am-req">*</span></label>
          <input
            type="email"
            className={`am-input${errors.email ? ' err' : ''}`}
            placeholder="maria@ejemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          {errors.email && <span className="am-err-msg">{errors.email}</span>}
        </div>

        <div className="am-field">
          <div className="am-label-row">
            <label className="am-label">Contraseña <span className="am-req">*</span></label>
            <button className="am-link-btn" onClick={() => onSwitch('forgot')}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div className="am-input-wrap">
            <input
              type={showPass ? 'text' : 'password'}
              className={`am-input${errors.password ? ' err' : ''}`}
              placeholder="Tu contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button className="am-eye" type="button" onClick={() => setShowPass(p => !p)}>
              {showPass ? '🙈' : '👁'}
            </button>
          </div>
          {errors.password && <span className="am-err-msg">{errors.password}</span>}
        </div>

        {/**
         * 
         
        <div className="am-check-row">
          <input type="checkbox" id="am-rem" className="am-checkbox"
            checked={remember} onChange={e => setRemember(e.target.checked)} />
          <label htmlFor="am-rem" className="am-check-label">Mantener sesión iniciada</label>
        </div>

        */}

        <div className="am-divider"><span>o continúa con</span></div>

        <button className="am-social-btn" onClick={ () => signInWithGoogle('login') }>
          <GoogleIcon /> Continuar con Google
        </button>

        <p className="am-legal">
          ¿No tienes cuenta?{' '}
          <button className="am-link-btn am-link-inline" onClick={() => onSwitch('register')}>
            Regístrate aquí
          </button>
        </p>
      </div>

      <div className="am-footer">
        <span className="am-footer-hint">Datos protegidos con cifrado</span>
        <button className="am-btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar →'}
        </button>
      </div>
    </>
  )
}


// ════════════════════════════════════════════════════════
// VIEW: Register
// ════════════════════════════════════════════════════════
interface RegisterViewProps {
  onSwitch: (v: AuthView) => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onSwitch }) => {
  const { signUp, signInWithGoogle } = useAuthContext()
  const [form, setForm] = useState({
    nombre: '', email: '', pais: '', password: '', confirm: '', consent: false,
  })
  const [errors,    setErrors]    = useState<Record<string, string>>({})
  const [showPass,  setShowPass]  = useState(false)
  const [showConf,  setShowConf]  = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [success,   setSuccess]   = useState(false)

  const up = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))

  const strength = STRENGTH_RULES.filter(r => r.test(form.password)).length
  const strengthClass = ['', 'strength-1', 'strength-2', 'strength-3'][strength] ?? ''

  const handleSubmit = async () => {
    const e: Record<string, string> = {}
    if (!form.nombre.trim())            e.nombre   = 'Requerido'
    if (!form.pais)                     e.pais     = 'Selecciona tu país'
    if (!isEmail(form.email))           e.email    = 'Correo inválido'
    if (form.password.length < 8)       e.password = 'Mínimo 8 caracteres'
    if (form.password !== form.confirm) e.confirm  = 'Las contraseñas no coinciden'
    if (!form.consent)                  e.consent  = 'Debes aceptar los términos'
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    await signUp(form.email, form.password, form.nombre)
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="am-body am-success-wrap">
        <span className="am-success-icon">🌿</span>
        <h3 className="am-success-title">Cuenta creada <em>con éxito</em></h3>
        <p className="am-success-sub">
          Enviamos un correo de verificación a <strong>{form.email}</strong>.
          Confírmalo para comenzar tu proceso.
        </p>
        <button className="am-btn-primary am-btn-full" onClick={() => onSwitch('login')}>
          Ir a iniciar sesión →
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="am-body">
        <div className="am-grid-2">
          <div className="am-field">
            <label className="am-label">Nombre completo <span className="am-req">*</span></label>
            <input type="text" className={`am-input${errors.nombre ? ' err' : ''}`}
              placeholder="María García" value={form.nombre}
              onChange={e => up('nombre', e.target.value)} />
            {errors.nombre && <span className="am-err-msg">{errors.nombre}</span>}
          </div>
          <div className="am-field">
            <label className="am-label">País <span className="am-req">*</span></label>
            <select className={`am-input am-select${errors.pais ? ' err' : ''}`}
              value={form.pais} onChange={e => up('pais', e.target.value)}>
              <option value="">Selecciona...</option>
              {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.pais && <span className="am-err-msg">{errors.pais}</span>}
          </div>
        </div>

        <div className="am-field">
          <label className="am-label">Correo electrónico <span className="am-req">*</span></label>
          <input type="email" className={`am-input${errors.email ? ' err' : ''}`}
            placeholder="maria@ejemplo.com" value={form.email}
            onChange={e => up('email', e.target.value)} />
          {errors.email && <span className="am-err-msg">{errors.email}</span>}
        </div>

        <div className="am-grid-2">
          <div className="am-field">
            <label className="am-label">Contraseña <span className="am-req">*</span></label>
            <div className="am-input-wrap">
              <input type={showPass ? 'text' : 'password'}
                className={`am-input${errors.password ? ' err' : ''}`}
                placeholder="Mín. 8 caracteres" value={form.password}
                onChange={e => up('password', e.target.value)} />
              <button className="am-eye" type="button" onClick={() => setShowPass(p => !p)}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {form.password.length > 0 && (
              <>
                <div className="am-strength-wrap">
                  <div className={`am-strength-bar ${strengthClass}`} />
                </div>
                <div className="am-strength-rules">
                  {STRENGTH_RULES.map(r => (
                    <span key={r.label} className={`am-rule${r.test(form.password) ? ' pass' : ''}`}>
                      {r.test(form.password) ? '✓' : '○'} {r.label}
                    </span>
                  ))}
                </div>
              </>
            )}
            {errors.password && <span className="am-err-msg">{errors.password}</span>}
          </div>
          <div className="am-field">
            <label className="am-label">Confirmar contraseña <span className="am-req">*</span></label>
            <div className="am-input-wrap">
              <input type={showConf ? 'text' : 'password'}
                className={`am-input${errors.confirm ? ' err' : ''}`}
                placeholder="Repite tu contraseña" value={form.confirm}
                onChange={e => up('confirm', e.target.value)} />
              <button className="am-eye" type="button" onClick={() => setShowConf(p => !p)}>
                {showConf ? '🙈' : '👁'}
              </button>
            </div>
            {errors.confirm && <span className="am-err-msg">{errors.confirm}</span>}
          </div>
        </div>

        <div className="am-consent-box">
          <div className="am-consent-row">
            <input type="checkbox" id="am-consent" className="am-checkbox"
              checked={form.consent} onChange={e => up('consent', e.target.checked)} />
            <label htmlFor="am-consent" className="am-check-label">
              Acepto los <a href="#" className="am-link-a">términos y condiciones</a> y la{' '}
              <a href="#" className="am-link-a">política de privacidad</a>.
              Mis datos son tratados con confidencialidad.
            </label>
          </div>
          {errors.consent && (
            <span className="am-err-msg" style={{ marginTop: '0.25rem', display: 'block' }}>
              {errors.consent}
            </span>
          )}
        </div>

        <div className="am-divider"><span>o regístrate con</span></div>
        <button 
          className="am-social-btn"
          onClick={() => signInWithGoogle('signup')}
        >
          <GoogleIcon /> Continuar con Google
        </button>

        <p className="am-legal">
          ¿Ya tienes cuenta?{' '}
          <button className="am-link-btn am-link-inline" onClick={() => onSwitch('login')}>
            Inicia sesión aquí
          </button>
        </p>
      </div>

      <div className="am-footer">
        <span className="am-footer-hint">Únete a +500 familias acompañadas</span>
        <button className="am-btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear mi cuenta →'}
        </button>
      </div>
    </>
  )
}


// ════════════════════════════════════════════════════════
// VIEW: Forgot Password
// ════════════════════════════════════════════════════════
interface ForgotViewProps {
  onSwitch: (v: AuthView) => void
}

const ForgotView: React.FC<ForgotViewProps> = ({ onSwitch }) => {
  const [email,   setEmail]   = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)

  const handleSubmit = () => {
    if (!isEmail(email)) { setError('Ingresa un correo electrónico válido'); return }
    setError('')
    setLoading(true)
    // TODO: conectar con backend
    setTimeout(() => { setLoading(false); setSent(true) }, 1400)
  }

  if (sent) {
    return (
      <>
        <div className="am-body am-forgot-center">
          <span className="am-success-icon">📩</span>
          <h3 className="am-success-title">Revisa tu <em>correo</em></h3>
          <p className="am-forgot-sub">Enviamos el enlace a:</p>
          <div className="am-email-badge">{email}</div>
          <div className="am-hint-box">
            El enlace vence en <strong>30 minutos</strong>. Si no lo ves, revisa tu carpeta de spam.
          </div>
          <button className="am-btn-secondary am-btn-full" onClick={() => { setSent(false); setEmail('') }}>
            Usar otro correo
          </button>
          <button className="am-link-btn" style={{ marginTop: '0.7rem' }} onClick={() => onSwitch('login')}>
            ← Volver a iniciar sesión
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="am-body am-forgot-center">
        <div className="am-forgot-icon">🔑</div>
        <p className="am-forgot-sub">
          Ingresa el correo con el que creaste tu cuenta y te enviaremos un enlace para restablecerla.
        </p>
        <div className="am-field am-field-full">
          <label className="am-label">Correo electrónico <span className="am-req">*</span></label>
          <input
            type="email"
            className={`am-input${error ? ' err' : ''}`}
            placeholder="maria@ejemplo.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            autoFocus
          />
          {error && <span className="am-err-msg">{error}</span>}
        </div>
        <button className="am-link-btn" style={{ marginTop: '0.7rem' }} onClick={() => onSwitch('login')}>
          ← Volver a iniciar sesión
        </button>
      </div>

      <div className="am-footer">
        <span className="am-footer-hint">Recibirás el enlace en menos de 2 min</span>
        <button className="am-btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar enlace →'}
        </button>
      </div>
    </>
  )
}


// ════════════════════════════════════════════════════════
// MAIN: AuthModal
// ════════════════════════════════════════════════════════
const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState<AuthView>(initialView)
  const overlayRef      = useRef<HTMLDivElement>(null)

  // Sync la vista inicial cuando se abre
  useEffect(() => {
    if (isOpen) setView(initialView)
  }, [isOpen, initialView])

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  const titleMap: Record<AuthView, { tag: string; title: React.ReactNode }> = {
    login:    { tag: 'Bienvenida de vuelta', title: <>Accede a tu <em>cuenta</em></> },
    register: { tag: 'Empieza hoy',          title: <>Crea tu <em>espacio</em></> },
    forgot:   { tag: 'Recuperar acceso',     title: <>Restablece tu <em>contraseña</em></> },
  }

  return (
    <>
    <div
      ref={overlayRef}
      className={`am-overlay${isOpen ? ' open' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Autenticación"
    >
      <div className={`am-modal${isOpen ? ' open' : ''}`}>

        {/* Botón cerrar */}
        <button className="am-close" onClick={onClose} aria-label="Cerrar">✕</button>

        {/* ── BAND SUPERIOR ── */}
        <div className="am-band">
          <img className="am-logo" src={LOGO} alt="Mindheart Therapy" />

          {/* Tabs login / register — ocultas en forgot */}
          {view !== 'forgot' && (
            <div className="am-tabs">
              <button
                className={`am-tab${view === 'login' ? ' active' : ''}`}
                onClick={() => setView('login')}
              >
                Iniciar sesión
              </button>
              <button
                className={`am-tab${view === 'register' ? ' active' : ''}`}
                onClick={() => setView('register')}
              >
                Registrarse
              </button>
            </div>
          )}

          {/* Título y tag en forgot */}
          {view === 'forgot' && (
            <>
              <div className="am-band-tag">{titleMap.forgot.tag}</div>
              <h2 className="am-band-title">{titleMap.forgot.title}</h2>
            </>
          )}
        </div>

        {/* ── CONTENIDO DEL VIEW ACTIVO ── */}
        {view === 'login'    && <LoginView    onSwitch={setView} onClose={onClose} />}
        {view === 'register' && <RegisterView onSwitch={setView} />}
        {view === 'forgot'   && <ForgotView   onSwitch={setView} />}

      </div>
    </div>
    </>
  )
}

export default AuthModal
