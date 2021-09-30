import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetUsersByUsernameUseCase } from './GetUsersByUsernameUseCase';

let usersRepository: IUsersRepository;
let getUsersByUsernameUseCase: GetUsersByUsernameUseCase;

describe('Get Users', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    getUsersByUsernameUseCase = container.resolve(GetUsersByUsernameUseCase);
  });

  it('Should be able to get all users by username', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: 'example',
    });

    const user2 = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: 'example2',
    });

    const usersGetted = await getUsersByUsernameUseCase.execute({
      username: 'exampl',
    });

    expect(usersGetted).toEqual(
      expect.arrayContaining(UserMap.mapManyForPublic([user, user2]))
    );
  });
});
