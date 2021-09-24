import { IChangeMessageUserStatusDTO } from '@modules/chat/dtos/IChangeMessageUserStatusDTO';
import {
  ICreateMessageTextDTO,
  ICreateMessageMediaDTO,
} from '@modules/chat/dtos/ICreateMessageDTO';
import { IGetMessageByRoomIdDTO } from '@modules/chat/dtos/IGetMessageByRoomIdDTO';
import { IMessageTypeEnum } from '@modules/chat/entities/IMessage';
import { IMessageMedia } from '@modules/chat/entities/IMessageMedia';
import { IMessageText } from '@modules/chat/entities/IMessageText';
import { IMessageStatusEnum } from '@modules/chat/entities/IMessageUserStatus';
import { InMemoryMessage } from '@modules/chat/entities/implementations/inMemory/InMemoryMessage';
import { InMemoryMessageMedia } from '@modules/chat/entities/implementations/inMemory/InMemoryMessageMedia';
import { InMemoryMessageText } from '@modules/chat/entities/implementations/inMemory/InMemoryMessageText';
import { InMemoryMessageUserStatus } from '@modules/chat/entities/implementations/inMemory/InMemoryMessageUserStatus';
import { InMemoryRoomMessage } from '@modules/chat/entities/implementations/inMemory/InMemoryRoomMessage';

import {
  IMessageResponse,
  IMessagesRepository,
} from '../../IMessagesRepository';

export class InMemoryMessagesRepository implements IMessagesRepository {
  private messages: InMemoryMessage[] = [];
  private textMessages: InMemoryMessageText[] = [];
  private mediaMessages: InMemoryMessageMedia[] = [];
  private roomsMessages: InMemoryRoomMessage[] = [];
  private messagesUserStatus: InMemoryMessageUserStatus[] = [];

  create(
    data: ICreateMessageMediaDTO
  ): Promise<IMessageResponse<IMessageMedia>>;
  create(data: ICreateMessageTextDTO): Promise<IMessageResponse<IMessageText>>;
  async create(
    data: ICreateMessageMediaDTO | ICreateMessageTextDTO
  ): Promise<IMessageResponse> {
    const { roomId, creatorUserId, typeMessage, forUsers } = data;

    const message = new InMemoryMessage({
      type: typeMessage,
      userId: creatorUserId,
    });

    this.messages.push(message);

    const roomMessage = new InMemoryRoomMessage({
      messageId: message.id,
      roomId,
    });

    this.roomsMessages.push(roomMessage);

    const messagesUsersStatus = await Promise.all(
      forUsers.map(async userId => {
        const messageUserStatus = new InMemoryMessageUserStatus({
          messageId: message.id,
          userId,
          status:
            userId === creatorUserId
              ? IMessageStatusEnum.VIEWED
              : IMessageStatusEnum.NOT_RECEIVED,
        });

        this.messagesUserStatus.push(messageUserStatus);

        return messageUserStatus;
      })
    );

    let messageContent: InMemoryMessageText | InMemoryMessageMedia;

    if (data.typeMessage === 'text') {
      const { content } = data;

      const messageText = new InMemoryMessageText({
        content,
        messageId: message.id,
      });

      this.textMessages.push(messageText);

      messageContent = messageText;
    } else {
      const { mediaPath, typeMedia } = data;

      const messageMedia = new InMemoryMessageMedia({
        mediaPath,
        type: typeMedia,
        messageId: message.id,
      });

      this.mediaMessages.push(messageMedia);

      messageContent = messageMedia;
    }

    return {
      message,
      messageContent,
      messageUserStatus: messagesUsersStatus,
      roomMessage,
    };
  }

  async getByRoomId({
    roomId,
    dateLimit,
  }: IGetMessageByRoomIdDTO): Promise<IMessageResponse[]> {
    const roomMessages = this.roomsMessages.filter(
      roomMessage => roomMessage.roomId === roomId
    );

    let messages = roomMessages.map(
      (roomMessage): IMessageResponse => {
        const message = this.messages.find(
          message => message.id === roomMessage.messageId
        );

        const messageUserStatus = this.messagesUserStatus.filter(
          status => status.messageId === message.id
        );

        let messageContent: InMemoryMessageText | InMemoryMessageMedia;

        if (message.type === 'text') {
          messageContent = this.textMessages.find(
            textMessage => textMessage.messageId === message.id
          );
        } else {
          messageContent = this.mediaMessages.find(
            mediaMessage => mediaMessage.messageId === message.id
          );
        }

        return {
          message,
          messageContent,
          messageUserStatus,
          roomMessage,
        };
      }
    );

    if (dateLimit) {
      messages = messages.filter(
        message =>
          message.message.createdAt < dateLimit.end &&
          message.message.createdAt > dateLimit.start
      );
    }
    messages = messages.sort((message1, message2) => {
      if (message1.message.createdAt < message2.message.createdAt) return -1;
      if (message1.message.createdAt > message2.message.createdAt) return 1;
      return 0;
    });

    return messages;
  }

  async getLastByRoomId(
    roomId: string
  ): Promise<IMessageResponse<IMessageText | IMessageMedia>> {
    const roomMessages = this.roomsMessages.filter(
      roomMessage => roomMessage.roomId === roomId
    );

    const messages = roomMessages
      .map(
        (roomMessage): IMessageResponse => {
          const message = this.messages.find(
            message => message.id === roomMessage.messageId
          );

          const messageUserStatus = this.messagesUserStatus.filter(
            status => status.messageId === message.id
          );

          let messageContent: InMemoryMessageText | InMemoryMessageMedia;

          if (message.type === 'text') {
            messageContent = this.textMessages.find(
              textMessage => textMessage.messageId === message.id
            );
          } else {
            messageContent = this.mediaMessages.find(
              mediaMessage => mediaMessage.messageId === message.id
            );
          }

          return {
            message,
            messageContent,
            messageUserStatus,
            roomMessage,
          };
        }
      )
      .sort((message1, message2) => {
        if (message1.message.createdAt < message2.message.createdAt) return -1;
        if (message1.message.createdAt > message2.message.createdAt) return 1;
        return 0;
      });

    return messages[messages.length - 1];
  }

  async findByMediaPath(
    mediaPath: string
  ): Promise<IMessageResponse<IMessageMedia>> {
    const messageMedia = this.mediaMessages.find(
      mediaMessage => mediaMessage.mediaPath === mediaPath
    );

    if (!messageMedia) {
      return undefined;
    }

    const message = this.messages.find(
      message => message.id === messageMedia.messageId
    );

    const roomMessage = this.roomsMessages.find(
      roomMessage => roomMessage.messageId === message.id
    );

    const messageUserStatus = this.messagesUserStatus.filter(
      status => status.messageId === message.id
    );

    return {
      message: {
        ...message,
        type: IMessageTypeEnum.MEDIA,
      },
      messageContent: messageMedia,
      roomMessage,
      messageUserStatus,
    };
  }

  async findById(id: string): Promise<IMessageResponse> {
    const message = this.messages.find(message => message.id === id);

    let messageContent: InMemoryMessageText | InMemoryMessageMedia;

    if (message.type === 'text') {
      messageContent = this.textMessages.find(
        textMessage => textMessage.messageId === message.id
      );
    } else {
      messageContent = this.mediaMessages.find(
        mediaMessage => mediaMessage.messageId === message.id
      );
    }

    const roomMessage = this.roomsMessages.find(
      roomMessage => roomMessage.messageId === message.id
    );

    const messageUserStatus = this.messagesUserStatus.filter(
      status => status.messageId === message.id
    );

    return {
      message,
      messageContent,
      roomMessage,
      messageUserStatus,
    };
  }

  async changeMessageUserStatus({
    userId,
    messageId,
    status,
  }: IChangeMessageUserStatusDTO): Promise<void> {
    const messageUserStatus = this.messagesUserStatus.find(
      status => status.messageId === messageId && status.userId === userId
    );

    messageUserStatus.status = status;
  }
}
