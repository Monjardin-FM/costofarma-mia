import { BaseException } from "./base.exception";
export class AuthenticationException extends BaseException {
  constructor(code: string, message?: string) {
    super(code, message);
    this.name = "authentication_exception";
  }
}
