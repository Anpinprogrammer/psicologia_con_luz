import { Brain, Heart, Leaf, MapPin, Monitor } from 'lucide-react';
import './styles/StepServicio.css'
import './styles/PlanStep.css'
import { type DataTransmiting } from '../../types';
import { SERVICES } from '../../utils';

const packageIcons = {
  '1': <Leaf size={30} />,
  '2': <Brain size={30} />,
  '3': <Heart size={30} />,
};

const packageBadges = {
  '1': '1 sesión',
  '2' : '4 sesiones',
  '3' : '8 sesiones',
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

const PlanStep = ({ data, setData, errors } : DataTransmiting) => {
  const selectedPlanId = data.svc
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
      {errors.svc&&<p className="svc-error" id="plan-selection-error" role="alert">{errors.svc}</p>}

      <fieldset className="plan-step__options" aria-describedby={errors.svc ? 'plan-selection-error' : undefined}>
        <legend className="plan-step__sr-only">Selecciona tu plan</legend>
        <div className="package-select-grid">
          {SERVICES.map(s => (
            <label key={s.id} className={`package-option plan-card${selectedPlanId === s.id ? ' plan-card--selected' : ''}${s.popular ? ' popular' : ''}`}>
              <input className="plan-card__radio" type="radio" name="selectedPlanId" value={s.id}
                checked={selectedPlanId === s.id} onChange={() => up('svc', s.id)}
                aria-invalid={Boolean(errors.svc)} />
              {s.popular && <span className="package-popular">Más elegido</span>}
              <span className="package-option-head">
                <span className="package-option-icon">{packageIcons[s.id as keyof typeof packageIcons]}</span>
                <span className="package-option-badge">{packageBadges[s.id as keyof typeof packageBadges]}</span>
              </span>
              <span className="plan-card__title">{s.name}</span>
              <span className="package-option-footer"><strong>{s.dur}</strong></span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="step1-bottom">
        <div className="booking-mode-group">
          <p className="col-label">Modalidad<span className="req">*</span></p>
          {errors.modalidad&&<p className="mod-error">{errors.modalidad}</p>}
          <div className="mod-row">
            {modalityOptions.map(m=>(
              <button
                key={m.id}
                type="button"
                aria-pressed={data.modalidad === m.id}
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
                    aria-pressed={data.zona === z.id}
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

export default PlanStep
