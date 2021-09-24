import { IMessageText } from '../../IMessageText';

export class InMemoryMessageText implements IMessageText {
  messageId: string;
  content: string;

  constructor(props: InMemoryMessageText) {
    Object.assign(this, props);
  }
}
