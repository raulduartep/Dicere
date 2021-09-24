import faker from 'faker';
import { Connection } from 'typeorm';

import { DayJsDateProvider } from '@shared/providers/DateProvider/implementations/DayJsDateProvider';

import createConnection from '@infra/typeorm';
import {
  ICreateMessageMediaDTO,
  ICreateMessageTextDTO,
} from '@modules/chat/dtos/ICreateMessageDTO';
import { IMessageTypeEnum } from '@modules/chat/entities/IMessage';
import { IMessageMediaTypeEnum } from '@modules/chat/entities/IMessageMedia';
import { IMessageStatusEnum } from '@modules/chat/entities/IMessageUserStatus';
import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { TypeORMUsersRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMUsersRepository';

import { IMessageResponse } from '../../IMessagesRepository';
import { TypeORMMessagesRepository } from './TypeORMMessagesRepository';
import { TypeORMRoomsRepository } from './TypeORMRoomsRepository';

let connection: Connection;
let messagesRepository: TypeORMMessagesRepository;
let usersRepository: TypeORMUsersRepository;
let roomsRepository: TypeORMRoomsRepository;
let dateProvider: DayJsDateProvider;

describe('TypeORM Messages Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    messagesRepository = new TypeORMMessagesRepository();
    dateProvider = new DayJsDateProvider();
    roomsRepository = new TypeORMRoomsRepository();
    usersRepository = new TypeORMUsersRepository();
  });

  afterAll(async () => {
    // await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new message text in room', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const message: ICreateMessageTextDTO = {
      roomId: room.id,
      content: faker.lorem.text(),
      typeMessage: IMessageTypeEnum.TEXT,
      creatorUserId: user.id,
      forUsers: [],
    };

    const createdMessage = await messagesRepository.create(message);

    expect(createdMessage).toEqual(
      expect.objectContaining({
        message: expect.objectContaining({
          id: expect.any(String),
          userId: message.creatorUserId,
          type: message.typeMessage,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        messageContent: expect.objectContaining({
          content: message.content,
          messageId: expect.any(String),
        }),
        messageUserStatus: [],
        roomMessage: expect.objectContaining({
          roomId: room.id,
          messageId: expect.any(String),
        }),
      })
    );
  });

  it('Should be able to create a new message media in room', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const message: ICreateMessageMediaDTO = {
      roomId: room.id,
      mediaPath: faker.lorem.text(),
      typeMedia: IMessageMediaTypeEnum.IMAGE,
      typeMessage: IMessageTypeEnum.MEDIA,
      creatorUserId: user.id,
      forUsers: [],
    };

    const createdMessage = await messagesRepository.create(message);

    expect(createdMessage).toEqual(
      expect.objectContaining({
        message: expect.objectContaining({
          id: expect.any(String),
          userId: message.creatorUserId,
          type: message.typeMessage,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        messageContent: expect.objectContaining({
          mediaPath: message.mediaPath,
          type: message.typeMedia,
          messageId: expect.any(String),
        }),
        messageUserStatus: [],
        roomMessage: expect.objectContaining({
          roomId: room.id,
          messageId: expect.any(String),
        }),
      })
    );
  });

  it('Should be able to get the last twenty messages by room id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const messages: IMessageResponse[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 30; i++) {
      // eslint-disable-next-line no-await-in-loop
      const message = await messagesRepository.create({
        content: faker.lorem.text(),
        creatorUserId: user.id,
        typeMessage: IMessageTypeEnum.TEXT,
        roomId: room.id,
        forUsers: [],
      });

      messages.push(message);
    }

    messages.reverse();

    const lastTwentyMessages = messages.filter((_message, index) => index < 20);

    const lastTwentyMessagesPage2 = messages.filter(
      (_message, index) => index >= 20
    );

    const getMessages = await messagesRepository.getByRoomId({
      roomId: room.id,
      page: 1,
    });

    const getMessagesPage2 = await messagesRepository.getByRoomId({
      roomId: room.id,
      page: 2,
    });

    expect(getMessages).toEqual(expect.arrayContaining(lastTwentyMessages));
    expect(getMessagesPage2).toEqual(
      expect.arrayContaining(lastTwentyMessagesPage2)
    );
  });

  it('Should be able to get the last message by room id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const message = await messagesRepository.create({
      content: faker.lorem.text(),
      creatorUserId: user.id,
      typeMessage: IMessageTypeEnum.TEXT,
      roomId: room.id,
      forUsers: [],
    });

    const message2 = await messagesRepository.create({
      content: faker.lorem.text(),
      creatorUserId: user.id,
      typeMessage: IMessageTypeEnum.TEXT,
      roomId: room.id,
      forUsers: [],
    });

    const message3 = await messagesRepository.create({
      content: faker.lorem.text(),
      creatorUserId: user.id,
      typeMessage: IMessageTypeEnum.TEXT,
      roomId: room.id,
      forUsers: [],
    });

    const getMessage = await messagesRepository.getLastByRoomId(room.id);

    expect(getMessage).toEqual(message3);
  });

  it('Should be able to find a media message by mediaPath', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const message = await messagesRepository.create({
      roomId: room.id,
      mediaPath: faker.lorem.text(),
      typeMedia: IMessageMediaTypeEnum.IMAGE,
      typeMessage: IMessageTypeEnum.MEDIA,
      creatorUserId: user.id,
      forUsers: [],
    });

    const messageMedia = await messagesRepository.findByMediaPath(
      message.messageContent.mediaPath
    );

    expect(messageMedia).toEqual(message);
  });

  it('Should be able to find a message by id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const message = await messagesRepository.create({
      roomId: room.id,
      mediaPath: faker.lorem.text(),
      typeMedia: IMessageMediaTypeEnum.IMAGE,
      typeMessage: IMessageTypeEnum.MEDIA,
      creatorUserId: user.id,
      forUsers: [],
    });

    const getMessage = await messagesRepository.findById(message.message.id);

    expect(getMessage).toEqual(message);
  });

  it('Should be able to change a message user status', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const user1 = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const room = await roomsRepository.create({
      typeConversation: IRoomTypeEnum.PRIVATE,
    });

    const message = await messagesRepository.create({
      roomId: room.id,
      mediaPath: faker.lorem.text(),
      typeMedia: IMessageMediaTypeEnum.IMAGE,
      typeMessage: IMessageTypeEnum.MEDIA,
      creatorUserId: user.id,
      forUsers: [user1.id],
    });

    await messagesRepository.changeMessageUserStatus({
      messageId: message.message.id,
      userId: user1.id,
      status: IMessageStatusEnum.RECEIVED,
    });

    const getMessage = await messagesRepository.findById(message.message.id);

    expect(getMessage).toEqual(
      expect.objectContaining({
        messageUserStatus: expect.arrayContaining([
          expect.objectContaining({
            messageId: message.message.id,
            userId: user1.id,
            status: IMessageStatusEnum.RECEIVED,
          }),
        ]),
      })
    );
  });
});
