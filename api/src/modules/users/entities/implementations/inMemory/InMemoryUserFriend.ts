import { IUserFriend } from '../../IUserFriend';

export class InMemoryUserFriend implements IUserFriend {
  userId: string;

  friendId: string;

  createdAt: Date;

  constructor(props: Omit<InMemoryUserFriend, 'createdAt'>) {
    Object.assign(this, {
      ...props,
      createdAt: new Date(),
    });
  }
}
