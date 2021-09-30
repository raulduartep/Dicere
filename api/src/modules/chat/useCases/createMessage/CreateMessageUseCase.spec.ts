import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IMessageTypeEnum } from '@modules/chat/entities/IMessage';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateMessageError } from './CreateMessageError';
import { CreateMessageUseCase } from './CreateMessageUseCase';

let usersRepository: IUsersRepository;
let roomsRepository: IRoomsRepository;
let roomsUsersRepository: IRoomsUsersRepository;

let createMessageUseCase: CreateMessageUseCase;

describe('Create Message Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    roomsRepository = container.resolve('RoomsRepository');
    roomsUsersRepository = container.resolve('RoomsUsersRepository');

    createMessageUseCase = container.resolve(CreateMessageUseCase);
  });

  it('Should be able to create a new message', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    const message = {
      content: faker.lorem.text(),
      roomId: room.id,
      creatorUserId: user.id,
    };

    const createdMessage = await createMessageUseCase.execute({
      ...message,
      typeMessage: IMessageTypeEnum.TEXT,
    });

    expect(createdMessage).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        content: message.content,
        roomId: message.roomId,
        type: IMessageTypeEnum.TEXT,
        creatorUserId: message.creatorUserId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it('Should not be able to create a new message if user does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    expect(
      createMessageUseCase.execute({
        content: faker.lorem.text(),
        roomId: room.id,
        creatorUserId: 'nonexistent user',
        typeMessage: IMessageTypeEnum.TEXT,
      })
    ).rejects.toEqual(new CreateMessageError.UserDoesNotExist());
  });

  it('Should not be able to create a new message if room does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user.id,
    });

    expect(
      createMessageUseCase.execute({
        content: faker.lorem.text(),
        roomId: 'nonexistent room',
        creatorUserId: user.id,
        typeMessage: IMessageTypeEnum.TEXT,
      })
    ).rejects.toEqual(new CreateMessageError.RoomDoesNotExist());
  });

  it('Should not be able to create a new message if user not in room', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    expect(
      createMessageUseCase.execute({
        content: faker.lorem.text(),
        roomId: room.id,
        creatorUserId: user.id,
        typeMessage: IMessageTypeEnum.TEXT,
      })
    ).rejects.toEqual(new CreateMessageError.UserNotInRoom());
  });
});
