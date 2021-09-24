import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { TypingMessageError } from './TypingMessageError';
import { TypingMessageUseCase } from './TypingMessageUseCase';

let usersRepository: IUsersRepository;
let roomsRepository: IRoomsRepository;
let roomsUsersRepository: IRoomsUsersRepository;

let typingMessageUseCase: TypingMessageUseCase;

describe('Create Room User Use Case', () => {
  beforeEach(() => {
    usersRepository = container.resolve('UsersRepository');
    roomsRepository = container.resolve('RoomsRepository');
    roomsUsersRepository = container.resolve('RoomsUsersRepository');
    typingMessageUseCase = container.resolve(TypingMessageUseCase);
  });

  it('Should be able to enter a new message', async () => {
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

    const typingMessage = await typingMessageUseCase.execute({
      roomId: room.id,
      userId: user.id,
    });

    expect(typingMessage).toEqual(
      expect.objectContaining({
        id: user.id,
      })
    );
  });

  it('Should be able to enter a new message if user does not exist', async () => {
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

    await expect(
      typingMessageUseCase.execute({
        roomId: room.id,
        userId: 'nonexistent user',
      })
    ).rejects.toEqual(new TypingMessageError.UserDoesNotExist());
  });

  it('Should be able to enter a new message if room does not exist', async () => {
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

    await expect(
      typingMessageUseCase.execute({
        roomId: 'nonexistent room',
        userId: user.id,
      })
    ).rejects.toEqual(new TypingMessageError.RoomDoesNotExist());
  });

  it('Should be able to enter a new message if user is not in room', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    await expect(
      typingMessageUseCase.execute({
        roomId: room.id,
        userId: user.id,
      })
    ).rejects.toEqual(new TypingMessageError.UserNotInRoom());
  });
});
