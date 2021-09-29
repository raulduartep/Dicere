import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetMeError } from './GetMeError';
import { GetMeUseCase } from './GetMeUseCase';

let usersRepository: IUsersRepository;
let getMeUseCase: GetMeUseCase;

describe('Get Me Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    getMeUseCase = container.resolve(GetMeUseCase);
  });

  it('Should be able to get a user info', async () => {
    const userCreated = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const userGetted = await getMeUseCase.execute({ userId: userCreated.id });

    expect(userGetted).toEqual(UserMap.map(userCreated));
  });

  it('Should not be able to get a user info if user does not exist', async () => {
    await expect(
      getMeUseCase.execute({ userId: 'nonexistent user' })
    ).rejects.toEqual(new GetMeError.UserDoesNotExist());
  });
});
