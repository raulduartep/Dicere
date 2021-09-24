import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../entities/IUser';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findById(id: string): Promise<IUser>;
  findByIds(ids: string[]): Promise<IUser[]>;
  resetPassword(data: { id: string; password: string }): Promise<void>;
}
