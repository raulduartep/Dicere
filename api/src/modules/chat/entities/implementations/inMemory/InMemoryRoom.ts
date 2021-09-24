import { v4 as uuid } from 'uuid';

import { IRoom, IRoomTypeEnum } from '../../IRoom';
import { InMemoryGroup } from './InMemoryGroup';
import { InMemoryRoomMessage } from './InMemoryRoomMessage';
import { InMemoryRoomUser } from './InMemoryRoomUser';

export class InMemoryRoom implements IRoom {
  readonly id: string;
  active: boolean;
  typeConversation: IRoomTypeEnum;
  usersInside?: InMemoryRoomUser[];
  group?: InMemoryGroup;
  messages?: InMemoryRoomMessage[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    props: Omit<
      InMemoryRoom,
      | 'id'
      | 'active'
      | 'createdAt'
      | 'updatedAt'
      | 'usersInside'
      | 'group'
      | 'messages'
    >
  ) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
