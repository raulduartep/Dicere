import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';

import { IForgotPasswordsRepository } from '@modules/users/repositories/IForgotPasswordsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { SendForgotPasswordError } from './SendForgotPasswordError';
import { SendForgotPasswordUseCase } from './SendForgotPasswordUseCase';

let sendForgotPasswordUseCase: SendForgotPasswordUseCase;
let usersRepository: IUsersRepository;
let forgotPasswordsRepository: IForgotPasswordsRepository;
let spySendMail: jest.SpyInstance;

describe('Send Forgot Password Mail', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    forgotPasswordsRepository = container.resolve('ForgotPasswordsRepository');
    sendForgotPasswordUseCase = container.resolve(SendForgotPasswordUseCase);

    const mailProvider = container.resolve<IMailProvider>('MailProvider');

    spySendMail = jest
      .spyOn(mailProvider, 'sendMail')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementation(async () => {});
  });

  it('Should be able to create a new forgot password and to send a forgot password mail to user', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const createdForgotPassword = await sendForgotPasswordUseCase.execute({
      email: user.email,
    });

    expect(spySendMail).toHaveBeenCalled();
    expect(createdForgotPassword).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        token: expect.any(String),
        expiresIn: expect.any(Date),
        createdAt: expect.any(Date),
        userId: user.id,
      })
    );
  });

  it('Should be able to invalidate a forgot password if user user already has a forgot password', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    await sendForgotPasswordUseCase.execute({
      email: user.email,
    });

    const forgotPassword = await sendForgotPasswordUseCase.execute({
      email: user.email,
    });

    const getForgotPassword = await forgotPasswordsRepository.findValidByUserId(
      user.id
    );

    expect(spySendMail).toHaveBeenCalled();
    expect(getForgotPassword).toEqual(forgotPassword);
  });

  it('Should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordUseCase.execute({ email: 'nonexistent email' })
    ).rejects.toEqual(new SendForgotPasswordError.UserDoesNotExist());
  });
});
