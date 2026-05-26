
import { getNextDays, SLOTS } from '../../utils';
import { type DataTransmiting } from '../../types';
import './styles/StepFecha.css'



const StepFecha = ({ data, setData, errors }: DataTransmiting) => {
  const up = (k: string, v: string) => setData(p => ({ ...p, [k]: v }));
  const days = getNextDays();
  return (
    <div className="fade-up">
      <p style={{ fontSize:"0.8rem", fontWeight:600, color: "var(--mid)", marginBottom:"0.7rem" }}>
        Fecha<span style={{ color:'#C9843A' }}>*</span>
      </p>
      {errors.fecha && <p style={{ color:"#C03030", fontSize:"0.78rem", marginBottom:"0.4rem" }}>{errors.fecha}</p>}
      <div className="date-strip">
        {days.map((d, i) => (
          <div key={i}
            className={`date-chip${data.fecha === d.full ? " selected" : ""}`}
            onClick={() => up("fecha", d.full)}>
            <div className="dc-day">{d.day}</div>
            <div className="dc-num">{d.num}</div>
            <div className="dc-day" style={{ fontSize:"0.62rem", marginTop:"1px" }}>{d.month}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize:"0.8rem", fontWeight:600, color: "var(--mid)", margin:"0.2rem 0 0.7rem" }}>
        Horario disponible<span style={{ color: "var(--amber)" }}>*</span>
      </p>
      {errors.hora && <p style={{ color:"#C03030", fontSize:"0.78rem", marginBottom:"0.4rem" }}>{errors.hora}</p>}
      <div className="slots-grid">
        {SLOTS.map((s, i) => (
          <div key={i}
            className={`slot${!s.available ? " unavailable" : data.hora === s.time ? " selected" : ""}`}
            onClick={() => s.available && up("hora", s.time)}>
            {s.time}
          </div>
        ))}
      </div>
      <p style={{ fontSize:"0.74rem", color: "var(--muted)", fontWeight:300 }}>
        Horario en tu zona horaria local · Los turnos marcados no están disponibles
      </p>
    </div>
  );
}

export default StepFecha