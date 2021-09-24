import { Entity, PrimaryColumn } from 'typeorm';

import { IRoomMessage } from '../../IRoomMessage';
@Entity('rooms_messages')
export class TypeORMRoomMessage implements IRoomMessage {
  @PrimaryColumn('uuid', { name: 'message_id' })
  messageId: string;

  @PrimaryColumn('uuid', { name: 'room_id' })
  roomId: string;
}
