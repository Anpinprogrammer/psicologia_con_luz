import { Brain, Heart, Leaf, MapPin, Monitor } from 'lucide-react';
import './styles/StepServicio.css'
import { type DataTransmiting } from '../../types';
import { SERVICES } from '../../utils';

const packageIcons = {
  'espacio-inicial': <Leaf size={30} />,
  acompanamiento: <Brain size={30} />,
  continuo: <Heart size={30} />,
};

const packageBadges = {
  'espacio-inicial': '1 sesión',
  acompanamiento: '4 sesiones',
  continuo: '8 sesiones',
};

const modalityOptions = [
  {
    id: 'virtual',
    icon: <Monitor size={22} />,
    label: 'Virtual',
    sub: 'Sesión online desde cualquier lugar',
  },
  {
    id: 'presencial',
    icon: <MapPin size={22} />,
    label: 'Presencial',
    sub: 'Atención en consultorio',
  },
];

const zoneOptions = [
  { id: 'zona-sur', label: 'Zona sur', sub: 'Consultorio al sur de la ciudad' },
  { id: 'zona-norte', label: 'Zona norte', sub: 'Consultorio al norte de la ciudad' },
];

const StepServicio = ({ data, setData, errors } : DataTransmiting) => {
  const up = (k: string, v: string) => setData(p => ({ ...p, [k]: v }));
  const selectModality = (value: string) => {
    setData(p => ({
      ...p,
      modalidad: value,
      zona: value === 'presencial' ? p.zona : '',
    }));
  };

  return (
    <div className="fade">
      {errors.svc&&<p className="svc-error">{errors.svc}</p>}

      <div className="package-select-grid" aria-label="Selecciona un paquete">
        {SERVICES.map(s=>(
          <button
            key={s.id}
            type="button"
            className={`package-option${data.svc===s.id && s.popular ? " selgold" : data.svc===s.id ?" sel":""}${s.popular?" popular":""} `}
            onClick={()=>{up("svc",s.id) }}
          >
            {s.popular && (
              <span className="package-popular">
                Más elegido <span aria-hidden="true">★</span>
              </span>
            )}

            <div className="package-option-head">
              <span className={`package-option-icon ${data.svc===s.id && s.popular ? " selgold" : data.svc===s.id ?" sel":""} ${s.popular ? 'gold': ''}`}>
                {packageIcons[s.id as keyof typeof packageIcons]}
              </span>
              <span className={`package-option-badge${s.popular ? ' gold' : ''} ${data.svc===s.id && s.popular ? " selgold" : data.svc===s.id ?" sel":""}`}>
                {packageBadges[s.id as keyof typeof packageBadges]}
              </span>
            </div>

            <h3>{s.name}</h3>
            

            <div className="package-option-footer">
              <span className={`package-check${s.popular ? ' gold' : ''} ${data.svc===s.id && s.popular ? " selgold" : data.svc===s.id ?" sel":""}`}>✓</span>
              <strong>{s.dur}</strong>
            </div>
          </button>
        ))}
      </div>

      
      <div className="step1-bottom">
        <div className="booking-mode-group">
          <p className="col-label">Modalidad<span className="req">*</span></p>
          {errors.modalidad&&<p className="mod-error">{errors.modalidad}</p>}
          <div className="mod-row">
            {modalityOptions.map(m=>(
              <button
                key={m.id}
                type="button"
                className={`mod-pill${data.modalidad===m.id?" sel":""}`}
                onClick={()=>selectModality(m.id)}
              >
                <span className="mod-icon">{m.icon}</span>
                <span>
                  <span className="mod-label">{m.label}</span>
                  <span className="mod-sub">{m.sub}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {data.modalidad === 'presencial' && (
            <div className="zone-panel">
              <p className="col-label">Zona de atención<span className="req">*</span></p>
              {errors.zona&&<p className="mod-error">{errors.zona}</p>}
              <div className="zone-row">
                {zoneOptions.map(z=>(
                  <button
                    key={z.id}
                    type="button"
                    className={`zone-pill${data.zona===z.id?" sel":""}`}
                    onClick={()=>up("zona",z.id)}
                  >
                    <strong>{z.label}</strong>
                    <span>{z.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default StepServicio
