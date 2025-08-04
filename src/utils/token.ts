import { User } from "../modules/user/domain/entities/user";

export const token = () => {
  const userStored = localStorage.getItem("user");
  const user = userStored ? (JSON.parse(userStored) as User) : null;

  return user?.metadata.jwt;
};
