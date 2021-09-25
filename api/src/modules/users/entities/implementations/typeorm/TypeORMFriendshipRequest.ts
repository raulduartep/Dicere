import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import {
  IEnumDecisionFriendshipRequest,
  IFriendshipRequest,
} from '../../IFriendshipRequest';
@Entity('friendships_requests')
export class TypeORMFriendshipRequest implements IFriendshipRequest {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'friend_id' })
  friendId: string;

  @Column('enum', {
    enum: IEnumDecisionFriendshipRequest,
    enumName: 'IEnumDecisionFriendshipRequest',
    default: null,
    nullable: true,
  })
  decision: IEnumDecisionFriendshipRequest;

  @Column('boolean', { default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
