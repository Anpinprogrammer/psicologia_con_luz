import Field from './Field';
import './styles/StepServicio.css'
import { type DataTransmiting } from '../../types';
import { THERAPISTS, SERVICES } from '../../utils';

//import '../../index.css'

const StepServicio = ({ data, setData, errors } : DataTransmiting) => {
  const up = (k: string, v: string) => setData(p => ({ ...p, [k]: v }));
  return (
    <div className="fade">
      {errors.svc&&<p style={{fontSize:"0.78rem",color:"#C03030",marginBottom:"0.6rem",fontWeight:500}}>{errors.svc}</p>}
      <div className="svc-grid">
        {SERVICES.map(s=>(
          <div key={s.id} className={`svc-card${data.svc===s.id?" sel":""}`} onClick={()=>up("svc",s.id)}>
            <div className="svc-top">
              <span className="svc-icon">{s.icon}</span>
              <span className="svc-name">{s.name}</span>
            </div>
            <span className="svc-dur">{s.dur}</span>
            <span className="svc-price">{s.price}</span>
          </div>
        ))}
      </div>
      <div className="step1-bottom">
        <Field label="Terapeuta de preferencia">
          <select value={data.terapeuta} onChange={ev=>up("terapeuta",ev.target.value)}>
            {THERAPISTS.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </Field>
        <div>
          <p className="col-label">Modalidad<span className="req">*</span></p>
          {errors.modalidad&&<p style={{fontSize:"0.73rem",color:"#C03030",marginBottom:"0.3rem"}}>{errors.modalidad}</p>}
          <div className="mod-row">
            {[
              {id:"video", icon:"💻", label:"Videollamada", sub:"Google Meet / Zoom"},
              {id:"whatsapp", icon:"📱", label:"WhatsApp", sub:"Llamada de voz"},
            ].map(m=>(
              <div key={m.id} className={`mod-pill${data.modalidad===m.id?" sel":""}`} onClick={()=>up("modalidad",m.id)}>
                <span className="mod-icon">{m.icon}</span>
                <div><div className="mod-label">{m.label}</div><div className="mod-sub">{m.sub}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepServicio