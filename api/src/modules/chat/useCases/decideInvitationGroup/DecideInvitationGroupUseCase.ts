import { inject, injectable } from 'tsyringe';

import { IEnumDecisionInvitationGroup } from '@modules/chat/entities/IInvitationGroup';
import { IMessageMap, MessageMap } from '@modules/chat/mappers/MessageMap';
import { RoomMap, IRoomMap } from '@modules/chat/mappers/RoomMap';
import { IGroupsRepository } from '@modules/chat/repositories/IGroupsRepository';
import { IInvitationsGroupsRepository } from '@modules/chat/repositories/IInvitationsGroupsRepository';
import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IIoConnection } from '@modules/users/entities/IIoConnection';
import { UserMap } from '@modules/users/mappers/UserMap';
import { IIoConnectionsRepository } from '@modules/users/repositories/IIoConnectionsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { DecideInvitationGroupError } from './DecideInvitationGroupError';

type IRequest = {
  invitationId: string;
  userId: string;
  decision: IEnumDecisionInvitationGroup;
};

type IResponse = {
  friendConnection: IIoConnection;
  room: {
    room: IRoomMap;
    lastMessage: IMessageMap;
  };
};

@injectable()
export class DecideInvitationGroupUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('InvitationsGroupsRepository')
    private invitationsGroupsRepository: IInvitationsGroupsRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('IoConnectionsRepository')
    private connectionsRepository: IIoConnectionsRepository
  ) {}

  async execute({
    invitationId,
    userId,
    decision,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new DecideInvitationGroupError.UserDoesNotExist();
    }

    const invitationGroup = await this.invitationsGroupsRepository.findById(
      invitationId
    );

    if (!invitationGroup) {
      throw new DecideInvitationGroupError.InvitationGroupDoesNotExist();
    }

    if (invitationGroup.friendId !== userId) {
      throw new DecideInvitationGroupError.UserNotAllowedToDecide();
    }

    if (invitationGroup.decision) {
      throw new DecideInvitationGroupError.InvitationGroupAlreadyDecided();
    }

    const group = await this.groupsRepository.findById(invitationGroup.groupId);

    const userAlreadyInsideGroup = !!(await this.roomsUsersRepository.findByRoomAndUser(
      {
        roomId: group.roomId,
        userId,
      }
    ));

    if (userAlreadyInsideGroup) {
      throw new DecideInvitationGroupError.UserAlreadyInsideGroup();
    }

    await this.invitationsGroupsRepository.decided({
      id: invitationId,
      decision,
    });

    const friendConnection = await this.connectionsRepository.findByUserId(
      invitationGroup.userId
    );

    if (decision === IEnumDecisionInvitationGroup.ACCEPTED) {
      await this.roomsUsersRepository.create({
        roomId: group.roomId,
        userId: user.id,
      });

      const room = await this.roomsRepository.findById(group.roomId);

      const lastMessage = await this.messagesRepository.getLastByRoomId(
        room.id
      );
      let lastMessageMap: IMessageMap;

      if (lastMessageMap) {
        const lastMessageUser = await this.usersRepository.findById(
          lastMessage.message.userId
        );
        const lastMessageUserMap = UserMap.mapForPublic(lastMessageUser);

        lastMessageMap = MessageMap.map(lastMessage, lastMessageUserMap);
      }

      return {
        friendConnection,
        room: {
          room: RoomMap.mapGroup(room, group),
          lastMessage: lastMessageMap,
        },
      };
    }

    return {
      friendConnection,
      room: undefined,
    };
  }
}
