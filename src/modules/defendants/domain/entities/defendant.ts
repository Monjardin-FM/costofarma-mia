export type Defendant = {
  birthDate: string; // Se mantiene como string ya que parece ser un formato específico ("0001-01-01T00:00:00")
  caseNumber: string;
  createdAt: string; // Se mantiene como string por el mismo motivo que birthDate
  deviceId: number;
  eMail: string;
  idCounty: number;
  idDefendant: number;
  idDeviceType: number;
  idGender: number;
  idOfficer: number;
  idPerson: number;
  idPersonType: number;
  idRole: number;
  idStatus: number;
  lastName: string;
  name: string;
  role: string;
  sid: string;
  userName: string;
};
