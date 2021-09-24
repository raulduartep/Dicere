import { IMessageMedia, IMessageMediaTypeEnum } from '../../IMessageMedia';

export class InMemoryMessageMedia implements IMessageMedia {
  messageId: string;

  mediaPath: string;

  type: IMessageMediaTypeEnum;

  constructor(props: InMemoryMessageMedia) {
    Object.assign(this, props);
  }
}
