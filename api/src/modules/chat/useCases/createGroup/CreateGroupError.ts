import { AppError } from '@shared/errors/AppError';

export namespace CreateGroupError {
  export class UserDoesNotExists extends AppError {
    constructor() {
      super('User does not exists');
    }
  }
}
