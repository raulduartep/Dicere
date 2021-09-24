import { AppError } from '@shared/errors/AppError';

export namespace ResetPasswordError {
  export class AccessTokenInvalid extends AppError {
    constructor() {
      super('Access token is invalid');
    }
  }

  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class ForgotPasswordDoesNotExist extends AppError {
    constructor() {
      super('Forgot password does not exist');
    }
  }

  export class ForgotPasswordIsInvalid extends AppError {
    constructor() {
      super('Forgot password is invalid');
    }
  }

  export class ForgotPasswordIsExpired extends AppError {
    constructor() {
      super('Forgot password is expired');
    }
  }

  export class TokenInvalid extends AppError {
    constructor() {
      super('Token is invalid to forgot password');
    }
  }
}
