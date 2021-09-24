import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IRefreshToken } from '../../IRefreshToken';
@Entity('white_list_refresh_tokens')
export class TypeORMRefreshToken implements IRefreshToken {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid', { name: 'user_id', unique: true })
  userId: string;

  @Column('varchar', { unique: true, name: 'access_token' })
  accessToken: string;

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
