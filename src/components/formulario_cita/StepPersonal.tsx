
import Field from './Field';
import './styles/StepPersonal.css'
import { type DataTransmiting } from '../../types';



const StepPersonal = ({ data, setData, errors } : DataTransmiting) => {
    
  const up = (k: string, v: string) => setData(p => ({ ...p, [k]: v }));
  return (
    <>
    <div className="step-grid-2 fade">
      <Field label="Nombre completo" req error={errors.nombre}>
        <input value={data.nombre} onChange={ev=>up("nombre",ev.target.value)}
          className={errors.nombre?"err":""} placeholder="María García"/>
      </Field>
      <Field label="País de residencia" req error={errors.pais}>
        <select value={data.pais} onChange={ev=>up("pais",ev.target.value)} className={errors.pais?"err":""}>
          <option value="">Selecciona...</option>
          {["Colombia","México","Argentina","Chile","España","Estados Unidos","Venezuela","Perú","Ecuador","Otro"].map(p=>(
            <option key={p}>{p}</option>
          ))}
        </select>
      </Field>
      <Field label="Correo electrónico" req error={errors.email}>
        <input type="email" value={data.email} onChange={ev=>up("email",ev.target.value)}
          className={errors.email?"err":""} placeholder="maria@ejemplo.com"/>
      </Field>
      <Field label="Teléfono / WhatsApp" req error={errors.tel}>
        <input type="tel" value={data.tel} onChange={ev=>up("tel",ev.target.value)}
          className={errors.tel?"err":""} placeholder="+57 300 000 0000"/>
      </Field>
      <Field label="¿Cómo te enteraste de Mindheart?">
        <select value={data.fuente} onChange={ev=>up("fuente",ev.target.value)}>
          <option value="">Selecciona una opción</option>
          {["Instagram","TikTok","Recomendación de alguien","Google","Podcast","Otra"].map(f=>(
            <option key={f}>{f}</option>
          ))}
        </select>
      </Field>
      <Field label="¿Algo que quieras contarnos antes?" >
        <textarea value={data.nota} onChange={ev=>up("nota",ev.target.value)} rows={2}
          placeholder="Cuéntanos brevemente qué te trae aquí, si lo deseas…"/>
      </Field>
    </div>
    </>
  );
}

export default StepPersonal