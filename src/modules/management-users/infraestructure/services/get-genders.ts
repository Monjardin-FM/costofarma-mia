import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Gender } from "../../domain/entities/gender";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";

export const getGendersService: UserManageRepository["getGender"] =
  async () => {
    const response = await api().get("Catalog/Gender", {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const genders = data.map<Gender>((gender) => ({
      idGender: gender.idGender,
      gender: gender.gender,
    }));
    return genders;
  };
