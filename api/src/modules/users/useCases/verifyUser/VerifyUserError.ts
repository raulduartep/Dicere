import { AppError } from '@shared/errors/AppError';

export namespace VerifyUserError {
  export class AccessTokenInvalid extends AppError {
    constructor() {
      super('Access token is invalid');
    }
  }

  export class VerificationUserDoesNotExist extends AppError {
    constructor() {
      super('Verification user does not exist');
    }
  }

  export class VerificationUserIsExpired extends AppError {
    constructor() {
      super('Verification user is invalid');
    }
  }

  export class TokenInvalid extends AppError {
    constructor() {
      super('Token is invalid to verification user');
    }
  }
}
