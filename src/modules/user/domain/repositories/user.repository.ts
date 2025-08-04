import { User } from "../entities/user";

export interface UserRepositorySignInDTO {
  email: string;
  password: string;
}

export interface UserRepository {
  signIn({ email, password }: UserRepositorySignInDTO): Promise<User>;
}
