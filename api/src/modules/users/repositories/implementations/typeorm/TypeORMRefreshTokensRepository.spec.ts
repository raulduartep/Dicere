import faker from 'faker';
import { Connection } from 'typeorm';

import createConnection from '@infra/typeorm';
import { ICreateRefreshTokenDTO } from '@modules/users/dtos/ICreateRefreshTokenDTO';

import { TypeORMRefreshTokensRepository } from './TypeORMRefreshTokensRepository';
import { TypeORMUsersRepository } from './TypeORMUsersRepository';

let connection: Connection;
let refreshTokensRepository: TypeORMRefreshTokensRepository;
let usersRepository: TypeORMUsersRepository;

describe('TypeORM RefreshTokens Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    refreshTokensRepository = new TypeORMRefreshTokensRepository();

    usersRepository = new TypeORMUsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new refresh token and return him', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    });

    const refreshToken: ICreateRefreshTokenDTO = {
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
      accessToken: faker.datatype.uuid(),
    };

    const createdRefreshToken = await refreshTokensRepository.create(
      refreshToken
    );

    expect(createdRefreshToken).toBeTruthy();
    expect({
      ...createdRefreshToken,
      createdAt: new Date(createdRefreshToken.createdAt),
      expiresIn: new Date(createdRefreshToken.expiresIn),
    }).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        token: refreshToken.token,
        userId: refreshToken.userId,
        accessToken: refreshToken.accessToken,
        expiresIn: refreshToken.expiresIn,
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should be able to get a refresh token by refresh token and access token', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    });

    const refreshToken: ICreateRefreshTokenDTO = {
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
      accessToken: faker.datatype.uuid(),
    };

    await refreshTokensRepository.create(refreshToken);

    const getRefreshToken = await refreshTokensRepository.findByRefreshTokenAndAccessToken(
      {
        accessToken: refreshToken.accessToken,
        refreshToken: refreshToken.token,
      }
    );

    expect(getRefreshToken).toBeTruthy();
    expect({
      ...getRefreshToken,
      createdAt: new Date(getRefreshToken.createdAt),
      expiresIn: new Date(getRefreshToken.expiresIn),
    }).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        token: refreshToken.token,
        userId: refreshToken.userId,
        accessToken: refreshToken.accessToken,
        expiresIn: refreshToken.expiresIn,
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should be able to get a refresh token by user id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    });

    const refreshToken: ICreateRefreshTokenDTO = {
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
      accessToken: faker.datatype.uuid(),
    };

    const createdRefreshToken = await refreshTokensRepository.create(
      refreshToken
    );

    const getRefreshToken = await refreshTokensRepository.findByUserId(user.id);

    expect(getRefreshToken).toBeTruthy();
    expect({
      ...getRefreshToken,
      createdAt: new Date(getRefreshToken.createdAt),
      expiresIn: new Date(getRefreshToken.expiresIn),
    }).toEqual(
      expect.objectContaining({
        id: createdRefreshToken.id,
        token: refreshToken.token,
        userId: refreshToken.userId,
        expiresIn: refreshToken.expiresIn,
        accessToken: refreshToken.accessToken,
        createdAt: new Date(createdRefreshToken.createdAt),
      })
    );
  });

  it('Should be able to delete a refresh token by id', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    });

    const refreshToken = await refreshTokensRepository.create({
      userId: user.id,
      token: faker.datatype.uuid(),
      expiresIn: faker.datatype.datetime(),
      accessToken: faker.datatype.uuid(),
    });

    await refreshTokensRepository.deleteById(refreshToken.id);

    const getRefreshToken = await refreshTokensRepository.findByUserId(user.id);

    expect(getRefreshToken).toBeUndefined();
  });
});
