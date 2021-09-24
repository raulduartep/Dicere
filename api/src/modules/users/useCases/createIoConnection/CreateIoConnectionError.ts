import { AppError } from '@shared/errors/AppError';

export namespace CreateIoConnectionError {
  export class UserDoesNotExists extends AppError {
    constructor() {
      super('User does not exists');
    }
  }
}
