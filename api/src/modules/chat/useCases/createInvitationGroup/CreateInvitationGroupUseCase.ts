import { inject, injectable } from 'tsyringe';

import { IInvitationGroup } from '@modules/chat/entities/IInvitationGroup';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { IGroupsRepository } from '@modules/chat/repositories/IGroupsRepository';
import { IInvitationsGroupsRepository } from '@modules/chat/repositories/IInvitationsGroupsRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IIoConnection } from '@modules/users/entities/IIoConnection';
import {
  IUserMap,
  IUserMapForPublic,
  UserMap,
} from '@modules/users/mappers/UserMap';
import { IIoConnectionsRepository } from '@modules/users/repositories/IIoConnectionsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateInvitationGroupError } from './CreateInvitationGroupError';

type IRequest = {
  userId: string;
  friendId: string;
  roomId: string;
};

type IResponse = {
  invitationGroup: IInvitationGroup;
  friendConnection: IIoConnection;
  user: IUserMapForPublic;
  groupName: string;
};

@injectable()
export class CreateInvitationGroupUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('InvitationsGroupsRepository')
    private invitationsGroupsRepository: IInvitationsGroupsRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('IoConnectionsRepository')
    private ioConnectionsRepository: IIoConnectionsRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository
  ) {}

  async execute({ friendId, roomId, userId }: IRequest): Promise<IResponse> {
    if (userId === friendId) {
      throw new CreateInvitationGroupError.UserSameFriend();
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new CreateInvitationGroupError.UserDoesNotExist();
    }

    const room = await this.roomsRepository.findById(roomId);

    if (room.typeConversation !== IRoomTypeEnum.GROUP) {
      throw new CreateInvitationGroupError.RoomIsNotGroup();
    }

    const group = await this.groupsRepository.findByRoomId(roomId);

    if (!group) {
      throw new CreateInvitationGroupError.GroupDoesNotExist();
    }

    const userIsInsideTheGroup = !!(await this.roomsUsersRepository.findByRoomAndUser(
      {
        roomId,
        userId,
      }
    ));

    if (!userIsInsideTheGroup) {
      throw new CreateInvitationGroupError.UserNotAllowed();
    }

    const friendExist = !!(await this.usersRepository.findById(friendId));

    if (!friendExist) {
      throw new CreateInvitationGroupError.FriendDoesNotExist();
    }

    const friendAlreadyInGroupExist = !!(await this.roomsUsersRepository.findByRoomAndUser(
      {
        userId: friendId,
        roomId,
      }
    ));

    if (friendAlreadyInGroupExist) {
      throw new CreateInvitationGroupError.FriendIsAlreadyInsideGroup();
    }

    const invitationUndecidedAlreadyExist = await this.invitationsGroupsRepository.findUndecided(
      {
        friendId,
        groupId: group.id,
        userId,
      }
    );

    if (invitationUndecidedAlreadyExist) {
      throw new CreateInvitationGroupError.AlreadyExistUndecided();
    }

    const invitationGroup = await this.invitationsGroupsRepository.create({
      friendId,
      groupId: group.id,
      userId,
    });

    const friendConnection = await this.ioConnectionsRepository.findByUserId(
      friendId
    );

    return {
      invitationGroup,
      friendConnection,
      user: UserMap.mapForPublic(user),
      groupName: group.name,
    };
  }
}
