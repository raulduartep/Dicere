import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { ICreateVerificationUserDTO } from '@modules/users/dtos/ICreateVerificationUserDTO';

import { TypeORMUsersRepository } from './TypeORMUsersRepository';
import { TypeORMVerificationUsersRepository } from './TypeORMVerificationUsersRepository';

let connection: Connection;
let verificationUsersRepository: TypeORMVerificationUsersRepository;
let usersRepository: TypeORMUsersRepository;

describe('TypeORM Verification Users Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    verificationUsersRepository = new TypeORMVerificationUsersRepository();

    usersRepository = new TypeORMUsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new verification user and return him', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const verificationUser: ICreateVerificationUserDTO = {
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
    };

    const createdVerificationUser = await verificationUsersRepository.create(
      verificationUser
    );

    expect(createdVerificationUser).toBeTruthy();
    expect(createdVerificationUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        token: verificationUser.token,
        userId: verificationUser.userId,
        expiresIn: verificationUser.expiresIn,
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should be able to get a verification user by user id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const verificationUser = await verificationUsersRepository.create({
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
    });

    const getVerificationUser = await verificationUsersRepository.findByUserId(
      user.id
    );

    expect(getVerificationUser).toBeTruthy();
    expect(getVerificationUser).toEqual(verificationUser);
  });

  it('Should be able to get a verification user by id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const verificationUser = await verificationUsersRepository.create({
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
    });

    const getVerificationUser = await verificationUsersRepository.findById(
      verificationUser.id
    );

    expect(getVerificationUser).toBeTruthy();
    expect(getVerificationUser).toEqual(verificationUser);
  });
});
