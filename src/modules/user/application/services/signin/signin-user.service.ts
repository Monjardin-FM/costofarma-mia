import { SignInUserDTO } from "./signin-user.dto";
import { SignInUserException } from "./exceptions/signin-user.exception";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user.repository";

export class SignInUserService {
  private readonly repository: UserRepository;

  public constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute({ email, password }: SignInUserDTO): Promise<User> {
    try {
      const data = await this.repository.signIn({ email, password });
      return data;
    } catch (error) {
      throw new SignInUserException();
    }
  }
}
