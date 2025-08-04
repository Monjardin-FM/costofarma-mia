export type VictimMail = {
  idDefendant: number;
  idVictim: number;
  idPerson: number;
  idOfficer: number;
  name: string;
  lastName: string;
  idCounty: number;
  eMail: string;
  caseNumber: string;
  birthDate: string; // ISO 8601 date string
  idGender: number;
  sid: string;
  idPersonType: number;
  idStatus: number;
  createdAt: string; // ISO 8601 date string
  idRole: number;
  deviceId: number;
  idDeviceType: number;
  showalerts: boolean;
};
