import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateRoomUserError } from './CreateRoomUserError';
import { CreateRoomUserUseCase } from './CreateRoomUserUseCase';

let usersRepository: IUsersRepository;
let roomsRepository: IRoomsRepository;

let createRoomUserUseCase: CreateRoomUserUseCase;

describe('Create Room User Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    roomsRepository = container.resolve('RoomsRepository');
    createRoomUserUseCase = container.resolve(CreateRoomUserUseCase);
  });

  it('Should be able to create a new room user and return him', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const roomUser = await createRoomUserUseCase.execute({
      roomId: room.id,
      userId: user.id,
    });

    expect(roomUser).toEqual(
      expect.objectContaining({
        userId: user.id,
        roomId: room.id,
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should not be able to join a user to a group if user does not exist', async () => {
    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    await expect(
      createRoomUserUseCase.execute({
        roomId: room.id,
        userId: 'nonexistent user',
      })
    ).rejects.toEqual(new CreateRoomUserError.UserDoesNotExist());
  });

  it('Should not be able to join a user to a room if room does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    await expect(
      createRoomUserUseCase.execute({
        roomId: 'nonexistent group',
        userId: user.id,
      })
    ).rejects.toEqual(new CreateRoomUserError.RoomDoesNotExist());
  });

  it('Should not be able to join a user to a room if user is already in room', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    await createRoomUserUseCase.execute({
      roomId: room.id,
      userId: user.id,
    });

    await expect(
      createRoomUserUseCase.execute({
        roomId: room.id,
        userId: user.id,
      })
    ).rejects.toEqual(new CreateRoomUserError.UserAlreadyInRoom());
  });
});
