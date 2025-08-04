import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { CaseNumber } from "../../domain/entities/case-number";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getCaseNumberService: DefendantRepository["getCaseNumber"] =
  async (params) => {
    const response = await api().get(
      `Defendant/CaseNumber/${params.idPerson}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
          // 'Content-Type': 'application/json',
        },
        // searchParams: params,
      }
    );
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const caseNumber = data.map<CaseNumber>((cn) => ({
      caseNumber: cn.caseNumber,
      idCaseNumber: cn.idCaseNumber,
      idPerson: cn.idPerson,
      idStatus: cn.idStatus,
    }));
    return caseNumber;
  };
