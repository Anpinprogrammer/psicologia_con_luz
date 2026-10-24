import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppointments } from '../../hooks/useAppointments';
import type { Appointment } from '../../types/appointment';

import { STEPS, SERVICES, STEP_META, validate } from '../../utils';

import Success from '../../components/formulario_cita/Success';
import StepPersonal from '../../components/formulario_cita/StepPersonal';
import StepServicio from '../../components/formulario_cita/StepServicio';
import StepFecha from '../../components/formulario_cita/StepFecha';
import StepConfirmar from '../../components/formulario_cita/StepConfirmar';
import NavBar from '../../components/layout/NavBar';

import './BookingForm.css'
import '../../components/formulario_cita/styles/Field.css'

const BookingForm = () => {

  const [searchParams] = useSearchParams()
  const initialPlan = SERVICES.find(service => service.id === searchParams.get('plan'))?.id ?? ''
  const { create } = useAppointments()
  const contentRef = useRef<HTMLDivElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')

  const [step, setStep]   = useState(0);
    const [done, setDone]   = useState(false);
    const [errs, setErrs]   = useState({
        nombre: '',
        email: '',
        tel: '',
        pais: '',
        svc: '',
        modalidad: '', 
        zona: '',
        fecha: '',
        hora: '',
        consent: ''
    });
    const [data, setData]   = useState({
     nombre:"", email:"", tel:"", pais:"", fuente:"", reason:"",
      svc:initialPlan, modalidad:"virtual",
      zona:"",
      fecha:"", hora:"", consent:false
    });
  
  const svc = SERVICES.find(s=>s.id===data.svc);
  const progress = done ? 100 : ((step + 1) / STEPS.length) * 100;
  const meta = STEP_META[step];

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);
  
    // Keep a ref to always read the freshest data inside event handlers
    const dataRef = useRef(data);
    useEffect(() => { dataRef.current = data; }, [data]);
  
    async function next(){
      if (submitting) return
      const latest = dataRef.current;
      const e = validate(step, latest);
      if(Object.values(e).some(value => value)) {
        setErrs(e)
        requestAnimationFrame(() => contentRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], .err')?.focus())
        return
      }
      setErrs({nombre: '',
        email: '',
        tel: '',
        pais: '',
        svc: '',
        modalidad: '', 
        zona: '',
        fecha: '',
        hora: '',
        consent: ''
      });
      if(step < STEPS.length - 1) setStep(s => s + 1);
      else {
        const formData : Appointment = {
          psychologist_id: 'bd4b5393-4522-440b-a21c-9057bc971a07',
          nombre: data.nombre,
          email: data.email,
          telefono: data.tel,
          pais: data.pais,
          source: data.fuente,
          plan: data.svc,
          modalidad: data.modalidad,
          zona: data.modalidad === 'presencial' ? data.zona : null,
          appointment_date: data.fecha,
          appointment_time: data.hora,
          motivo: data.reason
        }
        setSubmitting(true)
        setSubmissionError('')
        try {
          const { error } = await create(formData)
          if (error) setSubmissionError('No pudimos guardar tu cita. Inténtalo de nuevo.')
          else setDone(true)

        } catch {
          setSubmissionError('No pudimos guardar tu cita. Inténtalo de nuevo.')
        } finally {
          setSubmitting(false)
        }
        
      }
    }

    function prev(){ 
      setErrs({nombre: '',
        email: '',
        tel: '',
        pais: '',
        svc: '',
        modalidad: '', 
        zona: '',
        fecha: '',
        hora: '',
        consent: ''
      }); 
      setStep(s => s - 1); 
    }
  
    return(
      <div className="booking-form page-wrapper">
        <NavBar static />

        {/* ── PROGRESS STEPS ── */}
        {!done && (
          <div className="progress-shell" aria-label="Progreso de la reserva">
            <p className="progress-mobile" role="status">Paso {step + 1} de {STEPS.length}: <strong>{STEPS[step].label}</strong></p>
            <ol className="progress-steps">
              {STEPS.map((s,i)=>{
                const state = i < step ? "done" : i === step ? "active" : "pending";
                return(
                  <li key={i} className={`prog-step ${state}`} aria-current={i === step ? 'step' : undefined}>
                    <div className="prog-num">
                      {state==="done" ? "✓" : s.num}
                    </div>
                    <div className="prog-label">
                      <strong>{s.label}</strong>
                      <span>{s.sub}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="prog-bar-wrap" role="progressbar" aria-label="Paso de la reserva" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1}>
              <div className="prog-bar-line" style={{width:`${progress}%`}}/>
            </div>
          </div>
        )}
  
        {/* ── MAIN CONTENT ── */}
        <div className="f-main" ref={contentRef}>
          <div className="f-card">
  
            {done ? (
              <Success d={data} />
            ) : (
              <form noValidate aria-labelledby="booking-step-title" aria-busy={submitting} onSubmit={event => { event.preventDefault(); void next() }}>
                {/* Card header */}
                <div className="f-card-head">
                  <div className="f-card-head-left">
                    <div className="step-tag">Paso {step + 1} de {STEPS.length}</div>
                    <h1 className="f-card-title" id="booking-step-title">{meta.title}</h1>
                    <p className="f-card-sub">{meta.sub}</p>
                  </div>
                  {step > 0 && svc && (
                    <div className="f-card-head-right">
                      <div className="selected-badge">
                        <div className="sb-label">Servicio seleccionado</div>
                        <div className="sb-val">{svc.name} · {svc.price}</div>
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
  
                {submissionError && <p className="booking-form__error" role="alert">{submissionError}</p>}
                {/* Action row */}
                <div className="action-row">
                  <div className="action-left">
                    {step > 0 && (
                      <button type="button" className="btn-prev" disabled={submitting} onClick={prev}>← Anterior</button>
                    )}
                    <span className="action-hint">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2" /></svg>
                      Tus datos están protegidos y son confidenciales
                    </span>
                  </div>
                  <div className="action-right">
                    <button type="submit" className="btn-next" disabled={submitting}>
                      {submitting ? "Guardando tu cita…" : step < STEPS.length-1 ? "Continuar →" : "Confirmar mi cita ✓"}
                    </button>
                  </div>
                </div>
              </form>
            )}
  
          </div>
        </div>
      </div>
    );
}

export default BookingForm
