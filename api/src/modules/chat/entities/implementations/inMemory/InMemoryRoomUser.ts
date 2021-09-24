import { IRoomUser } from '../../IRoomUser';

export class InMemoryRoomUser implements IRoomUser {
  userId: string;

  roomId: string;

  createdAt: Date;

  constructor(props: Omit<InMemoryRoomUser, 'createdAt'>) {
    Object.assign(this, {
      ...props,
      createdAt: new Date(),
    });
  }
}
