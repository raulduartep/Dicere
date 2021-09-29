import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IMessageTypeEnum } from '@modules/chat/entities/IMessage';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { MessageMap } from '@modules/chat/mappers/MessageMap';
import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetMessagesError } from './GetMessagesError';
import { GetMessagesUseCase } from './GetMessagesUseCase';

let usersRepository: IUsersRepository;
let roomsRepository: IRoomsRepository;
let messagesRepository: IMessagesRepository;
let roomsUsersRepository: IRoomsUsersRepository;

let getMoreMessageUseCase: GetMessagesUseCase;

describe('Get Messages Use Case', () => {
  beforeEach(() => {
    usersRepository = container.resolve('UsersRepository');
    roomsRepository = container.resolve('RoomsRepository');
    messagesRepository = container.resolve('MessagesRepository');
    roomsUsersRepository = container.resolve('RoomsUsersRepository');
    getMoreMessageUseCase = container.resolve(GetMessagesUseCase);
  });

  it('Should be able to get more room messages', async () => {
    const user = await usersRepository.create({
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

    const messages = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 20; index++) {
      // eslint-disable-next-line no-await-in-loop
      const message = await messagesRepository.create({
        typeMessage: IMessageTypeEnum.TEXT,
        content: faker.lorem.text(),
        roomId: room.id,
        creatorUserId: user.id,
        forUsers: [],
      });
    }

    const messagesGetted = await getMoreMessageUseCase.execute({
      userId: user.id,
      roomId: room.id,
      page: 1,
    });

    messages.pop();

    expect(messagesGetted).toEqual(expect.arrayContaining(messages));
  });

  it('Should not be able to get more room messages if user does not exist', async () => {
    const user = await usersRepository.create({
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

    await messagesRepository.create({
      typeMessage: IMessageTypeEnum.TEXT,
      content: faker.lorem.text(),
      roomId: room.id,
      creatorUserId: user.id,
      forUsers: [],
    });

    await expect(
      getMoreMessageUseCase.execute({
        userId: 'nonexistent user',
        roomId: room.id,
        page: 1,
      })
    ).rejects.toEqual(new GetMessagesError.UserDoesNotExist());
  });

  it('Should not be able to get more room messages if room does not exist', async () => {
    const user = await usersRepository.create({
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

    await messagesRepository.create({
      typeMessage: IMessageTypeEnum.TEXT,
      content: faker.lorem.text(),
      roomId: room.id,
      creatorUserId: user.id,
      forUsers: [],
    });

    await expect(
      getMoreMessageUseCase.execute({
        userId: user.id,
        roomId: 'unonexistent room',
        page: 1,
      })
    ).rejects.toEqual(new GetMessagesError.RoomDoesNotExist());
  });

  it('Should not be able to get more room messages if user is not in room', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    await messagesRepository.create({
      typeMessage: IMessageTypeEnum.TEXT,
      content: faker.lorem.text(),
      roomId: room.id,
      creatorUserId: user.id,
      forUsers: [],
    });

    await expect(
      getMoreMessageUseCase.execute({
        userId: user.id,
        roomId: room.id,
        page: 1,
      })
    ).rejects.toEqual(new GetMessagesError.UserIsNotInRoom());
  });
});
