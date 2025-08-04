export class BaseException extends Error {
  readonly code: string;

  constructor(code: string, message?: string) {
    super(message);
    this.code = code;
  }
}
