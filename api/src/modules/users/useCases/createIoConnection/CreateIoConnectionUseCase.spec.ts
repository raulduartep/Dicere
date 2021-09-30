import '@shared/container/test';

import faker from 'faker';
import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateIoConnectionError } from './CreateIoConnectionError';
import { CreateIoConnectionUseCase } from './CreateIoConnectionUseCase';

let usersRepository: IUsersRepository;
let createIoConnectionsUseCase: CreateIoConnectionUseCase;

describe('Create IoConnection Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    createIoConnectionsUseCase = container.resolve(CreateIoConnectionUseCase);
  });

  it('Should be able to create a new io connection and return him', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const ioConnection = {
      socketId: faker.datatype.uuid(),
      userId: user.id,
    };

    const createdIoConnection = await createIoConnectionsUseCase.execute(
      ioConnection
    );

    expect(createdIoConnection).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        socketId: ioConnection.socketId,
        userId: user.id,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it('Should not be able to create a new io connection if user not exists', async () => {
    const ioConnection = {
      socketId: faker.datatype.uuid(),
      userId: 'nonexistent user',
    };

    await expect(
      createIoConnectionsUseCase.execute(ioConnection)
    ).rejects.toEqual(new CreateIoConnectionError.UserDoesNotExists());
  });

  it('Should be able to update the io connection if it already exists to user', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const ioConnection = {
      socketId: faker.datatype.uuid(),
      userId: user.id,
    };

    const createdIoConnection = await createIoConnectionsUseCase.execute(
      ioConnection
    );

    const newIoConnection = {
      socketId: faker.datatype.uuid(),
      userId: user.id,
    };

    const createdNewIoConnection = await createIoConnectionsUseCase.execute(
      newIoConnection
    );

    expect(createdIoConnection.id).toEqual(createdNewIoConnection.id);
    expect(createdNewIoConnection).toEqual(
      expect.objectContaining({
        socketId: newIoConnection.socketId,
      })
    );
  });
});
