import { useAsyncFn } from "react-use";
import { PatientRepository } from "../../domain/repositories/patient-repository";
import { createPatientService } from "../../infraestructure/create-patient";

export const useCreatePatient = () => {
  const [{ error, loading, value: isCreated }, createPatient] = useAsyncFn<
    PatientRepository["createPatient"]
  >(createPatientService, [createPatientService]);
  return {
    createPatient,
    error,
    loading,
    isCreated,
  };
};
