import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import { STEPS, SERVICES, STEP_META, validate } from '../../utils';

import Success from '../../components/formulario_cita/Success';
import StepPersonal from '../../components/formulario_cita/StepPersonal';
import StepServicio from '../../components/formulario_cita/StepServicio';
import StepFecha from '../../components/formulario_cita/StepFecha';
import StepConfirmar from '../../components/formulario_cita/StepConfirmar';
import NavBar from '../../components/layout/NavBar';

import './FormularioCita.css'
import '../../components/formulario_cita/styles/Field.css'

const FormularioCita = () => {

  const navigate = useNavigate();
  const [step, setStep]   = useState(0);
    const [done, setDone]   = useState(false);
    const [errs, setErrs]   = useState({
        nombre: '',
        email: '',
        tel: '',
        pais: '',
        svc: '',
        modalidad: '', 
        fecha: '',
        hora: '',
        consent: ''
    });
    const [data, setData]   = useState({
      nombre:"", email:"", tel:"", pais:"", fuente:"", nota:"",
      svc:"", terapeuta:"cualquiera", modalidad:"",
      fecha:"", hora:"",
      consent:false,
    });
  
    const svc = SERVICES.find(s=>s.id===data.svc);
    const progress = done ? 100 : ((step) / STEPS.length) * 100;
    const meta = STEP_META[step];
  
    // Keep a ref to always read the freshest data inside event handlers
    const dataRef = useRef(data);
    useEffect(() => { dataRef.current = data; }, [data]);
  
    function next(){
      const latest = dataRef.current;
      console.log(data)
      const e = validate(step, latest);
      if(Object.values(e).some(value => value)) { setErrs(e); return; }
      setErrs({nombre: '',
        email: '',
        tel: '',
        pais: '',
        svc: '',
        modalidad: '', 
        fecha: '',
        hora: '',
        consent: ''});
      if(step < STEPS.length - 1) setStep(s => s + 1);
      else setDone(true);
    }
    function prev(){ 
      setErrs({nombre: '',
        email: '',
        tel: '',
        pais: '',
        svc: '',
        modalidad: '', 
        fecha: '',
        hora: '',
        consent: ''}); 
      setStep(s => s - 1); 
    }
  
    return(
      <>
        <NavBar static />

        {/* ── PROGRESS STEPS ── */}
        {!done && (
          <div className="progress-shell">
            <div className="progress-steps">
              {STEPS.map((s,i)=>{
                const state = i < step ? "done" : i === step ? "active" : "pending";
                return(
                  <div key={i} className={`prog-step ${state}`}>
                    <div className="prog-num">
                      {state==="done" ? "✓" : s.num}
                    </div>
                    <div className="prog-label">
                      <strong>{s.label}</strong>
                      <span>{s.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="prog-bar-wrap">
              <div className="prog-bar-line" style={{width:`${progress}%`}}/>
            </div>
          </div>
        )}
  
        {/* ── MAIN CONTENT ── */}
        <main className="f-main">
          <div className="f-card">
  
            {done ? (
              <Success d={data} />
            ) : (
              <>
                {/* Card header */}
                <div className="f-card-head">
                  <div className="f-card-head-left">
                    <div className="step-tag">{meta.tag}</div>
                    <h2 className="f-card-title">{meta.title}</h2>
                    <p className="f-card-sub">{meta.sub}</p>
                  </div>
                  {step > 0 && svc && (
                    <div className="f-card-head-right">
                      <div className="selected-badge">
                        <div className="sb-label">Servicio seleccionado</div>
                        <div className="sb-val">{svc.icon} {svc.name} · {svc.price}</div>
                      </div>
                    </div>
                  )}
                </div>
  
                {/* Card body */}
                <div className="f-card-body">
                  {step===0 && <StepPersonal data={data} setData={setData} errors={errs}/>}
                  {step===1 && <StepServicio data={data} setData={setData} errors={errs}/>}
                  {step===2 && <StepFecha data={data} setData={setData} errors={errs}/>}
                  {step===3 && <StepConfirmar data={data} setData={setData} errors={errs} dRef={dataRef}/>}
                </div>
  
                {/* Action row */}
                <div className="action-row">
                  <div className="action-left">
                    {step > 0 && (
                      <button className="btn-prev" onClick={prev}>← Anterior</button>
                    )}
                    <span className="action-hint">
                      {step===0 && "Tus datos están protegidos y son confidenciales"}
                      {step===1 && "Puedes cambiar el servicio en cualquier momento"}
                      {step===2 && "Horario en tu zona local · sin domingos"}
                      {step===3 && "Al confirmar recibirás un correo de verificación"}
                    </span>
                  </div>
                  <div className="action-right">
                    <button className="btn-next" onClick={next}>
                      {step < STEPS.length-1 ? "Continuar →" : "Confirmar mi cita ✓"}
                    </button>
                  </div>
                </div>
              </>
            )}
  
          </div>
        </main>
      </>
    );
}

export default FormularioCita