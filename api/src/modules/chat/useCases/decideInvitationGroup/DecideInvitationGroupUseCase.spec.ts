import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IEnumDecisionInvitationGroup } from '@modules/chat/entities/IInvitationGroup';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { IGroupsRepository } from '@modules/chat/repositories/IGroupsRepository';
import { IInvitationsGroupsRepository } from '@modules/chat/repositories/IInvitationsGroupsRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { DecideInvitationGroupError } from './DecideInvitationGroupError';
import { DecideInvitationGroupUseCase } from './DecideInvitationGroupUseCase';

let usersRepository: IUsersRepository;
let groupsRepository: IGroupsRepository;
let roomsRepository: IRoomsRepository;
let roomsUsersRepository: IRoomsUsersRepository;
let invitationsGroupsRepository: IInvitationsGroupsRepository;

let decideInvitationGroupUseCase: DecideInvitationGroupUseCase;

describe('DecideInvitationGroupUseCase', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    groupsRepository = container.resolve('GroupsRepository');
    roomsRepository = container.resolve('RoomsRepository');
    roomsUsersRepository = container.resolve('RoomsUsersRepository');
    invitationsGroupsRepository = container.resolve(
      'InvitationsGroupsRepository'
    );
    decideInvitationGroupUseCase = container.resolve(
      DecideInvitationGroupUseCase
    );
  });

  it('Should be able to decide a invitation group', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group = await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const invitationGroup = await invitationsGroupsRepository.create({
      friendId: friend.id,
      groupId: group.id,
      userId: user.id,
    });

    const decideInvitation = await decideInvitationGroupUseCase.execute({
      decision: IEnumDecisionInvitationGroup.ACCEPTED,
      invitationId: invitationGroup.id,
      userId: friend.id,
    });

    expect(decideInvitation).toEqual(
      expect.objectContaining({
        friendConnection: undefined,
        room: {
          room: expect.objectContaining({
            id: room.id,
            name: group.name,
          }),
          lastMessages: [],
          usersIn: expect.arrayContaining([
            expect.objectContaining({ id: user.id }),
            expect.objectContaining({ id: friend.id }),
          ]),
        },
      })
    );
  });

  it('Should not be able to decide a invitation group if user does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group = await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const invitationGroup = await invitationsGroupsRepository.create({
      friendId: friend.id,
      groupId: group.id,
      userId: user.id,
    });

    await expect(
      decideInvitationGroupUseCase.execute({
        decision: IEnumDecisionInvitationGroup.ACCEPTED,
        invitationId: invitationGroup.id,
        userId: 'nonexistent user',
      })
    ).rejects.toEqual(new DecideInvitationGroupError.UserDoesNotExist());
  });

  it('Should not be able to decide a invitation group if invitation group does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    await expect(
      decideInvitationGroupUseCase.execute({
        decision: IEnumDecisionInvitationGroup.ACCEPTED,
        invitationId: 'nonexistent invitation',
        userId: friend.id,
      })
    ).rejects.toEqual(
      new DecideInvitationGroupError.InvitationGroupDoesNotExist()
    );
  });

  it('Should not be able to decide a invitation group if user is not invitation owner', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const anotherUser = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group = await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const invitationGroup = await invitationsGroupsRepository.create({
      friendId: friend.id,
      groupId: group.id,
      userId: user.id,
    });

    await expect(
      decideInvitationGroupUseCase.execute({
        decision: IEnumDecisionInvitationGroup.ACCEPTED,
        invitationId: invitationGroup.id,
        userId: anotherUser.id,
      })
    ).rejects.toEqual(new DecideInvitationGroupError.UserNotAllowedToDecide());
  });

  it('Should not be able to decide a invitation group if invitation already decided', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group = await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const invitationGroup = await invitationsGroupsRepository.create({
      friendId: friend.id,
      groupId: group.id,
      userId: user.id,
    });

    await decideInvitationGroupUseCase.execute({
      decision: IEnumDecisionInvitationGroup.ACCEPTED,
      invitationId: invitationGroup.id,
      userId: friend.id,
    });

    await expect(
      decideInvitationGroupUseCase.execute({
        decision: IEnumDecisionInvitationGroup.ACCEPTED,
        invitationId: invitationGroup.id,
        userId: friend.id,
      })
    ).rejects.toEqual(
      new DecideInvitationGroupError.InvitationGroupAlreadyDecided()
    );
  });

  it('Should not be able to decide a invitation group if user already inside the group', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const friend = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group = await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const invitationGroup = await invitationsGroupsRepository.create({
      friendId: friend.id,
      groupId: group.id,
      userId: user.id,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: friend.id,
    });

    await expect(
      decideInvitationGroupUseCase.execute({
        decision: IEnumDecisionInvitationGroup.ACCEPTED,
        invitationId: invitationGroup.id,
        userId: friend.id,
      })
    ).rejects.toEqual(new DecideInvitationGroupError.UserAlreadyInsideGroup());
  });
});
