import { inject, injectable } from 'tsyringe';

import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { EnsureAuthorizationToViewMediaError } from './EnsureAuthorizationToViewMediaError';

type IRequest = {
  mediaPath: string;
  userId: string;
};

@injectable()
export class EnsureAuthorizationToViewMediaUseCase {
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
      throw new EnsureAuthorizationToViewMediaError.UserDoesNotExist();
    }

    const messagesStats = await this.messagesRepository.findByMediaPath(
      mediaPath
    );

    if (!messagesStats) {
      throw new EnsureAuthorizationToViewMediaError.MediaDoesNotExist();
    }

    const { roomMessage } = messagesStats;

    const usersInRoom = await this.roomsUsersRepository.getByRoomId(
      roomMessage.roomId
    );

    const userIsAuthorized = usersInRoom.find(
      roomUser => roomUser.userId === userId
    );

    if (!userIsAuthorized) {
      throw new EnsureAuthorizationToViewMediaError.UserNotAuthorized();
    }

    return true;
  }
}
