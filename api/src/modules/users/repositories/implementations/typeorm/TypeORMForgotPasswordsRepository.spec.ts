import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { ICreateForgotPassword } from '@modules/users/dtos/ICreateForgotPassword';

import { TypeORMForgotPasswordsRepository } from './TypeORMForgotPasswordsRepository';
import { TypeORMUsersRepository } from './TypeORMUsersRepository';

let connection: Connection;
let forgotPasswordRepository: TypeORMForgotPasswordsRepository;
let usersRepository: TypeORMUsersRepository;

describe('TypeORM Forgot Password Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    forgotPasswordRepository = new TypeORMForgotPasswordsRepository();

    usersRepository = new TypeORMUsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new forgot password and return him', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const forgotPassword: ICreateForgotPassword = {
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
    };

    const createdForgotPassword = await forgotPasswordRepository.create(
      forgotPassword
    );

    expect(createdForgotPassword).toBeTruthy();
    expect(createdForgotPassword).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        token: forgotPassword.token,
        userId: forgotPassword.userId,
        expiresIn: forgotPassword.expiresIn,
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should be able to get a valid forgot password by user id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const forgotPassword = await forgotPasswordRepository.create({
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
    });

    const getForgotPassword = await forgotPasswordRepository.findValidByUserId(
      user.id
    );

    expect(getForgotPassword).toBeTruthy();
    expect(getForgotPassword).toEqual(forgotPassword);
  });

  it('Should be able to get a forgot password by id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const forgotPassword = await forgotPasswordRepository.create({
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
    });

    const getForgotPassword = await forgotPasswordRepository.findById(
      forgotPassword.id
    );

    expect(getForgotPassword).toBeTruthy();
    expect(getForgotPassword).toEqual(forgotPassword);
  });

  it('Should be able to invalidate a forgot password by id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const forgotPassword = await forgotPasswordRepository.create({
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
    });

    await forgotPasswordRepository.invalidate(forgotPassword.id);

    const getForgotPassword = await forgotPasswordRepository.findValidByUserId(
      user.id
    );

    expect(getForgotPassword).toBeUndefined();
  });
});
