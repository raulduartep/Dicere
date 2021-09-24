import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IVerificationUser } from '../../IVerificationUser';

@Entity('white_list_verification_users')
export class TypeORMVerificationUser implements IVerificationUser {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid', { name: 'user_request_id', unique: true })
  userRequestId: string;

  @Column('varchar', { unique: true })
  token: string;

  @Column('timestamp', { name: 'expires_in' })
  expiresIn: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
