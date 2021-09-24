import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IMessage, IMessageTypeEnum } from '../../IMessage';
@Entity('messages')
export class TypeORMMessage implements IMessage {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('boolean', { default: false })
  deleted: boolean;

  @Column('enum', { enumName: 'IMessageTypeEnum', enum: IMessageTypeEnum })
  type: IMessageTypeEnum;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
