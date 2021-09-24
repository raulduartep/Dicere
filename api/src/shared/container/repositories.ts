import { container } from 'tsyringe';

import { IGroupsRepository } from '@modules/chat/repositories/IGroupsRepository';
import { IInvitationsGroupsRepository } from '@modules/chat/repositories/IInvitationsGroupsRepository';
import { IMessagesRepository } from '@modules/chat/repositories/IMessagesRepository';
import { TypeORMGroupsRepository } from '@modules/chat/repositories/implementations/typeorm/TypeORMGroupsRepository';
import { TypeORMInvitationsGroupsRepository } from '@modules/chat/repositories/implementations/typeorm/TypeORMInvitationsGroupsRepository';
import { TypeORMMessagesRepository } from '@modules/chat/repositories/implementations/typeorm/TypeORMMessagesRepository';
import { TypeORMRoomsRepository } from '@modules/chat/repositories/implementations/typeorm/TypeORMRoomsRepository';
import { TypeORMRoomsUsersRepository } from '@modules/chat/repositories/implementations/typeorm/TypeORMRoomsUsersRepository';
import { IRoomsRepository } from '@modules/chat/repositories/IRoomsRepository';
import { IRoomsUsersRepository } from '@modules/chat/repositories/IRoomsUsersRepository';
import { IForgotPasswordsRepository } from '@modules/users/repositories/IForgotPasswordsRepository';
import { IFriendshipsRepository } from '@modules/users/repositories/IFriendshipsRepository';
import { IIoConnectionsRepository } from '@modules/users/repositories/IIoConnectionsRepository';
import { TypeORMForgotPasswordsRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMForgotPasswordsRepository';
import { TypeORMFriendshipsRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMFriendshipsRepository';
import { TypeORMIoConnectionsRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMIoConnectionsRepository';
import { TypeORMRefreshTokensRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMRefreshTokensRepository';
import { TypeORMUserRequestsRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMUserRequestsRepository';
import { TypeORMUsersRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMUsersRepository';
import { TypeORMVerificationUsersRepository } from '@modules/users/repositories/implementations/typeorm/TypeORMVerificationUsersRepository';
import { IRefreshTokensRepository } from '@modules/users/repositories/IRefreshTokensRepository';
import { IUserRequestsRepository } from '@modules/users/repositories/IUserRequestsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IVerificationUsersRepository } from '@modules/users/repositories/IVerificationUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  TypeORMUsersRepository
);

container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  TypeORMRefreshTokensRepository
);

container.registerSingleton<IIoConnectionsRepository>(
  'IoConnectionsRepository',
  TypeORMIoConnectionsRepository
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  TypeORMGroupsRepository
);

container.registerSingleton<IRoomsRepository>(
  'RoomsRepository',
  TypeORMRoomsRepository
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  TypeORMMessagesRepository
);

container.registerSingleton<IFriendshipsRepository>(
  'FriendshipsRepository',
  TypeORMFriendshipsRepository
);

container.registerSingleton<IInvitationsGroupsRepository>(
  'InvitationsGroupsRepository',
  TypeORMInvitationsGroupsRepository
);

container.registerSingleton<IRoomsUsersRepository>(
  'RoomsUsersRepository',
  TypeORMRoomsUsersRepository
);

container.registerSingleton<IForgotPasswordsRepository>(
  'ForgotPasswordsRepository',
  TypeORMForgotPasswordsRepository
);

container.registerSingleton<IVerificationUsersRepository>(
  'VerificationUsersRepository',
  TypeORMVerificationUsersRepository
);

container.registerSingleton<IUserRequestsRepository>(
  'UserRequestsRepository',
  TypeORMUserRequestsRepository
);
