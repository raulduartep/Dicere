import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { ICreateUserRequestDTO } from '@modules/users/dtos/ICreateUserRequestDTO';

import { TypeORMUserRequestsRepository } from './TypeORMUserRequestsRepository';

let connection: Connection;
let userRequestsRepository: TypeORMUserRequestsRepository;

describe('TypeORM Users Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    userRequestsRepository = new TypeORMUserRequestsRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new user and return him', async () => {
    const userRequest: ICreateUserRequestDTO = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    };

    const createdUserRequest = await userRequestsRepository.create(userRequest);

    expect(createdUserRequest).toBeTruthy();
    expect(createdUserRequest).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: userRequest.name,
        password: userRequest.password,
        email: userRequest.email,
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should be able to get a user by id', async () => {
    const createdUserRequest = await userRequestsRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const getUserRequest = await userRequestsRepository.findById(
      createdUserRequest.id
    );

    expect(getUserRequest).toBeTruthy();
    expect(getUserRequest).toEqual(createdUserRequest);
  });
});
