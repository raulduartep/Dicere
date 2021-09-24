import { ICreateIoConnectionsDTO } from '@modules/users/dtos/ICreateIoConnectionDTO';
import { IUpdateIoConnectionDTO } from '@modules/users/dtos/IUpdateIoConnectionDTO';
import { InMemoryIoConnection } from '@modules/users/entities/implementations/inMemory/InMemoryIoConnection';

import { IIoConnectionsRepository } from '../../IIoConnectionsRepository';

export class InMemoryIoConnectionsRepository
  implements IIoConnectionsRepository {
  private connections: InMemoryIoConnection[] = [];

  async create(data: ICreateIoConnectionsDTO): Promise<InMemoryIoConnection> {
    const connection = new InMemoryIoConnection(data);

    this.connections.push(connection);

    return connection;
  }

  async findByUserId(userId: string): Promise<InMemoryIoConnection> {
    const connection = this.connections.find(
      connection => connection.userId === userId
    );

    return connection;
  }

  async findBySocketId(socketId: string): Promise<InMemoryIoConnection> {
    const connection = this.connections.find(
      connection => connection.socketId === socketId
    );

    return connection;
  }

  async updateById(id: string, data: IUpdateIoConnectionDTO): Promise<void> {
    const connection = this.connections.find(
      connection => connection.id === id
    );

    Object.assign(connection, {
      ...data,
      updatedAt: new Date(),
    });
  }
}
