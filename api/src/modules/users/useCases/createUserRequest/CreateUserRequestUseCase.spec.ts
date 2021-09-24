import '@shared/container/test';

import faker from 'faker';
import { container } from 'tsyringe';

import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateUserRequestError } from './CreateUserRequestError';
import { CreateUserRequestUseCase } from './CreateUserRequestUseCase';

let createUserRequestUseCase: CreateUserRequestUseCase;
let usersRepository: IUsersRepository;
let spySendMail: jest.SpyInstance;

describe('Create User Request Use Case', () => {
  beforeAll(() => {
    createUserRequestUseCase = container.resolve(CreateUserRequestUseCase);
    usersRepository = container.resolve('UsersRepository');
    const mailProvider = container.resolve<IMailProvider>('MailProvider');

    spySendMail = jest
      .spyOn(mailProvider, 'sendMail')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementation(async () => {});
  });

  it('Should be able to create a new user request', async () => {
    const userRequest = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    };

    const createdUserRequest = await createUserRequestUseCase.execute(
      userRequest
    );

    expect(createdUserRequest.userRequest).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: userRequest.email,
        name: userRequest.name,
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should be able to create a new verification user', async () => {
    const userRequest = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    };

    const createdUserRequest = await createUserRequestUseCase.execute(
      userRequest
    );

    expect(createdUserRequest.verificationUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        token: expect.any(String),
        userRequestId: createdUserRequest.userRequest.id,
        expiresIn: expect.any(Date),
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should be able to send a verification user mail to user', async () => {
    const { userRequest } = await createUserRequestUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    expect(spySendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: userRequest.email })
    );
  });

  it('Should not be able to create a new user if there is a user with same email', async () => {
    const sameEmail = faker.internet.email();

    await usersRepository.create({
      email: sameEmail,
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    await expect(
      createUserRequestUseCase.execute({
        email: sameEmail,
        password: faker.internet.password(),
        name: faker.name.findName(),
      })
    ).rejects.toEqual(new CreateUserRequestError.EmailAlreadyExists());
  });
});
