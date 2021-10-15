import { inject, injectable } from 'tsyringe';

import { IMessage, IMessageTypeEnum } from '@modules/chat/entities/IMessage';
import {
  IMessageMedia,
  IMessageMediaTypeEnum,
} from '@modules/chat/entities/IMessageMedia';
import { IMessageText } from '@modules/chat/entities/IMessageText';
import { IMessageMap, MessageMap } from '@modules/chat/mappers/MessageMap';
import {
  IMessageResponse,
  IMessagesRepository,
} from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateMessageError } from './CreateMessageError';

type MessageText = {
  typeMessage: IMessageTypeEnum.TEXT;
  content: string;
};

type MessageMedia = {
  typeMessage: IMessageTypeEnum.MEDIA;
  mediaPath: string;
  typeMedia: IMessageMediaTypeEnum;
};

type IRequest = {
  creatorUserId: string;
  roomId: string;
} & (MessageText | MessageMedia);
@injectable()
export class CreateMessageUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository
  ) {}

  async execute(data: IRequest): Promise<IMessageMap> {
    const { roomId, creatorUserId } = data;

    const user = await this.usersRepository.findById(creatorUserId);

    if (!user) {
      throw new CreateMessageError.UserDoesNotExist();
    }

    const room = await this.roomsRepository.findById(roomId);

    if (!room) {
      throw new CreateMessageError.RoomDoesNotExist();
    }

    const userInRoom = !!(await this.roomsUsersRepository.findByRoomAndUser({
      roomId,
      userId: creatorUserId,
    }));

    if (!userInRoom) {
      throw new CreateMessageError.UserNotInRoom();
    }

    const forUsersIds = (
      await this.roomsUsersRepository.getByRoomId(roomId)
    ).map(roomUser => roomUser.userId);

    let message: IMessageResponse<IMessageText | IMessageMedia>;
    const messageData = {
      creatorUserId,
      roomId,
      forUsers: forUsersIds,
    };

    if (data.typeMessage === 'text') {
      const { content } = data;

      message = await this.messagesRepository.create({
        ...messageData,
        typeMessage: IMessageTypeEnum.TEXT,
        content,
      });
    } else {
      const { mediaPath, typeMedia } = data;

      message = await this.messagesRepository.create({
        ...messageData,
        typeMessage: IMessageTypeEnum.MEDIA,
        mediaPath,
        typeMedia,
      });
    }

    const userMap = UserMap.mapForPublic(user);

    return MessageMap.map(message, userMap);
  }
}
