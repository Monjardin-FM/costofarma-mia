import { Victim } from "../entities/victim";
import { VicimById } from "../entities/victim-by-id";
import { VictimMail } from "../entities/victim-mail";

export type VictimRepository = {
  getVictimByMail(params: { mail: string }): Promise<VictimMail[]>;
  getVictimDefendant(params: {
    completeName: string;
    idDefendant: number;
  }): Promise<Victim[]>;
  getVictimById(params: {
    completeName: string;
    idPerson: number;
  }): Promise<VicimById>;
  assignDefendantVictim(params: {
    idDefendant: number;
    idVictim: number;
  }): Promise<void>;
  createVictim(params: {
    completeName: string;
    name: string;
    lastName: string;
    idDefendant: number;
    eMail: string;
    caseNumber: string;
    birthDate: string;
    idGender: number;
    idStatus: number;
    password: string;
    userName: string;
  }): Promise<{
    data: number;
    statusCode: number;
    isSuccess: boolean;
    error?: {
      code?: string;
      message?: string;
      errors?: {};
    };
  }>;
  updateVictim(params: {
    idPerson: number;
    completeName: string;
    name: string;
    lastName: string;
    idDefendant: number;
    caseNumber: string;
    birthDate: string;
    idGender: number;
    idStatus: number;
    password: string;
    userName: string;
    eMail: string;
  }): Promise<{
    statusCode: number;
    isSuccess: boolean;
    error?: {
      code?: string;
      message?: string;
      errors?: {};
    };
  }>;
  deleteVictim(parms: { idPerson: number }): Promise<Boolean>;
};
