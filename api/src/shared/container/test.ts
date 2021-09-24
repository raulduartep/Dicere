import { container } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayJsDateProvider } from '@shared/providers/DateProvider/implementations/DayJsDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { BCryptEncoderProvider } from '@shared/providers/EncoderProvider/implementations/BCryptEncoderProvider';
import { IHTMLProvider } from '@shared/providers/HTMLProvider/IHTMLProvider';
import { HandlebarsHTMLProvider } from '@shared/providers/HTMLProvider/implementations/HandlebarsHTMLProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from '@shared/providers/StorageProvider/implementations/LocalStorageProvider';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';
import { JWTTokenManagerProvider } from '@shared/providers/TokenManagerProvider/implementations/JWTTokenManagerProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import { IGroupsRepository } from '@modules/chat/repositories/IGroupsRepository';
import { IInvitationsGroupsRepository } from '@modules/chat/repositories/IInvitationsGroupsRepository';
import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { InMemoryGroupsRepository } from '@modules/chat/repositories/implementations/inMemory/InMemoryGroupsRepository';
import { InMemoryInvitationsGroupsRepository } from '@modules/chat/repositories/implementations/inMemory/InMemoryInvitationsGroupsRepository';
import { InMemoryMessagesRepository } from '@modules/chat/repositories/implementations/inMemory/InMemoryMessagesRepository';
import { InMemoryRoomsRepository } from '@modules/chat/repositories/implementations/inMemory/InMemoryRoomsRepository';
import { InMemoryRoomsUsersRepository } from '@modules/chat/repositories/implementations/inMemory/InMemoryRoomsUsersRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IForgotPasswordsRepository } from '@modules/users/repositories/IForgotPasswordsRepository';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IIoConnectionsRepository } from '@modules/users/repositories/IIoConnectionsRepository';
import { InMemoryForgotPasswordsRepository } from '@modules/users/repositories/implementations/inMemory/InMemoryForgotPasswordsRepository';
import { InMemoryFriendshipsRepository } from '@modules/users/repositories/implementations/inMemory/InMemoryFriendshipsRepository';
import { InMemoryIoConnectionsRepository } from '@modules/users/repositories/implementations/inMemory/InMemoryIoConnectionsRepository';
import { InMemoryRefreshTokensRepository } from '@modules/users/repositories/implementations/inMemory/InMemoryRefreshTokensRepository';
import { InMemoryUserRequestsRepository } from '@modules/users/repositories/implementations/inMemory/InMemoryUserRequestsRepository';
import { InMemoryUsersRepository } from '@modules/users/repositories/implementations/inMemory/InMemoryUsersRepository';
import { InMemoryVerificationUsersRepository } from '@modules/users/repositories/implementations/inMemory/InMemoryVerificationUsersRepository';
import { IRefreshTokensRepository } from '@modules/users/repositories/IRefreshTokensRepository';
import { IUserRequestsRepository } from '@modules/users/repositories/IUserRequestsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IVerificationUsersRepository } from '@modules/users/repositories/IVerificationUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  InMemoryUsersRepository
);

container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  InMemoryRefreshTokensRepository
);

container.registerSingleton<IIoConnectionsRepository>(
  'IoConnectionsRepository',
  InMemoryIoConnectionsRepository
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  InMemoryGroupsRepository
);

container.registerSingleton<IRoomsRepository>(
  'RoomsRepository',
  InMemoryRoomsRepository
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  InMemoryMessagesRepository
);

container.registerSingleton<IFriendshipsRepository>(
  'FriendshipsRepository',
  InMemoryFriendshipsRepository
);

container.registerSingleton<IInvitationsGroupsRepository>(
  'InvitationsGroupsRepository',
  InMemoryInvitationsGroupsRepository
);

container.registerSingleton<IRoomsUsersRepository>(
  'RoomsUsersRepository',
  InMemoryRoomsUsersRepository
);

container.registerSingleton<IForgotPasswordsRepository>(
  'ForgotPasswordsRepository',
  InMemoryForgotPasswordsRepository
);

container.registerSingleton<IVerificationUsersRepository>(
  'VerificationUsersRepository',
  InMemoryVerificationUsersRepository
);

container.registerSingleton<IUserRequestsRepository>(
  'UserRequestsRepository',
  InMemoryUserRequestsRepository
);

container.registerSingleton<IDateProvider>('DateProvider', DayJsDateProvider);

container.registerSingleton<IEncoderProvider>(
  'EncoderProvider',
  BCryptEncoderProvider
);

container.registerSingleton<ITokenManagerProvider>(
  'TokenManagerProvider',
  JWTTokenManagerProvider
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider
);

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherealMailProvider
);

container.registerSingleton<IHTMLProvider>(
  'HTMLProvider',
  HandlebarsHTMLProvider
);
