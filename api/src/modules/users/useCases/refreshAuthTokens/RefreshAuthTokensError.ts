import { AppError } from '@shared/errors/AppError';

export namespace RefreshAuthTokensError {
  export class InvalidRefreshToken extends AppError {
    constructor() {
      super('Invalid refresh token', 401);
    }
  }
}
