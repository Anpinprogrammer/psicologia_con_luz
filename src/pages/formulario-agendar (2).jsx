import { useState, useRef, useEffect } from "react";

const C = {
  accent:      "#364F6B",
  accentDark:  "#243548",
  accentLight: "#E3EDF6",
  amber:       "#C9843A",
  amberDark:   "#A0621E",
  amberLight:  "#FDF0E0",
  lavender:    "#7C5CBF",
  lavLight:    "#EDE8FA",
  cream:       "#F8F7FD",
  warm:        "#F2EFF9",
  dark:        "#1E2030",
  mid:         "#3A3D52",
  muted:       "#787A90",
};

const LOGO = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N1QyCV9DrYsFR4irNtOO/media/695d42f6d5b483386fc5927c.png";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:'Nunito',sans-serif;
  background:${C.cream};
  color:${C.dark};
  -webkit-font-smoothing:antialiased;
  min-height:100vh;
  display:flex;flex-direction:column;
}

/* ════════════════════════════
   HEADER
════════════════════════════ */
.f-header{
  background:#fff;
  border-bottom:1px solid rgba(124,92,191,0.12);
  padding:0 3rem;
  display:flex;align-items:center;justify-content:space-between;
  height:64px;flex-shrink:0;
  position:sticky;top:0;z-index:100;
}
.f-header-logo img{height:34px}
.f-header-right{display:flex;align-items:center;gap:1.2rem}
.f-header-step{
  font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;
  color:${C.lavender};
}
.btn-back{
  display:inline-flex;align-items:center;gap:0.4rem;
  font-size:0.8rem;font-weight:600;color:${C.muted};
  background:transparent;border:1.5px solid rgba(124,92,191,0.2);
  border-radius:50px;padding:0.35rem 0.9rem;cursor:pointer;
  transition:all 0.2s;font-family:'Nunito',sans-serif;
}
.btn-back:hover{color:${C.accent};border-color:${C.accent}}

/* ════════════════════════════
   PROGRESS BAR — sticky under header
════════════════════════════ */
.progress-shell{
  background:#fff;
  border-bottom:1px solid rgba(124,92,191,0.08);
  padding:0 3rem;
  position:sticky;top:64px;z-index:99;
}
.progress-steps{
  display:flex;align-items:stretch;
  max-width:900px;margin:0 auto;
}
.prog-step{
  flex:1;display:flex;align-items:center;gap:0.7rem;
  padding:0.9rem 0;
  position:relative;cursor:pointer;
  transition:opacity 0.2s;
}
.prog-step:not(:last-child)::after{
  content:'';
  position:absolute;right:0;top:50%;transform:translateY(-50%);
  width:1px;height:40%;
  background:rgba(124,92,191,0.12);
}
.prog-step.pending{opacity:0.4}
.prog-num{
  width:28px;height:28px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:0.75rem;font-weight:700;
  transition:all 0.3s;
}
.prog-step.done   .prog-num{background:${C.lavender};color:#fff}
.prog-step.active .prog-num{background:${C.amber};color:#fff;box-shadow:0 0 0 4px ${C.amberLight}}
.prog-step.pending .prog-num{background:rgba(124,92,191,0.1);color:${C.muted}}
.prog-label strong{display:block;font-size:0.8rem;font-weight:700;color:${C.dark}}
.prog-step.pending .prog-label strong{color:${C.muted}}
.prog-label span{font-size:0.7rem;color:${C.muted};font-weight:300}
.prog-bar-line{
  height:3px;
  background:linear-gradient(90deg,${C.amber},${C.lavender});
  transition:width 0.5s cubic-bezier(0.4,0,0.2,1);
}

/* ════════════════════════════
   MAIN BODY
════════════════════════════ */
.f-main{
  flex:1;display:flex;align-items:flex-start;justify-content:center;
  padding:2.5rem 3rem 3rem;
}
.f-card{
  width:100%;max-width:980px;
  background:#fff;
  border:1px solid rgba(124,92,191,0.12);
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 8px 40px rgba(124,92,191,0.07);
}

/* Card header strip */
.f-card-head{
  padding:1.8rem 2.5rem 1.4rem;
  border-bottom:1px solid rgba(124,92,191,0.08);
  background:linear-gradient(135deg,${C.warm} 0%,#f8f5ff 100%);
  display:flex;align-items:flex-start;justify-content:space-between;gap:2rem;
}
.f-card-head-left{}
.step-tag{
  display:inline-flex;align-items:center;gap:0.4rem;
  background:${C.lavLight};color:${C.lavender};
  font-size:0.67rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;
  padding:0.28rem 0.8rem;border-radius:50px;margin-bottom:0.5rem;
}
.step-tag::before{content:'';width:5px;height:5px;border-radius:50%;background:${C.amber};flex-shrink:0}
.f-card-title{
  font-family:'Playfair Display',serif;
  font-size:1.55rem;font-weight:500;color:${C.dark};line-height:1.2;
}
.f-card-title em{color:${C.amber};font-style:italic}
.f-card-sub{font-size:0.83rem;font-weight:300;color:${C.muted};margin-top:0.3rem;line-height:1.6}
.f-card-head-right{flex-shrink:0}

/* Mini service badge shown on steps 2+ */
.selected-badge{
  background:${C.amberLight};border:1px solid rgba(201,132,58,0.22);
  border-radius:10px;padding:0.6rem 0.9rem;text-align:right;
}
.sb-label{font-size:0.68rem;color:${C.muted};font-weight:300}
.sb-val{font-size:0.85rem;font-weight:700;color:${C.amber};margin-top:0.1rem}

/* Card body */
.f-card-body{padding:2rem 2.5rem}

/* ════════════════════════════
   STEP LAYOUTS — all horizontal
════════════════════════════ */

/* STEP 0: 2-col personal info */
.step-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem 2rem}
.step-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem 2rem}
.span-2{grid-column:span 2}
.span-3{grid-column:span 3}

/* ── FIELD ── */
.field{display:flex;flex-direction:column;gap:0.35rem}
.field label{font-size:0.78rem;font-weight:700;color:${C.mid};letter-spacing:0.02em}
.field label .req{color:${C.amber};margin-left:2px}
.field input,.field select,.field textarea{
  font-family:'Nunito',sans-serif;font-size:0.88rem;font-weight:400;
  color:${C.dark};background:${C.cream};
  border:1.5px solid rgba(124,92,191,0.18);border-radius:10px;
  padding:0.65rem 0.9rem;outline:none;width:100%;-webkit-appearance:none;
  transition:border-color 0.2s,box-shadow 0.2s;
}
.field input::placeholder,.field textarea::placeholder{color:${C.muted};opacity:0.45;font-weight:300}
.field input:focus,.field select:focus,.field textarea:focus{
  border-color:${C.lavender};
  box-shadow:0 0 0 3px rgba(124,92,191,0.09);
  background:#fff;
}
.field input.err,.field select.err,.field textarea.err{
  border-color:#C84040;box-shadow:0 0 0 3px rgba(200,64,64,0.07);
}
.ferr{font-size:0.73rem;color:#C03030;margin-top:0.1rem}
.field select{
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23787A90' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 0.85rem center;
  padding-right:2.2rem;cursor:pointer;
}
.field textarea{resize:none;line-height:1.55;min-height:72px}

/* STEP 1: service cards 3×2 grid */
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.8rem}
.svc-card{
  border:1.5px solid rgba(124,92,191,0.14);border-radius:14px;
  padding:1rem 1.1rem;cursor:pointer;
  background:${C.cream};transition:all 0.2s;
  display:flex;flex-direction:column;gap:0.3rem;
  position:relative;
}
.svc-card:hover{border-color:${C.lavender};background:${C.lavLight};transform:translateY(-2px);box-shadow:0 6px 18px rgba(124,92,191,0.1)}
.svc-card.sel{border-color:${C.amber};background:${C.amberLight};box-shadow:0 4px 16px rgba(201,132,58,0.14)}
.svc-card.sel::after{
  content:'✓';position:absolute;top:0.6rem;right:0.75rem;
  font-size:0.72rem;font-weight:700;color:${C.amber};
}
.svc-top{display:flex;align-items:center;gap:0.5rem}
.svc-icon{font-size:1.15rem}
.svc-name{font-size:0.83rem;font-weight:700;color:${C.dark};line-height:1.25}
.svc-dur{font-size:0.72rem;color:${C.muted};font-weight:300}
.svc-price{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:500;color:${C.amber};margin-top:auto;padding-top:0.5rem}

/* Step 1 bottom row */
.step1-bottom{
  display:grid;grid-template-columns:1fr 1fr;
  gap:1rem;margin-top:1.2rem;
}

/* Modality toggle pills */
.mod-row{display:flex;gap:0.6rem}
.mod-pill{
  flex:1;display:flex;align-items:center;gap:0.6rem;
  border:1.5px solid rgba(124,92,191,0.15);border-radius:12px;
  padding:0.7rem 0.9rem;cursor:pointer;background:${C.cream};
  transition:all 0.2s;
}
.mod-pill:hover{border-color:${C.amber}}
.mod-pill.sel{border-color:${C.amber};background:${C.amberLight}}
.mod-icon{font-size:1.1rem}
.mod-label{font-size:0.83rem;font-weight:700;color:${C.dark}}
.mod-sub{font-size:0.7rem;color:${C.muted};font-weight:300}

/* STEP 2: date + time horizontal */
.step2-layout{display:grid;grid-template-columns:1fr 1fr;gap:2rem}
.date-strip{display:flex;gap:0.5rem;overflow-x:auto;padding-bottom:0.4rem;scrollbar-width:none}
.date-strip::-webkit-scrollbar{display:none}
.date-chip{
  flex-shrink:0;min-width:58px;
  border:1.5px solid rgba(124,92,191,0.15);border-radius:12px;
  padding:0.55rem 0.6rem;cursor:pointer;text-align:center;
  background:${C.cream};transition:all 0.2s;
}
.date-chip:hover{border-color:${C.amber}}
.date-chip.sel{background:${C.accent};border-color:${C.accent};box-shadow:0 4px 12px rgba(54,79,107,0.22)}
.dc-day{font-size:0.62rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${C.muted}}
.dc-num{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:500;color:${C.dark};line-height:1.1}
.dc-mon{font-size:0.6rem;color:${C.muted};margin-top:1px}
.date-chip.sel .dc-day,.date-chip.sel .dc-num,.date-chip.sel .dc-mon{color:#fff}

.slots-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.45rem}
.slot{
  border:1.5px solid rgba(124,92,191,0.14);border-radius:10px;
  padding:0.52rem 0;text-align:center;cursor:pointer;
  font-size:0.78rem;font-weight:600;color:${C.mid};
  background:${C.cream};transition:all 0.2s;
}
.slot:hover{border-color:${C.lavender};color:${C.lavender}}
.slot.sel{background:${C.amber};border-color:${C.amber};color:#fff;box-shadow:0 3px 10px rgba(201,132,58,0.3)}
.slot.off{opacity:0.3;cursor:not-allowed;background:#f0eef8}
.slots-hint{font-size:0.7rem;color:${C.muted};font-weight:300;margin-top:0.6rem}

.col-label{font-size:0.78rem;font-weight:700;color:${C.mid};margin-bottom:0.65rem;letter-spacing:0.02em}
.col-label .req{color:${C.amber};margin-left:2px}

/* STEP 3: summary */
.step3-layout{display:grid;grid-template-columns:1.1fr 0.9fr;gap:2.5rem;align-items:start}
.summary-table{display:flex;flex-direction:column;gap:0.5rem}
.sum-row{display:flex;justify-content:space-between;align-items:center;padding:0.55rem 0;border-bottom:1px solid rgba(124,92,191,0.07)}
.sum-row:last-child{border-bottom:none}
.sum-k{font-size:0.8rem;color:${C.muted};font-weight:300}
.sum-v{font-size:0.83rem;font-weight:700;color:${C.dark};text-align:right;max-width:55%}
.sum-total{
  display:flex;justify-content:space-between;align-items:center;
  padding:0.9rem 1rem;
  background:${C.amberLight};border-radius:10px;margin-top:0.8rem;
  border:1px solid rgba(201,132,58,0.2);
}
.sum-total-k{font-size:0.85rem;font-weight:700;color:${C.dark}}
.sum-total-v{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:500;color:${C.amber}}

.confirm-right{display:flex;flex-direction:column;gap:1rem}
.consent-box{
  background:${C.lavLight};border:1px solid rgba(124,92,191,0.16);
  border-radius:12px;padding:1rem 1.1rem;
}
.consent-row{display:flex;gap:0.7rem;align-items:flex-start}
.consent-row input[type=checkbox]{width:16px;height:16px;flex-shrink:0;margin-top:3px;accent-color:${C.lavender};cursor:pointer}
.consent-row label{font-size:0.79rem;color:${C.mid};line-height:1.65;cursor:pointer;font-weight:300}
.consent-row a{color:${C.accent};font-weight:600;text-decoration:none}
.consent-row a:hover{text-decoration:underline}
.ferr-consent{font-size:0.73rem;color:#C03030;margin-top:0.4rem}

/* ════════════════════════════
   ACTION ROW
════════════════════════════ */
.action-row{
  display:flex;align-items:center;justify-content:space-between;
  padding:1.4rem 2.5rem;
  border-top:1px solid rgba(124,92,191,0.08);
  background:linear-gradient(135deg,${C.warm} 0%,#f8f5ff 100%);
}
.action-left{display:flex;align-items:center;gap:0.8rem}
.action-hint{font-size:0.75rem;color:${C.muted};font-weight:300}
.action-right{display:flex;align-items:center;gap:0.8rem}

.btn-prev{
  display:inline-flex;align-items:center;gap:0.4rem;
  font-size:0.85rem;font-weight:600;color:${C.mid};
  background:transparent;border:1.5px solid rgba(124,92,191,0.2);
  border-radius:50px;padding:0.6rem 1.3rem;cursor:pointer;
  transition:all 0.2s;font-family:'Nunito',sans-serif;
}
.btn-prev:hover{border-color:${C.lavender};color:${C.lavender}}
.btn-next{
  display:inline-flex;align-items:center;gap:0.45rem;
  font-size:0.88rem;font-weight:700;color:#fff;
  background:${C.amber};border:none;
  border-radius:50px;padding:0.7rem 1.8rem;cursor:pointer;
  transition:all 0.22s;font-family:'Nunito',sans-serif;
  letter-spacing:0.02em;
}
.btn-next:hover{background:${C.amberDark};transform:translateY(-2px);box-shadow:0 8px 22px rgba(160,98,30,0.3)}
.btn-next:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none}

/* ════════════════════════════
   SUCCESS
════════════════════════════ */
.success-body{
  padding:3rem 2.5rem;
  display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start;
}
.success-left{text-align:center}
.success-icon{
  width:80px;height:80px;border-radius:50%;
  background:linear-gradient(135deg,${C.lavLight},${C.amberLight});
  display:flex;align-items:center;justify-content:center;
  font-size:2.2rem;margin:0 auto 1.3rem;
  border:2px solid rgba(124,92,191,0.18);
  box-shadow:0 8px 30px rgba(124,92,191,0.12);
}
.success-title{
  font-family:'Playfair Display',serif;
  font-size:1.7rem;font-weight:500;color:${C.dark};
  margin-bottom:0.5rem;
}
.success-title em{color:${C.amber};font-style:italic}
.success-sub{font-size:0.88rem;color:${C.muted};font-weight:300;line-height:1.7;max-width:320px;margin:0 auto 1.5rem}
.success-email{
  display:inline-flex;align-items:center;gap:0.4rem;
  background:${C.lavLight};border:1px solid rgba(124,92,191,0.2);
  border-radius:50px;padding:0.45rem 1rem;
  font-size:0.78rem;font-weight:600;color:${C.lavender};
}
.success-right{}
.success-card{
  background:linear-gradient(135deg,${C.warm},#f8f5ff);
  border:1px solid rgba(124,92,191,0.14);
  border-radius:16px;padding:1.5rem;
}
.success-card-title{
  font-size:0.7rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;
  color:${C.lavender};margin-bottom:1rem;
}

/* ════════════════════════════
   FOOTER
════════════════════════════ */
.f-footer{
  background:#fff;
  border-top:1px solid rgba(124,92,191,0.1);
  padding:1rem 3rem;
  display:flex;align-items:center;justify-content:space-between;
  flex-shrink:0;
}
.f-footer-left{font-size:0.75rem;color:${C.muted};font-weight:300}
.f-footer-links{display:flex;gap:1.5rem}
.f-footer-links a{font-size:0.75rem;color:${C.muted};text-decoration:none;font-weight:300;transition:color 0.2s}
.f-footer-links a:hover{color:${C.accent}}
.f-footer-trust{
  display:flex;align-items:center;gap:0.4rem;
  font-size:0.73rem;color:${C.muted};font-weight:300;
}
.f-footer-dot{width:5px;height:5px;border-radius:50%;background:${C.amber}}

/* ════════════════════════════
   RESPONSIVE
════════════════════════════ */
@media(max-width:768px){
  .f-header,.f-footer{padding:0 1.2rem}
  .progress-shell{padding:0 1.2rem}
  .f-main{padding:1.2rem}
  .f-card-head{padding:1.2rem 1.5rem 1rem;flex-direction:column;gap:0.7rem}
  .f-card-body{padding:1.2rem 1.5rem}
  .action-row{padding:1rem 1.5rem}
  .svc-grid{grid-template-columns:1fr 1fr}
  .step-grid-2,.step-grid-3,.step1-bottom,.step2-layout,.step3-layout,.success-body{grid-template-columns:1fr}
  .span-2,.span-3{grid-column:span 1}
  .prog-label span{display:none}
  .f-footer{flex-direction:column;gap:0.6rem;text-align:center}
  .f-footer-links{justify-content:center}
}

@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fadeIn 0.35s ease forwards}
`;

/* ── DATA ── */
const SVCS = [
  { id:"emocional",  icon:"🌿", name:"Acompañamiento Emocional",         price:"$70 USD", dur:"50 min" },
  { id:"crianza",    icon:"👶", name:"Asesoría en Crianza",               price:"$70 USD", dur:"50 min" },
  { id:"postparto",  icon:"🤱", name:"Postparto y Maternidad",            price:"$90 USD", dur:"50 min" },
  { id:"sensorial",  icon:"🧠", name:"Necesidades Sensoriales",           price:"$70 USD", dur:"50 min" },
  { id:"parejas",    icon:"💑", name:"Acompañamiento a Parejas",          price:"$98 USD", dur:"50 min" },
  { id:"sueno",      icon:"🌙", name:"Asesoría en Sueño",                price:"$115 USD", dur:"90 min" },
];
const THERAPISTS = [
  { id:"cualquiera", name:"Sin preferencia — asignamos la mejor" },
  { id:"manuela",    name:"Manuela Molina — Crianza consciente" },
  { id:"diana",      name:"Diana Otoya — Supervisora senior" },
];
const SLOTS = [
  {t:"7:00 AM",ok:true},{t:"8:00 AM",ok:true},{t:"9:00 AM",ok:false},
  {t:"10:00 AM",ok:true},{t:"11:00 AM",ok:false},{t:"12:00 PM",ok:true},
  {t:"2:00 PM",ok:true},{t:"3:00 PM",ok:true},{t:"4:00 PM",ok:false},
  {t:"5:00 PM",ok:true},{t:"6:00 PM",ok:true},{t:"7:00 PM",ok:true},
];
function getNextDays() {
  const DAYS=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  const MONS=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const r=[]; const now=new Date();
  for(let i=1;i<=10;i++){
    const d=new Date(now); d.setDate(now.getDate()+i);
    if(d.getDay()!==0) r.push({day:DAYS[d.getDay()],num:d.getDate(),mon:MONS[d.getMonth()],full:d.toLocaleDateString("es-CO",{weekday:"long",day:"numeric",month:"long"})});
  }
  return r;
}

const STEPS = [
  { num:1, label:"Tu información",    sub:"Datos de contacto" },
  { num:2, label:"Tipo de sesión",    sub:"Servicio y terapeuta" },
  { num:3, label:"Fecha y hora",      sub:"Elige disponibilidad" },
  { num:4, label:"Confirmación",      sub:"Revisa y confirma" },
];
const STEP_META = [
  { tag:"Paso 1 de 4", title:<>Cuéntanos un poco <em>sobre ti</em></>, sub:"Usamos estos datos únicamente para crear tu perfil y asignarte la terapeuta ideal." },
  { tag:"Paso 2 de 4", title:<>¿Qué tipo de <em>sesión</em> necesitas?</>, sub:"Elige el servicio que más se ajuste y selecciona cómo quieres que se lleve a cabo." },
  { tag:"Paso 3 de 4", title:<>Elige tu <em>momento</em></>, sub:"Estos horarios están en tu zona horaria local. Las celdas apagadas ya están ocupadas." },
  { tag:"Paso 4 de 4", title:<>Todo listo, <em>confirma tu cita</em></>, sub:"Revisa que los datos estén correctos antes de agendar." },
];

/* ── VALIDATION ── */
function validate(step, d) {
  const e={};
  if(step===0){
    if(!d.nombre.trim())  e.nombre="Requerido";
    if(!d.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email="Correo inválido";
    if(!d.tel.trim())     e.tel="Requerido";
    if(!d.pais)           e.pais="Selecciona tu país";
  }
  if(step===1){
    if(!d.svc)       e.svc="Selecciona un servicio";
    if(!d.modalidad) e.modalidad="Selecciona una modalidad";
  }
  if(step===2){
    if(!d.fecha)  e.fecha="Selecciona una fecha";
    if(!d.hora)   e.hora="Selecciona un horario";
  }
  if(step===3){
    if(!d.consent) e.consent="Debes aceptar para continuar";
  }
  return e;
}

/* ── FIELD HELPER ── */
function F({label,req,err,children}){
  return(
    <div className="field">
      <label>{label}{req&&<span className="req">*</span>}</label>
      {children}
      {err&&<span className="ferr">{err}</span>}
    </div>
  );
}

/* ─────────── STEP 0 ─────────── */
function Step0({d,set,e}){
  const u=(k,v)=>set(p=>({...p,[k]:v}));
  return(
    <div className="step-grid-2 fade">
      <F label="Nombre completo" req err={e.nombre}>
        <input value={d.nombre} onChange={ev=>u("nombre",ev.target.value)}
          className={e.nombre?"err":""} placeholder="María García"/>
      </F>
      <F label="País de residencia" req err={e.pais}>
        <select value={d.pais} onChange={ev=>u("pais",ev.target.value)} className={e.pais?"err":""}>
          <option value="">Selecciona...</option>
          {["Colombia","México","Argentina","Chile","España","Estados Unidos","Venezuela","Perú","Ecuador","Otro"].map(p=>(
            <option key={p}>{p}</option>
          ))}
        </select>
      </F>
      <F label="Correo electrónico" req err={e.email}>
        <input type="email" value={d.email} onChange={ev=>u("email",ev.target.value)}
          className={e.email?"err":""} placeholder="maria@ejemplo.com"/>
      </F>
      <F label="Teléfono / WhatsApp" req err={e.tel}>
        <input type="tel" value={d.tel} onChange={ev=>u("tel",ev.target.value)}
          className={e.tel?"err":""} placeholder="+57 300 000 0000"/>
      </F>
      <F label="¿Cómo te enteraste de Mindheart?">
        <select value={d.fuente} onChange={ev=>u("fuente",ev.target.value)}>
          <option value="">Selecciona una opción</option>
          {["Instagram","TikTok","Recomendación de alguien","Google","Podcast","Otra"].map(f=>(
            <option key={f}>{f}</option>
          ))}
        </select>
      </F>
      <F label="¿Algo que quieras contarnos antes?" >
        <textarea value={d.nota} onChange={ev=>u("nota",ev.target.value)} rows={2}
          placeholder="Cuéntanos brevemente qué te trae aquí, si lo deseas…"/>
      </F>
    </div>
  );
}

/* ─────────── STEP 1 ─────────── */
function Step1({d,set,e}){
  const u=(k,v)=>set(p=>({...p,[k]:v}));
  return(
    <div className="fade">
      {e.svc&&<p style={{fontSize:"0.78rem",color:"#C03030",marginBottom:"0.6rem",fontWeight:500}}>{e.svc}</p>}
      <div className="svc-grid">
        {SVCS.map(s=>(
          <div key={s.id} className={`svc-card${d.svc===s.id?" sel":""}`} onClick={()=>u("svc",s.id)}>
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
        <F label="Terapeuta de preferencia">
          <select value={d.terapeuta} onChange={ev=>u("terapeuta",ev.target.value)}>
            {THERAPISTS.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </F>
        <div>
          <p className="col-label">Modalidad<span className="req">*</span></p>
          {e.modalidad&&<p style={{fontSize:"0.73rem",color:"#C03030",marginBottom:"0.3rem"}}>{e.modalidad}</p>}
          <div className="mod-row">
            {[
              {id:"video", icon:"💻", label:"Videollamada", sub:"Google Meet / Zoom"},
              {id:"whatsapp", icon:"📱", label:"WhatsApp", sub:"Llamada de voz"},
            ].map(m=>(
              <div key={m.id} className={`mod-pill${d.modalidad===m.id?" sel":""}`} onClick={()=>u("modalidad",m.id)}>
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

/* ─────────── STEP 2 ─────────── */
function Step2({d,set,e}){
  const u=(k,v)=>set(p=>({...p,[k]:v}));
  const days=getNextDays();
  return(
    <div className="step2-layout fade">
      <div>
        <p className="col-label">Fecha<span className="req">*</span></p>
        {e.fecha&&<p style={{fontSize:"0.73rem",color:"#C03030",marginBottom:"0.3rem"}}>{e.fecha}</p>}
        <div className="date-strip">
          {days.map((day,i)=>(
            <div key={i} className={`date-chip${d.fecha===day.full?" sel":""}`} onClick={()=>u("fecha",day.full)}>
              <div className="dc-day">{day.day}</div>
              <div className="dc-num">{day.num}</div>
              <div className="dc-mon">{day.mon}</div>
            </div>
          ))}
        </div>
        {d.fecha&&(
          <div style={{marginTop:"0.8rem",padding:"0.6rem 0.9rem",background:C.lavLight,borderRadius:"10px",border:`1px solid rgba(124,92,191,0.16)`}}>
            <p style={{fontSize:"0.78rem",fontWeight:600,color:C.lavender}}>📅 {d.fecha}</p>
          </div>
        )}
      </div>
      <div>
        <p className="col-label">Horario disponible<span className="req">*</span></p>
        {e.hora&&<p style={{fontSize:"0.73rem",color:"#C03030",marginBottom:"0.3rem"}}>{e.hora}</p>}
        <div className="slots-grid">
          {SLOTS.map((s,i)=>(
            <div key={i}
              className={`slot${!s.ok?" off":d.hora===s.t?" sel":""}`}
              onClick={()=>s.ok&&u("hora",s.t)}>
              {s.t}
            </div>
          ))}
        </div>
        <p className="slots-hint">Horario en tu zona local · Las celdas apagadas ya están ocupadas</p>
      </div>
    </div>
  );
}

/* ─────────── STEP 3 ─────────── */
function Step3({d,set,e,dRef}){
  const svc=SVCS.find(s=>s.id===d.svc);
  const mod=d.modalidad==="video"?"💻 Videollamada":d.modalidad==="whatsapp"?"📱 WhatsApp":"—";
  return(
    <div className="step3-layout fade">
      <div>
        <p style={{fontSize:"0.78rem",fontWeight:700,color:C.mid,marginBottom:"0.8rem",letterSpacing:"0.06em",textTransform:"uppercase"}}>Resumen de tu cita</p>
        <div className="summary-table">
          {[
            ["Nombre",   d.nombre||"—"],
            ["Correo",   d.email||"—"],
            ["País",     d.pais||"—"],
            ["Servicio", svc?`${svc.icon} ${svc.name}`:"—"],
            ["Duración", svc?.dur||"—"],
            ["Modalidad",mod],
            ["Fecha",    d.fecha||"—"],
            ["Hora",     d.hora||"—"],
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
        <div style={{background:C.lavLight,border:`1px solid rgba(124,92,191,0.16)`,borderRadius:"14px",padding:"1rem 1.1rem"}}>
          <p style={{fontSize:"0.73rem",fontWeight:700,color:C.lavender,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.5rem"}}>Antes de confirmar</p>
          <p style={{fontSize:"0.82rem",color:C.mid,fontWeight:300,lineHeight:1.65}}>
            Recibirás un correo a <strong style={{color:C.dark}}>{d.email}</strong> con el enlace de tu sesión y las instrucciones de pago en las próximas horas.
          </p>
        </div>
        <div className="consent-box">
          <div className="consent-row">
            <input type="checkbox" id="consent" checked={d.consent}
              onChange={ev=>{
                const v = ev.target.checked;
                set(p=>({...p,consent:v}));
                if(dRef) dRef.current = {...dRef.current, consent:v};
              }}/>
            <label htmlFor="consent">
              He leído y acepto los <a href="#">términos y condiciones</a> y la{" "}
              <a href="#">política de privacidad</a>. Entiendo que esta sesión es virtual y confidencial.
            </label>
          </div>
          {e.consent&&<p className="ferr-consent">{e.consent}</p>}
        </div>
        <div style={{padding:"0.9rem 1rem",background:"#fff",border:`1px solid rgba(124,92,191,0.14)`,borderRadius:"12px"}}>
          <p style={{fontSize:"0.73rem",fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.35rem"}}>Política de cancelación</p>
          <p style={{fontSize:"0.78rem",color:C.muted,fontWeight:300,lineHeight:1.6}}>
            Puedes cancelar o reprogramar tu cita hasta 24h antes sin costo alguno.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SUCCESS ─────────── */
function Success({d,onNavigate}){
  const svc=SVCS.find(s=>s.id===d.svc);
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
        <p style={{fontSize:"0.78rem",color:C.muted,marginTop:"1.2rem",fontWeight:300,lineHeight:1.65}}>
          Si tienes preguntas escríbenos a{" "}
          <a href="mailto:hola@mindheart.co" style={{color:C.accent,fontWeight:600}}>hola@mindheart.co</a>
        </p>
        <button className="btn-next" style={{marginTop:"1.5rem",width:"100%",justifyContent:"center"}} onClick={()=>onNavigate("landing")}>
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

/* ═══════════════════════════════
   MAIN
═══════════════════════════════ */
export default function FormularioAgendar({ onNavigate }) {
  const [step, setStep]   = useState(0);
  const [done, setDone]   = useState(false);
  const [errs, setErrs]   = useState({});
  const [data, setData]   = useState({
    nombre:"", email:"", tel:"", pais:"", fuente:"", nota:"",
    svc:"", terapeuta:"cualquiera", modalidad:"",
    fecha:"", hora:"",
    consent:false,
  });

  const svc = SVCS.find(s=>s.id===data.svc);
  const progress = done ? 100 : (step / STEPS.length) * 100;
  const meta = STEP_META[step];

  // Keep a ref to always read the freshest data inside event handlers
  const dataRef = useRef(data);
  useEffect(() => { dataRef.current = data; }, [data]);

  function next(){
    const latest = dataRef.current;
    const e = validate(step, latest);
    if(Object.keys(e).length){ setErrs(e); return; }
    setErrs({});
    if(step < STEPS.length - 1) setStep(s => s + 1);
    else setDone(true);
  }
  function prev(){ setErrs({}); setStep(s => s - 1); }

  return(
    <>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <header className="f-header">
        <div className="f-header-logo"><img src={LOGO} alt="Mindheart Therapy"/></div>
        <div className="f-header-right">
          {!done && <span className="f-header-step">{STEP_META[step].tag}</span>}
          <button className="btn-back" onClick={()=>onNavigate("landing")}>← Volver al inicio</button>
        </div>
      </header>

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
          <div className="prog-bar-line" style={{width:`${progress}%`}}/>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="f-main">
        <div className="f-card">

          {done ? (
            <Success data={data} onNavigate={onNavigate}/>
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
                {step===0 && <Step0 d={data} set={setData} e={errs}/>}
                {step===1 && <Step1 d={data} set={setData} e={errs}/>}
                {step===2 && <Step2 d={data} set={setData} e={errs}/>}
                {step===3 && <Step3 d={data} set={setData} e={errs} dRef={dataRef}/>}
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

      {/* ── FOOTER ── */}
      <footer className="f-footer">
        <div className="f-footer-left">© 2025 Mindheart Therapy · Todos los derechos reservados</div>
        <div style={{display:"flex",lignItems:"center",gap:"0.4rem"}}>
          <div className="f-footer-dot"/>
          <div className="f-footer-trust">100% confidencial · Psicólogas supervisadas</div>
        </div>
        <div className="f-footer-links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Contáctanos</a>
        </div>
      </footer>
    </>
  );
}
