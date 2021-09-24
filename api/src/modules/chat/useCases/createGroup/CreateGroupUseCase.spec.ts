import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IRoomTypeEnum } from '@modules/chat/entities/IRoom';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateGroupError } from './CreateGroupError';
import { CreateGroupUseCase } from './CreateGroupUseCase';

let createGroupUseCase: CreateGroupUseCase;
let usersRepository: IUsersRepository;
describe('Create Group Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    createGroupUseCase = container.resolve(CreateGroupUseCase);
  });

  it('Should be able to create a new group', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const group = {
      userId: user.id,
      name: faker.company.companyName(),
    };

    const createdGroup = await createGroupUseCase.execute(group);

    expect(createdGroup).toEqual({
      room: expect.objectContaining({
        id: expect.any(String),
        adminId: user.id,
        type: IRoomTypeEnum.GROUP,
        groupName: group.name,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
      lastMessages: [],
      usersIn: expect.arrayContaining([
        expect.objectContaining({ id: user.id }),
      ]),
    });
  });

  it('Should not be able to create a new group if user not exists', async () => {
    const group = {
      name: faker.company.companyName(),
      userId: 'nonexistent user',
    };

    await expect(createGroupUseCase.execute(group)).rejects.toEqual(
      new CreateGroupError.UserDoesNotExists()
    );
  });
});
