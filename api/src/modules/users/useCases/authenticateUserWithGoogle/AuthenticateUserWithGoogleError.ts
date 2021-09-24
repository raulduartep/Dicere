import { AppError } from '@shared/errors/AppError';

export namespace AuthenticateUserWithGoogleError {
  export class GoogleErrorGetAccessToken extends AppError {
    constructor() {
      super('Error to get google user access token', 401);
    }
  }

  export class GoogleErrorGetProfile extends AppError {
    constructor() {
      super('Error to get google profile', 401);
    }
  }
}
