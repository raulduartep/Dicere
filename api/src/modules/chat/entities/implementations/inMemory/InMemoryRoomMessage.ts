import { IRoomMessage } from '../../IRoomMessage';

export class InMemoryRoomMessage implements IRoomMessage {
  messageId: string;

  roomId: string;

  constructor(props: InMemoryRoomMessage) {
    Object.assign(this, props);
  }
}
