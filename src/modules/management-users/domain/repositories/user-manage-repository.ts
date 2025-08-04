import { County } from "../entities/county";
import { Gender } from "../entities/gender";
import { Role } from "../entities/role";
import { UserManageById } from "../entities/user-manage-by-id";
import { UserManage } from "../entities/userManage";

export type UserManageRepository = {
  getUsers(params: { completeName: string }): Promise<UserManage[]>;
  getUserById(params: {
    completeName: string;
    idUser: number;
  }): Promise<UserManageById>;
  getGender(): Promise<Gender[]>;
  getCounty(): Promise<County[]>;
  getRole(): Promise<Role[]>;
  saveUser(params: {
    completeName: string;
    name: string;
    lastName: string;
    idCounty: number;
    eMail: string;
    idGender: number;
    idStatus: number;
    password: string;
    idRole: number;
    phone: string;
    userName: string;
  }): Promise<{
    statusCode: number;
    isSuccess: boolean;
    error?: {
      code?: string;
      message?: string;
      errors?: {};
    };
  }>;
  updateUser(params: {
    idPerson: number;
    completeName: string;
    name: string;
    lastName: string;
    idCounty: number;
    idGender: number;
    idStatus: number;
    password: string;
    idRole: number;
    phone: string;
    userName: string;
  }): Promise<{
    statusCode: number;
    isSuccess: boolean;
    error?: {
      code?: string;
      message?: string;
      errors?: {};
    };
  }>;
  deleteUser(params: { idPerson: number }): Promise<boolean>;
};
