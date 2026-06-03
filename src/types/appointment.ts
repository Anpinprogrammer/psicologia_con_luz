export type Appointment = {
  psychologist_id:string
  nombre: string
  email: string
  telefono: string
  pais: string
  source: string
  status?: string
  plan: string
  modalidad: string
  appointment_date: string
  appointment_time: string
  meeting_url?:string
  motivo?:string
  zona?: string | null
}