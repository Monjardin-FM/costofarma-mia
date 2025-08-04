import { DefendantById } from "../entities/defendant-by-id";
import { Defendant } from "../entities/defendant";
import { DefendantDevice } from "../entities/defendant-device";
import { Address } from "../entities/address";
import {
  AlarmException,
  SpecificAlarmParams,
} from "../entities/alarm-defendant-params";
import {
  AlarmDefendant,
  AlarmDefendantById,
} from "../entities/alarm-defendant";
import { Phone, PhoneById } from "../entities/phone";
import { AutomaticAlarmsDefendant } from "../entities/automatic-alarm-defendant";
import { ScheduleAlarm } from "../entities/schedule-alarm";
import { CaseNumber } from "../entities/case-number";
import { AlarmDefendantDetail } from "../entities/alarm-defendant-detail";
import { ReferenceContact } from "../entities/reference-contact";
import { CommentDefendant } from "../entities/comment";
export type createDefendantParams = {
  completeName: string;
  name: string;
  lastName: string;
  idCounty: number;
  idOfficer: number;
  eMail: string;
  sid: string;
  offense: string;
  caseNumber: string;
  birthDate: string;
  idGender: number;
  idStatus: number;
  password: string;
  notes: string;
  userName: string;
};
export type DefendantRepository = {
  getDefendant(params: { completeName: string }): Promise<Defendant[]>;
  getDefendantById(params: {
    // completeName: string;
    idPerson: number;
  }): Promise<DefendantById>;
  createDefendant(params: createDefendantParams): Promise<{
    statusCode: number;
    isSuccess: boolean;
    data: number;
    error: {
      code: string;
      message: string;
      errors: {};
    };
  }>;
  updateDefendant(params: {
    idPerson: number;
    completeName: string;
    name: string;
    lastName: string;
    idCounty: number;
    idOfficer: number;
    sid: string;
    offense: string;
    // caseNumber: string;
    birthDate: string;
    idGender: number;
    idStatus: number;
    password: string;
    notes: string;
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
  deleteDefendant(parms: { idPerson: number }): Promise<Boolean>;
  getDeviceDefendant(params: {
    idDefendant: number;
  }): Promise<DefendantDevice[]>;
  assignDeviceDefendant(params: {
    idPerson: number;
    idDevice: number;
    idDeviceType: number;
  }): Promise<void>;
  updateDeviceDefendant(params: {
    idPerson: number;
    idDevice: number;
    idDeviceNew: number;
    imei: string;
    imeiNew: string;
  }): Promise<void>;
  deleteDeviceDefendant(params: { idDevice: number }): Promise<Boolean>;
  assignAddress(params: {
    idPerson: number;
    idAddressType: number;
    idCity: number;
    zipCode: string;
    streetAvenue: string;
    idStatus: number;
  }): Promise<void>;
  getAddressPerson(params: { idPerson: number }): Promise<Address[]>;
  getAddressById(params: { idAddress: number }): Promise<Address>;
  editAddressPerson(params: {
    idAddress: number;
    idAddressType: number;
    idCity: number;
    zipCode: string;
    streetAvenue: string;
    idStatus: number;
  }): Promise<void>;
  deleteAddressPerson(params: { idAddress: number }): Promise<Boolean>;
  assignAlarmDefendant(params: SpecificAlarmParams): Promise<void>;
  getSpecificAlarmDefendant: (params: {
    idPerson: number;
  }) => Promise<AlarmDefendant[]>;
  getSpecificAlarmById: (params: {
    idPersonSpecificAlarm: number;
  }) => Promise<AlarmDefendantById>;
  deleteSpecificAlarmDefendant: (params: {
    idAlarmDefendant: number;
  }) => Promise<Boolean>;

  getPhonePerson: (params: { idPerson: number }) => Promise<Phone[]>;
  getPhoneById: (params: { idPhone: number }) => Promise<PhoneById>;
  assignPhone: (params: { idPerson: number; phone: string }) => Promise<void>;
  deletePhone: (params: { idPhone: number }) => Promise<Boolean>;
  getDefendantAlarms: (params: {
    idPerson: number;
  }) => Promise<AutomaticAlarmsDefendant[]>;
  postScheduleAlarmDefendant: (params: {
    idDefendant: number;
    idAlarmType: number;
    description: string;
    alarmException: AlarmException[];
  }) => Promise<void>;
  getScheduleAlarms: (params: {
    idDefendant: number;
    idAlarmType: number;
  }) => Promise<ScheduleAlarm[]>;
  deleteScheduleAlarm: (params: { idAlarm: number }) => Promise<Boolean>;
  getCaseNumber: (params: { idPerson: number }) => Promise<CaseNumber[]>;
  createCaseNumber: (params: {
    idPerson: number;
    caseNumber: string;
  }) => Promise<void>;
  updateCaseNumber: (params: {
    idCaseNumber: number;
    caseNumber: string;
  }) => Promise<void>;
  deleteCaseNumber: (params: { idCaseNumber: number }) => Promise<Boolean>;
  getAlarmDefendantDetail: (params: {
    idDefendant: number;
    idAlarmType: number;
  }) => Promise<AlarmDefendantDetail>;
  updateAlarmDefendantDetail: (params: {
    idAlarmType: number;
    idPerson: number;
    responseInterval: number;
    geocordinateTimeout: number;
    dynamicDistance: number;
    enableResponseCall: boolean;
    resolveTime: number;
    callText: string;
    smsText: string;
    mailText: string;
  }) => Promise<void>;
  sendMessageDefendant: (params: {
    mensaje: string;
    number: string;
  }) => Promise<void>;
  uploadFile: (params: {
    idPerson: number;
    extension: string;
    file: string;
  }) => Promise<void>;
  downloadFile: (params: { idPerson: number }) => Promise<string>;
  getReferenceContact: (params: {
    idDefendant: number;
  }) => Promise<ReferenceContact[]>;
  getReferenceContactById: (params: {
    referenceId: number;
  }) => Promise<ReferenceContact>;
  createReferenceContact: (params: {
    idPerson: number;
    phoneNumber: string;
    name: string;
    relationship: string;
    address: string;
  }) => Promise<void>;
  editReferenceContact: (params: {
    idReferencePerson: number;
    idPerson: number;
    phoneNumber: string;
    name: string;
    relationship: string;
    address: string;
  }) => Promise<void>;
  deleteReferencePerson: (params: { idReference: number }) => Promise<Boolean>;
  postCommentDefendant: (params: {
    idDefendant: number;
    comment: string;
  }) => Promise<void>;
  getCommentDefendant: (params: {
    idPerson: number;
  }) => Promise<CommentDefendant>;
  updateCommentDefendant: (params: {
    idDefendant: number;
    comment: string;
  }) => Promise<void>;
};
