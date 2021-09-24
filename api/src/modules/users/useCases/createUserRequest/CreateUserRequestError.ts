import { AppError } from '@shared/errors/AppError';

export namespace CreateUserRequestError {
  export class EmailAlreadyExists extends AppError {
    constructor() {
      super('User with the informed email already exists');
    }
  }
}
