
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../../utils';

import '../../styles/tokens.css'
import './styles/Success.css'
//import '../../index.css'

interface SuccessProps {
    d: {
    nombre: string;
    email: string;
    tel: string;
    pais: string;
    fuente: string;
    nota: string;
    svc: string;
    terapeuta: string;
    modalidad: string;
    fecha: string;
    hora: string;
    consent: boolean;
}
}

const Success = ({ d } : 
   SuccessProps
) => {
  const navigate = useNavigate();  
  const svc=SERVICES.find(s=>s.id===d.svc);
  const mod=d.modalidad==="video"?"💻 Videollamada":"📱 WhatsApp";
  return(
    <div className="success-body fade">
      <div className="success-left">
        <div className="success-icon">🌿</div>
        <h2 className="success-title">¡Tu cita está<br/><em>confirmada!</em></h2>
        <p className="success-sub">
          Hemos enviado todos los detalles y el enlace de tu sesión a:
        </p>
        <div className="success-email">📩 {d.email}</div>
        <p style={{fontSize:"0.78rem",color:"var(--muted)",marginTop:"1.2rem",fontWeight:300,lineHeight:1.65}}>
          Si tienes preguntas escríbenos a{" "}
          <a href="mailto:hola@mindheart.co" style={{color:"var(--accent)",fontWeight:600}}>hola@mindheart.co</a>
        </p>
        <button className="btn-next" style={{marginTop:"1.5rem",width:"100%",justifyContent:"center"}} onClick={()=>navigate("/")}>
          ← Volver al inicio
        </button>
      </div>
      <div className="success-right">
        <div className="success-card">
          <p className="success-card-title">Detalles de tu sesión</p>
          <div className="summary-table">
            {[
              ["Servicio",  svc?`${svc.icon} ${svc.name}`:"—"],
              ["Duración",  svc?.dur||"—"],
              ["Modalidad", mod],
              ["Fecha",     d.fecha||"—"],
              ["Hora",      d.hora||"—"],
            ].map(([k,v])=>(
              <div className="sum-row" key={k}>
                <span className="sum-k">{k}</span>
                <span className="sum-v">{v}</span>
              </div>
            ))}
          </div>
          <div className="sum-total" style={{marginTop:"0.8rem"}}>
            <span className="sum-total-k">Total</span>
            <span className="sum-total-v">{svc?.price||"—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success