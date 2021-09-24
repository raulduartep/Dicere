import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IMessageTypeEnum } from '@modules/chat/entities/IMessage';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { MessageMap } from '@modules/chat/mappers/MessageMap';
import { RoomMap } from '@modules/chat/mappers/RoomMap';
import { IGroupsRepository } from '@modules/chat/repositories/IGroupsRepository';
import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetUserRoomsError } from './GetUserRoomsError';
import { GetUserRoomsUseCase } from './GetUserRoomsUseCase';

let inMemoryUsersRepository: IUsersRepository;
let inMemoryRoomsRepository: IRoomsRepository;
let inMemoryGroupsRepository: IGroupsRepository;
let inMemoryMessagesRepository: IMessagesRepository;
let inMemoryRoomsUsersRepository: IRoomsUsersRepository;

let getUserRoomsUseCase: GetUserRoomsUseCase;

describe('Join Room Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = container.resolve('UsersRepository');
    inMemoryRoomsRepository = container.resolve('RoomsRepository');
    inMemoryGroupsRepository = container.resolve('GroupsRepository');
    inMemoryMessagesRepository = container.resolve('MessagesRepository');
    inMemoryRoomsUsersRepository = container.resolve('RoomsUsersRepository');

    getUserRoomsUseCase = container.resolve(GetUserRoomsUseCase);
  });

  it('Should be able to get all user rooms', async () => {
    const user = await inMemoryUsersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await inMemoryRoomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    const group = await inMemoryGroupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await inMemoryRoomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const message = await inMemoryMessagesRepository.create({
      creatorUserId: user.id,
      typeMessage: IMessageTypeEnum.TEXT,
      roomId: room.id,
      content: faker.lorem.text(),
      forUsers: [],
    });

    const message1 = await inMemoryMessagesRepository.create({
      creatorUserId: user.id,
      typeMessage: IMessageTypeEnum.TEXT,
      roomId: room.id,
      content: faker.lorem.text(),
      forUsers: [],
    });

    const message2 = await inMemoryMessagesRepository.create({
      creatorUserId: user.id,
      typeMessage: IMessageTypeEnum.TEXT,
      roomId: room.id,
      content: faker.lorem.text(),
      forUsers: [],
    });

    const getRooms = await getUserRoomsUseCase.execute({ userId: user.id });

    expect(getRooms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          room: RoomMap.mapGroup(room, group),
          lastMessage: MessageMap.map(message2),
        }),
      ])
    );
  });

  it('Should not be able to get all user rooms if user does not exist', async () => {
    const user = await inMemoryUsersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await inMemoryRoomsRepository.create({
      typeConversation: IRoomTypeEnum.GROUP,
    });

    await inMemoryGroupsRepository.create({
      name: faker.company.companyName(),
      roomId: room.id,
      adminId: user.id,
    });

    await inMemoryRoomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    await inMemoryMessagesRepository.create({
      creatorUserId: user.id,
      typeMessage: IMessageTypeEnum.TEXT,
      roomId: room.id,
      content: faker.lorem.text(),
      forUsers: [],
    });

    await expect(
      getUserRoomsUseCase.execute({
        userId: 'nonexistent user',
      })
    ).rejects.toEqual(new GetUserRoomsError.UserDoesNotExist());
  });
});
