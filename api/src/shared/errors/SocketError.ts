import { AppError } from './AppError';

export namespace SocketError {
  export class InternalServerError extends AppError {
    constructor() {
      super('Internal Server Error', 500);
    }
  }

  export class FirstArgumentObject extends AppError {
    constructor() {
      super('First argument needed is object', 500);
    }
  }
}
