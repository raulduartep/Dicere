import { ICreateUserRequestDTO } from '../dtos/ICreateUserRequestDTO';
import { IUserRequest } from '../entities/IUserRequest';

export interface IUserRequestsRepository {
  create(data: ICreateUserRequestDTO): Promise<IUserRequest>;
  findById(id: string): Promise<IUserRequest>;
  deleteAllByEmail(email: string): Promise<void>;
}
