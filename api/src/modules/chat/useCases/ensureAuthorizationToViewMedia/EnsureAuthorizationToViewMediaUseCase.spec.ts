import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IMessageTypeEnum } from '@modules/chat/entities/IMessage';
import { IMessageMediaTypeEnum } from '@modules/chat/entities/IMessageMedia';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { EnsureAuthorizationToViewMediaError } from './EnsureAuthorizationToViewMediaError';
import { EnsureAuthorizationToViewMediaUseCase } from './EnsureAuthorizationToViewMediaUseCase';

let usersRepository: IUsersRepository;
let roomsRepository: IRoomsRepository;
let roomsUsersRepository: IRoomsUsersRepository;
let messagesRepository: IMessagesRepository;

let ensureAuthorizationToViewMediaUseCase: EnsureAuthorizationToViewMediaUseCase;

describe('Ensure Authorization To View Media Use Case', () => {
  beforeEach(() => {
    usersRepository = container.resolve('UsersRepository');
    roomsRepository = container.resolve('RoomsRepository');
    messagesRepository = container.resolve('MessagesRepository');
    roomsUsersRepository = container.resolve('RoomsUsersRepository');
    ensureAuthorizationToViewMediaUseCase = container.resolve(
      EnsureAuthorizationToViewMediaUseCase
    );
  });

  it('Should be able to authorize a user to view a media', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const user2 = await usersRepository.create({
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

    await roomsUsersRepository.create({
      roomId: room.id,
      userId: user2.id,
    });

    const filePath = faker.datatype.uuid();

    await messagesRepository.create({
      typeMessage: IMessageTypeEnum.MEDIA,
      mediaPath: filePath,
      typeMedia: IMessageMediaTypeEnum.IMAGE,
      roomId: room.id,
      creatorUserId: user.id,
      forUsers: [],
    });

    const authorizedToViewMedia = await ensureAuthorizationToViewMediaUseCase.execute(
      {
        mediaPath: filePath,
        userId: user2.id,
      }
    );

    expect(authorizedToViewMedia).toBeTruthy();
  });

  it('Should not be able to authorize a user to view a media if user does not exist', async () => {
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

    const filePath = faker.datatype.uuid();

    await messagesRepository.create({
      typeMessage: IMessageTypeEnum.MEDIA,
      mediaPath: filePath,
      typeMedia: IMessageMediaTypeEnum.IMAGE,
      roomId: room.id,
      creatorUserId: user.id,
      forUsers: [],
    });

    await expect(
      ensureAuthorizationToViewMediaUseCase.execute({
        mediaPath: filePath,
        userId: 'nonexistent user',
      })
    ).rejects.toEqual(
      new EnsureAuthorizationToViewMediaError.UserDoesNotExist()
    );
  });

  it('Should not be able to authorize a user to view a media if media does not exist', async () => {
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

    const filePath = faker.datatype.uuid();

    await messagesRepository.create({
      typeMessage: IMessageTypeEnum.MEDIA,
      mediaPath: filePath,
      typeMedia: IMessageMediaTypeEnum.IMAGE,
      roomId: room.id,
      creatorUserId: user.id,
      forUsers: [],
    });

    await expect(
      ensureAuthorizationToViewMediaUseCase.execute({
        mediaPath: 'nonexistent media',
        userId: user.id,
      })
    ).rejects.toEqual(
      new EnsureAuthorizationToViewMediaError.MediaDoesNotExist()
    );
  });

  it('Should not be able to authorize a user to view a media if user is not in room', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const user2 = await usersRepository.create({
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

    const filePath = faker.datatype.uuid();

    await messagesRepository.create({
      typeMessage: IMessageTypeEnum.MEDIA,
      mediaPath: filePath,
      typeMedia: IMessageMediaTypeEnum.IMAGE,
      roomId: room.id,
      creatorUserId: user.id,
      forUsers: [],
    });

    await expect(
      ensureAuthorizationToViewMediaUseCase.execute({
        mediaPath: filePath,
        userId: user2.id,
      })
    ).rejects.toEqual(
      new EnsureAuthorizationToViewMediaError.UserNotAuthorized()
    );
  });
});
