import { getManager, getRepository, Repository } from 'typeorm';

import { IChangeMessageUserStatusDTO } from '@modules/chat/dtos/IChangeMessageUserStatusDTO';
import {
  ICreateMessageMediaDTO,
  ICreateMessageTextDTO,
} from '@modules/chat/dtos/ICreateMessageDTO';
import { IGetMessageByRoomIdDTO } from '@modules/chat/dtos/IGetMessageByRoomIdDTO';
import { IMessageMedia } from '@modules/chat/entities/IMessageMedia';
import { IMessageText } from '@modules/chat/entities/IMessageText';
import { IMessageStatusEnum } from '@modules/chat/entities/IMessageUserStatus';
import { TypeORMMessage } from '@modules/chat/entities/implementations/typeorm/TypeORMMessage';
import { TypeORMMessageMedia } from '@modules/chat/entities/implementations/typeorm/TypeORMMessageMedia';
import { TypeORMMessageText } from '@modules/chat/entities/implementations/typeorm/TypeORMMessageText';
import { TypeORMMessageUserStatus } from '@modules/chat/entities/implementations/typeorm/TypeORMMessageUserStatus';
import { TypeORMRoomMessage } from '@modules/chat/entities/implementations/typeorm/TypeORMRoomMessage';

import {
  IMessagesRepository,
  IMessageResponse,
} from '../../IMessagesRepository';

export class TypeORMMessagesRepository implements IMessagesRepository {
  private readonly messagesRepository: Repository<TypeORMMessage>;
  private readonly messagesTextRepository: Repository<TypeORMMessageText>;
  private readonly messagesMediaRepository: Repository<TypeORMMessageMedia>;
  private readonly roomsMessagesRepository: Repository<TypeORMRoomMessage>;
  private readonly messagesUsersStatusRepository: Repository<TypeORMMessageUserStatus>;

  constructor() {
    this.messagesRepository = getRepository(TypeORMMessage);
    this.messagesTextRepository = getRepository(TypeORMMessageText);
    this.messagesMediaRepository = getRepository(TypeORMMessageMedia);
    this.roomsMessagesRepository = getRepository(TypeORMRoomMessage);
    this.messagesUsersStatusRepository = getRepository(
      TypeORMMessageUserStatus
    );
  }
  create(
    data: ICreateMessageMediaDTO
  ): Promise<IMessageResponse<IMessageMedia>>;
  create(data: ICreateMessageTextDTO): Promise<IMessageResponse<IMessageText>>;
  async create(
    data: ICreateMessageMediaDTO | ICreateMessageTextDTO
  ): Promise<IMessageResponse> {
    const createdMessage = await getManager().transaction(
      async (entityManager): Promise<IMessageResponse> => {
        const { creatorUserId, roomId, typeMessage, forUsers } = data;

        const messagesRepository = entityManager.getRepository(TypeORMMessage);
        const messagesTextRepository = entityManager.getRepository(
          TypeORMMessageText
        );
        const messagesMediaRepository = entityManager.getRepository(
          TypeORMMessageMedia
        );
        const roomsMessageRepository = entityManager.getRepository(
          TypeORMRoomMessage
        );
        const messagesUsersStatusRepository = entityManager.getRepository(
          TypeORMMessageUserStatus
        );

        const message = messagesRepository.create({
          userId: creatorUserId,
          type: typeMessage,
        });

        await messagesRepository.save(message);

        const roomMessage = roomsMessageRepository.create({
          roomId,
          messageId: message.id,
        });
        await roomsMessageRepository.save(roomMessage);

        const messagesUsersStatus = await Promise.all(
          forUsers.map(async userId => {
            const messageUserStatus = messagesUsersStatusRepository.create({
              messageId: message.id,
              userId,
              status:
                userId === creatorUserId
                  ? IMessageStatusEnum.VIEWED
                  : IMessageStatusEnum.NOT_RECEIVED,
            });

            await messagesUsersStatusRepository.save(messageUserStatus);

            return messageUserStatus;
          })
        );

        let messageContent: TypeORMMessageText | TypeORMMessageMedia;

        if (data.typeMessage === 'text') {
          const { content } = data;

          messageContent = messagesTextRepository.create({
            content,
            messageId: message.id,
          });

          await messagesTextRepository.save(messageContent);
        } else {
          const { mediaPath, typeMedia } = data;

          messageContent = messagesMediaRepository.create({
            mediaPath,
            messageId: message.id,
            type: typeMedia,
          });

          await messagesMediaRepository.save(messageContent);
        }

        return {
          message,
          messageContent,
          roomMessage,
          messageUserStatus: messagesUsersStatus,
        };
      }
    );

    return createdMessage;
  }

  async getByRoomId({
    page,
    roomId,
  }: IGetMessageByRoomIdDTO): Promise<IMessageResponse[]> {
    const messages = await this.messagesRepository
      .createQueryBuilder('messages')
      .innerJoinAndSelect(
        'rooms_messages',
        'roomsMessages',
        'roomsMessages.message_id = messages.id'
      )
      .where('roomsMessages.room_id = :roomId', { roomId })
      .orderBy('messages.created_at', 'DESC')
      .limit(20)
      .offset((page - 1) * 20)
      .getMany();

    const completeMessages = await Promise.all(
      messages.map(
        async (
          message
        ): Promise<IMessageResponse<IMessageText | IMessageMedia>> => {
          let messageContent: TypeORMMessageText | TypeORMMessageMedia;

          const roomMessage = await this.roomsMessagesRepository.findOne({
            messageId: message.id,
          });

          const messageUserStatus = await this.messagesUsersStatusRepository.find(
            {
              where: {
                messageId: message.id,
              },
            }
          );

          if (message.type === 'text') {
            messageContent = await this.messagesTextRepository.findOne({
              messageId: message.id,
            });
          } else {
            messageContent = await this.messagesMediaRepository.findOne({
              messageId: message.id,
            });
          }

          return {
            message,
            messageContent,
            messageUserStatus,
            roomMessage,
          };
        }
      )
    );

    return completeMessages;
  }

  async getLastByRoomId(
    roomId: string
  ): Promise<IMessageResponse<IMessageText | IMessageMedia>> {
    const message = await this.messagesRepository
      .createQueryBuilder('messages')
      .innerJoinAndSelect(
        TypeORMRoomMessage,
        'roomsMessages',
        'roomsMessages.message_id = messages.id'
      )
      .where('roomsMessages.room_id = :roomId', { roomId })
      .orderBy('messages.created_at', 'DESC')
      .limit(1)
      .getOne();

    if (!message) {
      return undefined;
    }

    let messageContent: TypeORMMessageText | TypeORMMessageMedia;

    const roomMessage = await this.roomsMessagesRepository.findOne({
      messageId: message.id,
    });

    const messageUserStatus = await this.messagesUsersStatusRepository.find({
      where: {
        messageId: message.id,
      },
    });

    if (message.type === 'text') {
      messageContent = await this.messagesTextRepository.findOne({
        messageId: message.id,
      });
    } else {
      messageContent = await this.messagesMediaRepository.findOne({
        messageId: message.id,
      });
    }

    return {
      message,
      messageContent,
      messageUserStatus,
      roomMessage,
    };
  }

  async findByMediaPath(
    mediaPath: string
  ): Promise<IMessageResponse<IMessageMedia>> {
    const mediaMessage = await this.messagesMediaRepository.findOne({
      mediaPath,
    });

    const message = await this.messagesRepository.findOne(
      mediaMessage.messageId
    );

    const roomMessage = await this.roomsMessagesRepository.findOne({
      where: {
        messageId: message.id,
      },
    });

    const messageUserStatus = await this.messagesUsersStatusRepository.find({
      where: {
        messageId: message.id,
      },
    });

    return {
      roomMessage,
      message,
      messageContent: mediaMessage,
      messageUserStatus,
    };
  }

  async findById(id: string): Promise<IMessageResponse> {
    const message = await this.messagesRepository.findOne(id);

    let messageContent: TypeORMMessageText | TypeORMMessageMedia;

    if (message.type === 'text') {
      messageContent = await this.messagesTextRepository.findOne({
        messageId: message.id,
      });
    } else {
      messageContent = await this.messagesMediaRepository.findOne({
        messageId: message.id,
      });
    }

    const roomMessage = await this.roomsMessagesRepository.findOne({
      where: { messageId: message.id },
    });

    const messageUserStatus = await this.messagesUsersStatusRepository.find({
      where: {
        messageId: message.id,
      },
    });

    return {
      message,
      messageContent,
      roomMessage,
      messageUserStatus,
    };
  }

  async changeMessageUserStatus({
    messageId,
    status,
    userId,
  }: IChangeMessageUserStatusDTO): Promise<void> {
    await this.messagesUsersStatusRepository.update(
      { messageId, userId },
      { status }
    );
  }
}
