import { IMessage } from 'contexts/chat';
import { ApiMessage } from 'hooks/useChat';

export class MessageMap {
  static map(message: ApiMessage): IMessage {
    if (message.type === 'text') {
      return {
        ...message,
        status: 'received_by_api',
        date: message.createdAt,
      };
    }

    return {
      ...message,
      status: 'received_by_api',
      date: message.createdAt,
      loadedMediaUrl: undefined,
      mediaName: message.mediaPath,
    };
  }

  static mapMany(messages: ApiMessage[]): IMessage[] {
    const mapped = messages.map(item => MessageMap.map(item));

    return mapped;
  }
}
