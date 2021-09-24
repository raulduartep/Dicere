import { Column, Entity, PrimaryColumn } from 'typeorm';

import { IMessageMedia, IMessageMediaTypeEnum } from '../../IMessageMedia';

@Entity('messages_media')
export class TypeORMMessageMedia implements IMessageMedia {
  @PrimaryColumn('uuid', { name: 'message_id' })
  messageId: string;

  @Column('varchar', { name: 'media_path' })
  mediaPath: string;

  @Column('enum', {
    enumName: 'IMessageMediaTypeEnum',
    enum: IMessageMediaTypeEnum,
  })
  type: IMessageMediaTypeEnum;
}
