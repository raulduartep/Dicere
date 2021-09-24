import { ICreateVerificationUserDTO } from '../dtos/ICreateVerificationUserDTO';
import { IVerificationUser } from '../entities/IVerificationUser';

export interface IVerificationUsersRepository {
  create(data: ICreateVerificationUserDTO): Promise<IVerificationUser>;
  findByUserRequestId(userRequestId: string): Promise<IVerificationUser>;
  findById(id: string): Promise<IVerificationUser>;
}
