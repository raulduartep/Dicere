import { ICreateIoConnectionsDTO } from '../dtos/ICreateIoConnectionDTO';
import { IUpdateIoConnectionDTO } from '../dtos/IUpdateIoConnectionDTO';
import { IIoConnection } from '../entities/IIoConnection';

export interface IIoConnectionsRepository {
  create(data: ICreateIoConnectionsDTO): Promise<IIoConnection>;
  findByUserId(userId: string): Promise<IIoConnection>;
  findBySocketId(socketId: string): Promise<IIoConnection>;
  updateById(id: string, data: IUpdateIoConnectionDTO): Promise<void>;
}
