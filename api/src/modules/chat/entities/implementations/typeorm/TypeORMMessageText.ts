import { Column, Entity, PrimaryColumn } from 'typeorm';

import { IMessageText } from '../../IMessageText';

@Entity('messages_text')
export class TypeORMMessageText implements IMessageText {
  @PrimaryColumn('uuid', { name: 'message_id' })
  messageId: string;

  @Column('varchar')
  content: string;
}
