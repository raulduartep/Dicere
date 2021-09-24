import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { IUserFriend } from '../../IUserFriend';
@Entity('users_friends')
export class TypeORMUserFriend implements IUserFriend {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @PrimaryColumn('uuid', { name: 'friend_id' })
  friendId: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()' })
  createdAt: Date;
}
