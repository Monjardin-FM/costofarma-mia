import { SignInUserService } from "../application/services/signin/signin-user.service";
import { MiaUserRepository } from "./repositories/mia-user.repository";

export const userModule = () => {
  const repository = new MiaUserRepository();
  const service = new SignInUserService(repository);

  return {
    signIn: service,
  };
};
