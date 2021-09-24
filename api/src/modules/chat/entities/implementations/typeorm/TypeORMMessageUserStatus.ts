import { Column, Entity, PrimaryColumn } from 'typeorm';

import {
  IMessageStatusEnum,
  IMessageUserStatus,
} from '../../IMessageUserStatus';

@Entity('messages_users_status')
export class TypeORMMessageUserStatus implements IMessageUserStatus {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @PrimaryColumn('uuid', { name: 'message_id' })
  messageId: string;

  @Column('enum', { enum: IMessageStatusEnum, enumName: 'IMessageStatusEnum' })
  status: IMessageStatusEnum;
}
