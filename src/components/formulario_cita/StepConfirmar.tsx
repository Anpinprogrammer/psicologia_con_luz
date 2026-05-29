
import { SERVICES } from '../../utils';
import './styles/StepConfirmar.css'
import '../../styles/tokens.css'
import { type DataTransmiting } from '../../types';





const StepConfirmar = ({ data, setData, errors, dRef } : DataTransmiting) => {
  const svc=SERVICES.find(s=>s.id===data.svc);
  const mod=data.modalidad==="virtual"?"💻 Virtual":data.modalidad==="presencial"?"📍 Presencial":"—";
  const zone=data.zona==="zona-sur"?"Zona sur":data.zona==="zona-norte"?"Zona norte":"—";
  return(
    <div className="step3-layout fade">
      <div>
        <p style={{fontSize:"0.78rem",fontWeight:700,color:"var(--mid)",marginBottom:"0.8rem",letterSpacing:"0.06em",textTransform:"uppercase"}}>Resumen de tu cita</p>
        <div className="summary-table">
          {[
            ["Nombre",   data.nombre||"—"],
            ["Correo",   data.email||"—"],
            ["País",     data.pais||"—"],
            ["Servicio", svc?`${svc.icon} ${svc.name}`:"—"],
            ["Duración", svc?.dur||"—"],
            ["Modalidad",mod],
            ...(data.modalidad === "presencial" ? [["Zona", zone]] : []),
            ["Fecha",    data.fecha||"—"],
            ["Hora",     data.hora||"—"],
          ].map(([k,v])=>(
            <div className="sum-row" key={k}>
              <span className="sum-k">{k}</span>
              <span className="sum-v">{v}</span>
            </div>
          ))}
        </div>
        <div className="sum-total">
          <span className="sum-total-k">Total a pagar</span>
          <span className="sum-total-v">{svc?.price||"—"}</span>
        </div>
      </div>
      <div className="confirm-right">
        <div style={{background:"var(--lavLight)",border:`1px solid rgba(124,92,191,0.16)`,borderRadius:"14px",padding:"1rem 1.1rem"}}>
          <p style={{fontSize:"0.73rem",fontWeight:700,color:"var(--lavender)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.5rem"}}>Antes de confirmar</p>
          <p style={{fontSize:"0.82rem",color:"var(--mid)",fontWeight:300,lineHeight:1.65}}>
            Recibirás un correo a <strong style={{color:"var(--dark)"}}>{data.email}</strong> con el enlace de tu sesión y las instrucciones de pago en las próximas horas.
          </p>
        </div>
        <div className="consent-box">
          <div className="consent-row">
            <input type="checkbox" id="consent" checked={data.consent}
              onChange={ev=>{
                const v = ev.target.checked;
                setData(p=>({...p,consent:v}));
                if(dRef) dRef.current = {...dRef.current, consent:v};
              }}/>
            <label htmlFor="consent">
              He leído y acepto los <a href="#">términos y condiciones</a> y la{" "}
              <a href="#">política de privacidad</a>. Entiendo que esta sesión es confidencial y recibiré las instrucciones correspondientes según la modalidad elegida.
            </label>
          </div>
          {errors.consent&&<p className="ferr-consent">{errors.consent}</p>}
        </div>
        <div style={{padding:"0.9rem 1rem",background:"#fff",border:`1px solid rgba(124,92,191,0.14)`,borderRadius:"12px"}}>
          <p style={{fontSize:"0.73rem",fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.35rem"}}>Política de cancelación</p>
          <p style={{fontSize:"0.78rem",color:"var(--muted)",fontWeight:300,lineHeight:1.6}}>
            Puedes cancelar o reprogramar tu cita hasta 24h antes sin costo alguno.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepConfirmar
