import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IGroup } from '../../IGroup';
@Entity('groups')
export class TypeORMGroup implements IGroup {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid', { name: 'room_id' })
  roomId: string;

  @Column('uuid', { name: 'admin_id' })
  adminId: string;

  @Column('varchar')
  name: string;

  @Column('boolean', { default: false })
  deleted: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
