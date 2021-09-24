import { ICreateForgotPassword } from '../dtos/ICreateForgotPassword';
import { IForgotPassword } from '../entities/IForgotPassword';

export interface IForgotPasswordsRepository {
  create(data: ICreateForgotPassword): Promise<IForgotPassword>;
  findValidByUserId(userId: string): Promise<IForgotPassword>;
  findById(id: string): Promise<IForgotPassword>;
  invalidate(id: string): Promise<void>;
}
