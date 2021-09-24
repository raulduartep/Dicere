/* eslint-disable @typescript-eslint/no-namespace */

export namespace SocketErrors {
  export class ConnectionUnathorized extends Error {
    constructor() {
      super('Usuário não autorizado');
    }
  }
}
