import { v4 as uuid } from 'uuid';

import { IIoConnection } from '../../IIoConnection';

export class InMemoryIoConnection implements IIoConnection {
  readonly id: string;

  socketId: string;

  userId: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    props: Omit<InMemoryIoConnection, 'id' | 'createdAt' | 'updatedAt'>
  ) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
