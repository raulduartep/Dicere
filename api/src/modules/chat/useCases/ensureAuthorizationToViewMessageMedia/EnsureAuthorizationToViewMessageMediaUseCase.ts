import { inject, injectable } from 'tsyringe';

import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { EnsureAuthorizationToViewMessageMediaError } from './EnsureAuthorizationToViewMessageMediaError';

type IRequest = {
  mediaPath: string;
  userId: string;
};

@injectable()
export class EnsureAuthorizationToViewMessageMediaUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository
  ) {}

  async execute({ userId, mediaPath }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new EnsureAuthorizationToViewMessageMediaError.UserDoesNotExist();
    }

    const messagesStats = await this.messagesRepository.findByMediaPath(
      mediaPath
    );

    if (!messagesStats) {
      throw new EnsureAuthorizationToViewMessageMediaError.MediaDoesNotExist();
    }

    const { roomMessage } = messagesStats;

    const usersInRoom = await this.roomsUsersRepository.getByRoomId(
      roomMessage.roomId
    );

    const userIsAuthorized = usersInRoom.find(
      roomUser => roomUser.userId === userId
    );

    if (!userIsAuthorized) {
      throw new EnsureAuthorizationToViewMessageMediaError.UserNotAuthorized();
    }

    return true;
  }
}
