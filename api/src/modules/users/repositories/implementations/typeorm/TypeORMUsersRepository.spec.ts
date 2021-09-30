import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import { TypeORMUsersRepository } from './TypeORMUsersRepository';

let connection: Connection;
let usersRepository: TypeORMUsersRepository;

describe('TypeORM Users Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    usersRepository = new TypeORMUsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new user and return him', async () => {
    const user: ICreateUserDTO = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    };

    const createdUser = await usersRepository.create(user);

    expect(createdUser).toBeTruthy();
    expect(createdUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: user.name,
        password: user.password,
        email: user.email,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it('Should be able to create a new user with the property value deleted as false ', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    });
    expect(user).toBeTruthy();
    expect(user.deleted).toBeFalsy();
  });

  it('Should be able to get a user by email', async () => {
    const user: ICreateUserDTO = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    };

    const createdUser = await usersRepository.create(user);

    const getUser = await usersRepository.findByEmail(user.email);

    expect(getUser).toBeTruthy();
    expect(getUser).toEqual(createdUser);
  });

  it('Should be able to get a user by username', async () => {
    const user: ICreateUserDTO = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    };

    const createdUser = await usersRepository.create(user);

    const getUser = await usersRepository.findByUsername(user.username);

    expect(getUser).toBeTruthy();
    expect(getUser).toEqual(createdUser);
  });

  it('Should be able to get a user by id', async () => {
    const user: ICreateUserDTO = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    };

    const createdUser = await usersRepository.create(user);

    const getUser = await usersRepository.findById(createdUser.id);

    expect(getUser).toBeTruthy();
    expect(getUser).toEqual(createdUser);
  });

  it('Should be able to get a user by ids', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    });

    const user2 = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    });

    const getUsers = await usersRepository.findByIds([user.id, user2.id]);

    expect(getUsers).toEqual(expect.arrayContaining([user, user2]));
  });

  it('Should be able to reset user password', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    });

    const newPassword = faker.internet.password();

    await usersRepository.resetPassword({
      id: user.id,
      password: newPassword,
    });

    const getUser = await usersRepository.findById(user.id);

    expect(getUser.password).toEqual(newPassword);
  });
});
