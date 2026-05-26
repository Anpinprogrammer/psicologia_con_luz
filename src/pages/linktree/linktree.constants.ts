import type { LinkItem, ProfileData } from './linktree.types'

export const DEFAULT_PROFILE: ProfileData = {
  name:      'Dra. María García',
  bio:       'Psicóloga clínica · Crianza consciente y bienestar familiar.',
  avatarUrl: '',
}

export const DEFAULT_LINKS: LinkItem[] = [
  { id:1, icon:'🌐', title:'Sitio web oficial', desc:'mindheart.co/therapy',  url:'https://mindheart.co/therapy', active:true  },
  { id:2, icon:'📸', title:'Instagram',          desc:'@mindheart.co',         url:'https://instagram.com',        active:true  },
  { id:3, icon:'🎥', title:'YouTube',            desc:'Canal de bienestar',    url:'https://youtube.com',          active:true  },
  { id:4, icon:'📅', title:'Agenda tu cita',     desc:'Primera sesión online', url:'https://mindheart.co',         active:true  },
  { id:5, icon:'🎙️', title:'Podcast',            desc:'Crianza con conciencia',url:'https://spotify.com',          active:false },
]

export const AVAILABLE_ICONS: string[] = [
  '🌐','📸','🎥','🎙️','📩','💬','📅','🛒',
  '📖','🎓','💼','🌿','💜','⭐','🔗','📱',
]

export const ICON_BG: Record<string, string> = {
  '🌐':'#E3EDF6','📸':'#FDF0E0','🎥':'#EDE8FA','🎙️':'#E3EDF6',
  '📩':'#FDF0E0','💬':'#EDE8FA','📅':'#E3EDF6','🛒':'#FDF0E0',
  '📖':'#EDE8FA','🎓':'#E3EDF6','💼':'#FDF0E0','🌿':'#EAF3DE',
  '💜':'#EDE8FA','⭐':'#FDF0E0','🔗':'#E3EDF6','📱':'#EDE8FA',
}
