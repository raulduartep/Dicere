import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IUser } from '../../IUser';

@Entity('users')
export class TypeORMUser implements IUser {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  picture: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { nullable: true })
  password: string;

  @Column('boolean', { default: false })
  deleted: boolean;

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
