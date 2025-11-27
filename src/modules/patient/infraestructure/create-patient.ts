import { api } from "../../../utils/api";
import { verifyResponse } from "../../../utils/check-response";
import { token } from "../../../utils/token";
import { PatientRepository } from "../domain/repositories/patient-repository";

export const createPatientService: PatientRepository["createPatient"] = async (
  params
) => {
  const response = await api().post("Order/Asegurado", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  const { body } = await verifyResponse({ response });
  const data = body.data;
  return { idPersona: data.idPersona };
};
