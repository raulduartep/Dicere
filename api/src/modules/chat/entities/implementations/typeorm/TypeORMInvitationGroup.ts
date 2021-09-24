import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import {
  IEnumDecisionInvitationGroup,
  IInvitationGroup,
} from '../../IInvitationGroup';

@Entity('invitations_groups')
export class TypeORMInvitationGroup implements IInvitationGroup {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'friend_id' })
  friendId: string;

  @Column('uuid', { name: 'group_id' })
  groupId: string;

  @Column('enum', {
    enum: IEnumDecisionInvitationGroup,
    enumName: 'IEnumDecisionInvitationGroup',
    default: null,
    nullable: true,
  })
  decision: IEnumDecisionInvitationGroup;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
