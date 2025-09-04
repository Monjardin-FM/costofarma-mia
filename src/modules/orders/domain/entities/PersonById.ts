export type PersonById = {
  idUser: number;
  idPersona: number;
  idPersonaConvenio: number;
  idGenero: number;
  idConvenio: number;
  rfc: string;
  nombre: string;
  paterno: string;
  materno: string;
  direccion: {
    idDomicilio: number;
    calle: string;
    colonia: string;
    municipio: string;
    estado: string;
    cp: string;
    referencia1: string;
    referencia2: string;
    telefono: string;
    mail: string;
    idMunicipio: number;
    idEstado: number;
  };
};
