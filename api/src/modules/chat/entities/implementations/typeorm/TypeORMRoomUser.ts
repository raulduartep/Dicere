import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { IRoomUser } from '../../IRoomUser';

@Entity('rooms_users')
export class TypeORMRoomUser implements IRoomUser {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @PrimaryColumn('uuid', { name: 'room_id' })
  roomId: string;

  @CreateDateColumn({ type: 'timestamp', default: 'now()', name: 'created_at' })
  createdAt: Date;
}
