export type DataTransmiting = {
    data: {
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
        };
    setData: React.Dispatch<React.SetStateAction<{
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
    }>>;
    errors: {
        nombre: string;
        email: string;
        tel: string;
        pais: string;
        svc: string;
        modalidad: string; 
        zona: string;
        fecha: string;
        hora: string;
    };
    dRef? : React.RefObject<{
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
    }>;
}

export type StepMeta = {
  tag: string;
  title: React.ReactNode;
  sub: string;
};
