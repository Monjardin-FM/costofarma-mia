import { SignInUserService } from "../modules/user/application/services/signin/signin-user.service";
import { MiaUserRepository } from "../modules/user/infrastructure/repositories/mia-user.repository";

const userRepository = new MiaUserRepository();
const signInUserService = new SignInUserService(userRepository);

export { signInUserService };
