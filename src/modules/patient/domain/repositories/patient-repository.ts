export type PatientRepository = {
  createPatient: (params: {
    Telefono: string;
    Email: string;
    Poliza: string;
    idAseguradora: number;
  }) => Promise<{ idPersona: number }>;
};
