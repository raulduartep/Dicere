import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IIoConnection } from '../../IIoConnection';

@Entity('io_connections')
export class TypeORMIoConnection implements IIoConnection {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('varchar', { unique: true, name: 'socket_id' })
  socketId: string;

  @Column('uuid', { unique: true, name: 'user_id' })
  userId: string;

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
