import { v4 as uuid } from 'uuid';

import { IMessage, IMessageTypeEnum } from '../../IMessage';

export class InMemoryMessage implements IMessage {
  id: string;

  userId: string;

  type: IMessageTypeEnum;

  deleted: boolean;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    props: Omit<InMemoryMessage, 'id' | 'deleted' | 'createdAt' | 'updatedAt'>
  ) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
