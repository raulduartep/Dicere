import { inject, injectable } from 'tsyringe';

import { IIoConnection } from '@modules/users/entities/IIoConnection';
import { IIoConnectionsRepository } from '@modules/users/repositories/IIoConnectionsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateIoConnectionError } from './CreateIoConnectionError';

type IRequest = {
  userId: string;
  socketId: string;
};

@injectable()
export class CreateIoConnectionUseCase {
  constructor(
    @inject('IoConnectionsRepository')
    private ioConnectionsRepository: IIoConnectionsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ socketId, userId }: IRequest): Promise<IIoConnection> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new CreateIoConnectionError.UserDoesNotExists();
    }

    const connectiosAlreadyExists = await this.ioConnectionsRepository.findByUserId(
      userId
    );

    if (connectiosAlreadyExists) {
      this.ioConnectionsRepository.updateById(connectiosAlreadyExists.id, {
        socketId,
      });

      connectiosAlreadyExists.socketId = socketId;

      return connectiosAlreadyExists;
    }

    const connection = this.ioConnectionsRepository.create({
      socketId,
      userId,
    });

    return connection;
  }
}
