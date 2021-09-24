import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IForgotPassword } from '../../IForgotPassword';

@Entity('white_list_forgot_password')
export class TypeORMForgotPassword implements IForgotPassword {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid', { name: 'user_id', unique: true })
  userId: string;

  @Column('varchar', { unique: true })
  token: string;

  @Column('timestamp', { name: 'expires_in' })
  expiresIn: Date;

  @Column('boolean', { name: 'is_valid', default: true })
  isValid: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
