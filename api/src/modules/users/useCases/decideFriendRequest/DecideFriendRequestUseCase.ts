import { inject, injectable } from 'tsyringe';

import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { IMessageMap } from '@modules/chat/mappers/MessageMap';
import { IRoomMap, RoomMap } from '@modules/chat/mappers/RoomMap';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IEnumDecisionFriendshipRequest } from '@modules/users/entities/IFriendshipRequest';
import { IIoConnection } from '@modules/users/entities/IIoConnection';
import { IUserMapForPublic, UserMap } from '@modules/users/mappers/UserMap';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IIoConnectionsRepository } from '@modules/users/repositories/IIoConnectionsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { DecidedFriendRequestError } from './DecideFriendRequestError';

type IRequest = {
  requestId: string;
  userId: string;
  decision: IEnumDecisionFriendshipRequest;
};

type IResponse = {
  user: IUserMapForPublic;
  friend: IUserMapForPublic;
  friendConnection: IIoConnection;
  room: {
    room: IRoomMap;
    lastMessages: IMessageMap[];
    usersIn: IUserMapForPublic[];
  };
};

@injectable()
export class DecideFriendRequestUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FriendshipsRepository')
    private friendshipsRepository: IFriendshipsRepository,

    @inject('IoConnectionsRepository')
    private ioConnectionsRepository: IIoConnectionsRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository
  ) {}

  async execute({ requestId, userId, decision }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new DecidedFriendRequestError.UserDoesNotExist();
    }

    const friendshipRequest = await this.friendshipsRepository.findRequestById(
      requestId
    );

    if (!friendshipRequest) {
      throw new DecidedFriendRequestError.UserFriendRequestDoesNotExist();
    }

    if (friendshipRequest.friendId !== userId) {
      throw new DecidedFriendRequestError.UserNotAllowedToDecide();
    }

    if (friendshipRequest.decision) {
      throw new DecidedFriendRequestError.UserFriendRequestAlreadyDecided();
    }

    await this.friendshipsRepository.decidedFriendRequest({
      decision,
      requestId,
    });

    const friendConnection = await this.ioConnectionsRepository.findByUserId(
      friendshipRequest.userId
    );

    if (decision === IEnumDecisionFriendshipRequest.ACCEPTED) {
      const friend = await this.usersRepository.findById(
        friendshipRequest.userId
      );

      const room = await this.roomsRepository.create({
        typeConversation: IRoomTypeEnum.PRIVATE,
      });

      await this.roomsUsersRepository.create({
        roomId: room.id,
        userId: user.id,
      });

      await this.roomsUsersRepository.create({
        roomId: room.id,
        userId: friend.id,
      });

      const userMap = UserMap.mapForPublic(user);
      const friendMap = UserMap.mapForPublic(friend);

      return {
        friendConnection,
        user: userMap,
        friend: friendMap,
        room: {
          room: RoomMap.mapPrivate(room, friend),
          lastMessages: [],
          usersIn: [userMap, friendMap],
        },
      };
    }

    return {
      friendConnection,
      user: undefined,
      friend: undefined,
      room: undefined,
    };
  }
}
