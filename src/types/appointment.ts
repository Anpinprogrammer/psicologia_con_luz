export type Appointment = {
  psychologist_id:string
  nombre: string
  email: string
  telefono: string
  pais: string
  servicio: string
  modalidad: string
  appointment_date: string
  appointment_time: string
  meeting_url?:string
  note?:string
  consent: boolean
}