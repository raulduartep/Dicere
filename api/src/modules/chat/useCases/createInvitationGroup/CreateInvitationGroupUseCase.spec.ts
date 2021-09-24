import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { IGroupsRepository } from '@modules/chat/repositories/IGroupsRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateInvitationGroupError } from './CreateInvitationGroupError';
import { CreateInvitationGroupUseCase } from './CreateInvitationGroupUseCase';

let usersRepository: IUsersRepository;
let groupsRepository: IGroupsRepository;
let roomsRepository: IRoomsRepository;
let roomsUsersRepository: IRoomsUsersRepository;
let createInvitationGroupUseCase: CreateInvitationGroupUseCase;

describe('Create Friend Request Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    groupsRepository = container.resolve('GroupsRepository');
    roomsRepository = container.resolve('RoomsRepository');
    roomsUsersRepository = container.resolve('RoomsUsersRepository');

    createInvitationGroupUseCase = container.resolve(
      CreateInvitationGroupUseCase
    );
  });

  it('Should be able to create a new invitation group', async () => {
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

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const group = await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    const invitationGroup = await createInvitationGroupUseCase.execute({
      friendId: friend.id,
      roomId: room.id,
      userId: user.id,
    });

    expect(invitationGroup).toEqual(
      expect.objectContaining({
        friendConnection: undefined,
        invitationGroup: expect.objectContaining({
          id: expect.any(String),
          userId: user.id,
          friendId: friend.id,
          groupId: group.id,
          decision: null,
        }),
        user: expect.objectContaining({
          id: user.id,
        }),
        groupName: group.name,
      })
    );
  });

  it('Should not be able to create a new invitation group if user is same is the same as friend', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await expect(
      createInvitationGroupUseCase.execute({
        friendId: user.id,
        userId: user.id,
        roomId: room.id,
      })
    ).rejects.toEqual(new CreateInvitationGroupError.UserSameFriend());
  });

  it('Should not be able to create a new invitation group if user does not exist', async () => {
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

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await expect(
      createInvitationGroupUseCase.execute({
        friendId: friend.id,
        userId: 'nonexistent user',
        roomId: room.id,
      })
    ).rejects.toEqual(new CreateInvitationGroupError.UserDoesNotExist());
  });

  it('Should not be able to create a new invitation group if room is not a group', async () => {
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
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    await expect(
      createInvitationGroupUseCase.execute({
        friendId: friend.id,
        userId: user.id,
        roomId: room.id,
      })
    ).rejects.toEqual(new CreateInvitationGroupError.RoomIsNotGroup());
  });

  it('Should not be able to create a new invitation group if group does not exist', async () => {
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

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    await expect(
      createInvitationGroupUseCase.execute({
        friendId: friend.id,
        userId: user.id,
        roomId: room.id,
      })
    ).rejects.toEqual(new CreateInvitationGroupError.GroupDoesNotExist());
  });

  it('Should not be able to create a new invitation group if user not allowed to invite', async () => {
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

    await expect(
      createInvitationGroupUseCase.execute({
        friendId: friend.id,
        userId: user.id,
        roomId: room.id,
      })
    ).rejects.toEqual(new CreateInvitationGroupError.UserNotAllowed());
  });

  it('Should not be able to create a new invitation group if friend does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    await groupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await expect(
      createInvitationGroupUseCase.execute({
        friendId: 'nonexisten friend',
        userId: user.id,
        roomId: room.id,
      })
    ).rejects.toEqual(new CreateInvitationGroupError.FriendDoesNotExist());
  });

  it('Should not be able to create a new invitation group if friend is already inside the group', async () => {
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

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: friend.id,
    });

    await expect(
      createInvitationGroupUseCase.execute({
        friendId: friend.id,
        userId: user.id,
        roomId: room.id,
      })
    ).rejects.toEqual(
      new CreateInvitationGroupError.FriendIsAlreadyInsideGroup()
    );
  });

  it('Should not be able to create a new invitation group if already exist a undecided invitation from this user to the friend to the group', async () => {
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

    await createInvitationGroupUseCase.execute({
      friendId: friend.id,
      userId: user.id,
      roomId: room.id,
    });

    await expect(
      createInvitationGroupUseCase.execute({
        friendId: friend.id,
        userId: user.id,
        roomId: room.id,
      })
    ).rejects.toEqual(new CreateInvitationGroupError.AlreadyExistUndecided());
  });
});
