import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IRoom, IRoomTypeEnum } from '../../IRoom';
@Entity('rooms')
export class TypeORMRoom implements IRoom {
  @PrimaryColumn('uuid')
  id: string;

  @Column('boolean', { default: true })
  active: boolean;

  @Column('enum', {
    enumName: 'IRoomTypeEnum',
    enum: IRoomTypeEnum,
    name: 'type_conversation',
  })
  typeConversation: IRoomTypeEnum;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
