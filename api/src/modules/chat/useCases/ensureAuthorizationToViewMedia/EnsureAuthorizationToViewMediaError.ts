import { AppError } from '@shared/errors/AppError';

export namespace EnsureAuthorizationToViewMediaError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class MediaDoesNotExist extends AppError {
    constructor() {
      super('Media does not exist', 404);
    }
  }

  export class UserNotAuthorized extends AppError {
    constructor() {
      super('User not authorized for view media', 403);
    }
  }
}
