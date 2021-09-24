import { getRepository, Repository } from 'typeorm';

import { ICreateIoConnectionsDTO } from '@modules/users/dtos/ICreateIoConnectionDTO';
import { IUpdateIoConnectionDTO } from '@modules/users/dtos/IUpdateIoConnectionDTO';
import { TypeORMIoConnection } from '@modules/users/entities/implementations/typeorm/TypeORMIoConnection';

import { IIoConnectionsRepository } from '../../IIoConnectionsRepository';

export class TypeORMIoConnectionsRepository
  implements IIoConnectionsRepository {
  private readonly repository: Repository<TypeORMIoConnection>;

  constructor() {
    this.repository = getRepository(TypeORMIoConnection);
  }

  async create(data: ICreateIoConnectionsDTO): Promise<TypeORMIoConnection> {
    const connection = this.repository.create(data);

    await this.repository.save(connection);

    return connection;
  }

  async findByUserId(userId: string): Promise<TypeORMIoConnection> {
    const connection = this.repository.findOne({ userId });

    return connection;
  }

  async findBySocketId(socketId: string): Promise<TypeORMIoConnection> {
    const connection = this.repository.findOne({ socketId });

    return connection;
  }

  async updateById(id: string, data: IUpdateIoConnectionDTO): Promise<void> {
    await this.repository.update({ id }, data);
  }
}
