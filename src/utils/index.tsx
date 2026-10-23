import { type StepMeta } from "../types";
import { Heart, Brain, Leaf } from 'lucide-react';

const LOGO   = "img/logo_sin_fondo.png";
const LOGO_SOLO = "img/logo_solo.png";
const LOGO_NOMBRE = "img/logo_letras.png";
const HERO   = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N1QyCV9DrYsFR4irNtOO/media/695d858dde2c147f3048c2af.png";
const AB1    = "img/aboutpic.png";
const AB2    = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N1QyCV9DrYsFR4irNtOO/media/69690d89eaddec384182a1a8.png";
const FORYOU = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N1QyCV9DrYsFR4irNtOO/media/695d8ceede2c14687b4aad26.png";
const H1     = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N1QyCV9DrYsFR4irNtOO/media/695d6242a8a91cebe9754fc8.png";
const H2     = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N1QyCV9DrYsFR4irNtOO/media/695d62a9a88e8720d7c2209b.png";
const H3     = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N1QyCV9DrYsFR4irNtOO/media/695d6358a88e87fff1c23aa5.png";
const T1     = "img/team.jpg";
const T2     = "img/pillars.jpg";

const SVCS = [
  { icon:"🌿", name:"Acompañamiento Emocional",           desc:"Espacio individual con enfoques basados en evidencia. Cada proceso se ajusta a la historia y necesidades de la persona desde una mirada integrativa y sensible al desarrollo humano.",            price:"$70 USD",  dur:"Sesión virtual · 50 min", note:null },
  { icon:"👶", name:"Asesoría en Crianza",                 desc:"Espacio dirigido a cuidadores, acompañado por expertos en desarrollo infantil. Analizamos situaciones del día a día y diseñamos estrategias respetuosas y basadas en evidencia.",                  price:"$70 USD",  dur:"Sesión virtual · 50 min", note:"No constituye psicoterapia infantil." },
  { icon:"🤱", name:"Acompañamiento en Postparto",         desc:"Acompañamiento liderado por experta en gestación, parto y postparto. Este espacio ofrece una comprensión integral y profesional de la experiencia materna.",                                          price:"$90 USD",  dur:"Sesión virtual · 50 min", note:null },
  { icon:"🧠", name:"Asesoría en Necesidades Sensoriales", desc:"Analizamos cómo el perfil sensorial impacta la vida diaria del niño y diseñamos estrategias prácticas y personalizadas que favorecen autonomía, participación y bienestar.",                       price:"$70 USD",  dur:"Sesión virtual · 50 min", note:"No constituye intervención infantil." },
  { icon:"💑", name:"Acompañamiento a Parejas",            desc:"Trabajamos comunicación, patrones repetitivos y crisis evolutivas, promoviendo acuerdos más conscientes y una conexión sólida y auténtica.",                                                          price:"$98 USD",  dur:"Sesión virtual · 50 min", note:null },
  { icon:"🌙", name:"Asesoría en Sueño",                   desc:"Integramos la ciencia del sueño y crianza respetuosa para construir hábitos saludables y sostenibles, priorizando el descanso y la regulación emocional de la familia.",                             price:"$115 USD", dur:"Sesión virtual · 90 min", note:"No constituye psicoterapia infantil." },
];

const packages = [
    {
      icon:
        <Leaf style={{ color: "#5B6C7B" }}/>,
      badge: '1 SESIÓN',
      title: 'Espacio inicial',
      description: 'Ideal para iniciar tu proceso terapéutico o abordar una situación puntual.',
      checkIcon: 'purple',
      sessions: '1 sesión individual',
    },
    {
      icon:
        <Brain style={{ color: 'A67B4E' }} />,
      badge: '4 SESIONES',
      title: 'Proceso de acompañamiento',
      description: 'Un espacio para comenzar a trabajar emociones, pensamientos y herramientas de manera más constante.',
      checkIcon: 'gold',
      sessions: '4 sesiones individuales',
      popular: true,
    },
    {
      icon:
        <Heart />,
      badge: '8 SESIONES',
      title: 'Proceso terapéutico continuo',
      description: 'Pensado para quienes desean profundizar en su proceso emocional y generar cambios más conscientes y sostenibles.',
      checkIcon: 'purple',
      sessions: '8 sesiones individuales',
    },
  ];

const PILLARS = [
  "Acompañamiento psicológico online",
  "Español e inglés",
  "Modalidad individual y de pareja",
  "Actualizado en la línea de crianza respetuosa",
  "Psicólogas mágister y supervisadas por Mindheart",
  "Protocolos éticos para alto estándar de calidad",
];

const FAQS = [
  { 
    q: "¿Cómo puedo agendar mi primera sesión?", 
    a: "Es muy sencillo. Solo debes elegir al especialista que necesitas (Psicólogo, Fisioterapeuta o Terapeuta), seleccionar un horario disponible en su agenda y completar tus datos. Recibirás una confirmación inmediata en tu correo." 
  },
  { 
    q: "¿Las sesiones son presenciales o virtuales?", 
    a: "Depende de la especialidad y del profesional. Contamos con expertos que ofrecen teleconsulta (ideal para psicología y asesorías) y especialistas con atención presencial en consultorio (especialmente para fisioterapia y rehabilitación física)." 
  },
  { 
    q: "¿Qué sucede si necesito cambiar de especialista?", 
    a: "Tu bienestar es nuestra prioridad. Si sientes que el enfoque de un profesional no es el que buscabas, nuestro equipo te ayudará a encontrar el perfil más adecuado dentro de nuestra red de expertos para continuar tu proceso." 
  },
  { 
    q: "¿Atienden a personas de todas las edades?", 
    a: "Sí. Nuestra red cuenta con especialistas certificados para atender niños, jóvenes, adultos y adultos mayores, cubriendo desde el desarrollo infantil y la crianza hasta la rehabilitación física y el cuidado emocional en la adultez." 
  },
];

const TESTS = [
  { q:"Cada proceso terapéutico es único, y merece un espacio seguro donde trabajar con claridad y respeto los objetivos personales y familiares.",   a:"Terapeuta del equipo", r:"Mindheart Therapy" },
  { q:"Creo en la capacidad de cada persona para volver a contactarse con sus recursos internos, incluso en los momentos de mayor dolor.",             a:"Terapeuta del equipo", r:"Mindheart Therapy" },
  { q:"Acompaño procesos emocionales y relacionales desde la compasión, la evidencia y el respeto profundo por cada historia.",                        a:"Terapeuta del equipo", r:"Mindheart Therapy" },
];

const FOR_ITEMS = [
  { t:"🌱 Hay emociones que te cuesta entender o expresar.",      d:"Estás listo o lista para tomar responsabilidad de tu vida y sanar viejas heridas que te encadenan." },
  { t:"🧠 Sientes que tu mente no descansa o que estás cargando demasiado.",   d:"Te sientes agotada, culpable o emocionalmente desbordada. Necesitas un espacio solo para ti, sin juicio." },
  { t:"💛 Te gustaría fortalecer autoestima, límites o bienestar emocional.",     d:"Quieres frenar tus automáticos y darle a tu hijo o hija lo que no recibiste, aún sin saber muy bien cómo." },
  { t:"👶 Tu hijo(a) está atravesando cambios emocionales, conductuales o dificultades para expresar lo que siente.",      d:"Maternidad, migración, separación, cambios laborales. Necesitas sostén emocional y un espacio seguro para integrar lo que está cambiando." },
  { t:"✨ Estás pasando por situaciones que han afectado tu tranquilidad, relaciones o forma de verte a ti mismo.", d:"Quieres comprender las conductas infantiles y fortalecer el vínculo desde una mirada respetuosa." },
  { t:"🤍 Necesitas un espacio donde sentirte escuchado sin juicio.",          d:"Vives con burnout, desconexión o cansancio profundo, y necesitas regularte y reencontrarte contigo." },
];

const SERVICES = [
  { id:"1", icon:"🌿", name:"Espacio inicial", price:"A confirmar", dur:"1 sesión individual" },
  { id:"2",  icon:"🧠", name:"Proceso de acompañamiento", price:"A confirmar", dur:"4 sesiones individuales", popular:true },
  { id:"3",        icon:"♡", name:"Proceso terapéutico continuo", price:"A confirmar", dur:"8 sesiones individuales" },
];

const THERAPISTS = [
  { id:"cualquiera", name:"Sin preferencia (asignamos la mejor para ti)" },
  { id:"fisioterapia",    name:"Especialista 1 — Fisioterapia" },
  { id:"psigologia",      name:"Especialista 2 - Psicologia" },
];

const SLOTS = [
  { time:"7:00 AM",  available:true  },
  { time:"8:00 AM",  available:true  },
  { time:"9:00 AM",  available:false },
  { time:"10:00 AM", available:true  },
  { time:"11:00 AM", available:false },
  { time:"12:00 PM", available:true  },
  { time:"2:00 PM",  available:true  },
  { time:"3:00 PM",  available:true  },
  { time:"4:00 PM",  available:false },
  { time:"5:00 PM",  available:true  },
  { time:"6:00 PM",  available:true  },
  { time:"7:00 PM",  available:true  },
];

const STEPS = [
  { num:1, label:"Tu información",    sub:"Datos de contacto" },
  { num:2, label:"Plan",    sub:"Selecciona tu plan" },
  { num:3, label:"Fecha y hora",      sub:"Elige disponibilidad" },
  //{ num:4, label:"Confirmación",      sub:"Revisa y confirma" },
];

const STEP_META : StepMeta[] = [
  {
     tag:"Paso 1 de 4", 
     title: <>Cuéntanos un poco <em>sobre ti</em></>, 
     sub:"Usamos estos datos únicamente para crear tu perfil y asignarte la terapeuta ideal." 
  },
  { tag:"Paso 2 de 4", title:<>¿Qué tipo de <em>sesión</em> necesitas?</>, sub:"Elige el servicio que más se ajuste y selecciona cómo quieres que se lleve a cabo." },
  { tag:"Paso 3 de 4", title:<>Elige tu <em>momento</em></>, sub:"Estos horarios están en tu zona horaria local. Las celdas apagadas ya están ocupadas." },
  { tag:"Paso 4 de 4", title:<>Todo listo, <em>confirma tu cita</em></>, sub:"Revisa que los datos estén correctos antes de agendar." },
];

function validate(step: number, d : {
    nombre: string;
    email: string;
    tel: string;
    pais: string;
    fuente: string;
    reason: string;
    svc: string;
    modalidad: string;
    zona: string;
    fecha: string;
    hora: string;
}) {
  const e : {
    nombre: string;
    email: string;
    tel: string;
    pais: string;
    svc: string;
    modalidad: string; 
    zona: string;
    fecha: string;
    hora: string;
  } = {
    nombre: '',
    email: '',
    tel: '',
    pais: '',
    svc: '',
    modalidad: '',
    zona: '',
    fecha: '',
    hora: '',
  };
  if(step===0){
    if(!d.nombre.trim())  e.nombre="Requerido";
    if(!d.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email="Correo inválido";
    if(!d.tel.trim())     e.tel="Requerido";
    if(!d.pais)           e.pais="Selecciona tu país";
  }
  if(step===1){
    if(!d.svc)       e.svc="Selecciona un paquete";
    if(!d.modalidad) e.modalidad="Selecciona una modalidad";
    if(d.modalidad === "presencial" && !d.zona) e.zona="Selecciona una zona";
  }
  if(step===2){
    if(!d.fecha)  e.fecha="Selecciona una fecha";
    if(!d.hora)   e.hora="Selecciona un horario";
  }
  return e;
}

/* ── VALIDATION ── */
function validateStep(step: number, data: {
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
  fuente: string;
  mensaje: string;
  servicio: string;
  terapeuta: string;
  modalidad: string;
  fecha: string;
  hora: string;
  consentimiento: boolean;
}) {
  const errs : {
    nombre: string;
    email: string;
    telefono: string;
    pais: string;
    servicio: string;
    modalidad: string; 
    fecha: string;
    hora: string;
    consentimiento: string;
  } = {
    nombre: '',
    email: '',
    telefono: '',
    pais: '',
    servicio: '',
    modalidad: '',
    fecha: '',
    hora: '',
    consentimiento: ''
  };
  if (step === 0) {
    if (!data.nombre.trim())                  errs.nombre    = "Tu nombre es requerido";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Ingresa un correo válido";
    if (!data.telefono.trim())                errs.telefono  = "Tu teléfono es requerido";
    if (!data.pais.trim())                    errs.pais      = "Selecciona tu país";
  }
  if (step === 1) {
    if (!data.servicio)                       errs.servicio  = "Selecciona un servicio";
    if (!data.modalidad)                      errs.modalidad = "Selecciona una modalidad";
  }
  if (step === 2) {
    if (!data.fecha)                          errs.fecha     = "Selecciona una fecha";
    if (!data.hora)                           errs.hora      = "Selecciona un horario";
  }
  if (step === 3) {
    if (!data.consentimiento)                 errs.consentimiento = "Debes aceptar los términos para continuar";
  }
  return errs;
}

/* Generate next 8 days */
function getNextDays() {

  const days = [

    "Dom","Lun","Mar",

    "Mié","Jue","Vie","Sáb"

  ];

  const months = [

    "Ene","Feb","Mar","Abr",

    "May","Jun","Jul","Ago",

    "Sep","Oct","Nov","Dic"

  ];

  const result = [];

  const today = new Date();

  for(let i=1;i<=8;i++){

    const d = new Date(today);

    d.setDate(
      today.getDate()+i
    );

    if(d.getDay()!==0){

      result.push({

        day:
        days[d.getDay()],

        num:
        d.getDate(),

        month:
        months[d.getMonth()],

        // UI

        display:
        d.toLocaleDateString(

          "es-CO",

          {

            weekday:"long",

            day:"numeric",

            month:"long"

          }

        ),

        // SQL / Supabase

        sql:
        d.toISOString()
        .split('T')[0]

      });

    }

  }

  return result;

}



export {
    T1,
    T2,
    LOGO,
    LOGO_NOMBRE,
    HERO,
    AB1,
    AB2,
    FORYOU,
    H1,
    H2,
    H3,
    SVCS,
    packages,
    FAQS,
    PILLARS,
    TESTS,
    FOR_ITEMS,
    SERVICES,
    THERAPISTS,
    SLOTS,
    STEPS,
    STEP_META,
    validateStep,
    validate,
    getNextDays
}
