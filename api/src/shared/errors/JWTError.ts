import { AppError } from './AppError';

export namespace JWTError {
  export class JWTTokenMissing extends AppError {
    constructor() {
      super('JWT token is missing', 401);
    }
  }

  export class JWTTokenInvalid extends AppError {
    constructor() {
      super('JWT token is invalid', 401);
    }
  }
}
