import {
  IMessageStatusEnum,
  IMessageUserStatus,
} from '../../IMessageUserStatus';

export class InMemoryMessageUserStatus implements IMessageUserStatus {
  userId: string;

  messageId: string;

  status: IMessageStatusEnum;

  constructor(props: InMemoryMessageUserStatus) {
    Object.assign(this, props);
  }
}
