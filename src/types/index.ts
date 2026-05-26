export type DataTransmiting = {
    data: {
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
        };
    setData: React.Dispatch<React.SetStateAction<{
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
    }>>;
    errors: {
        nombre: string;
        email: string;
        tel: string;
        pais: string;
        svc: string;
        modalidad: string; 
        fecha: string;
        hora: string;
        consent: string;
    };
    dRef? : React.RefObject<{
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
    }>;
}

export type StepMeta = {
  tag: string;
  title: React.ReactNode;
  sub: string;
};