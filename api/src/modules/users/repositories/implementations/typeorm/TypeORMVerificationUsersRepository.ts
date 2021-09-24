import { getRepository, Repository } from 'typeorm';

import { ICreateVerificationUserDTO } from '@modules/users/dtos/ICreateVerificationUserDTO';
import { TypeORMVerificationUser } from '@modules/users/entities/implementations/typeorm/TypeORMVerificationUser';

import { IVerificationUsersRepository } from '../../IVerificationUsersRepository';

export class TypeORMVerificationUsersRepository
  implements IVerificationUsersRepository {
  private readonly repository: Repository<TypeORMVerificationUser>;

  constructor() {
    this.repository = getRepository(TypeORMVerificationUser);
  }

  async create(
    data: ICreateVerificationUserDTO
  ): Promise<TypeORMVerificationUser> {
    const verificationUser = this.repository.create(data);

    await this.repository.save(verificationUser);

    return verificationUser;
  }

  async findByUserRequestId(
    userRequestId: string
  ): Promise<TypeORMVerificationUser> {
    const verificationUser = await this.repository.findOne({
      userRequestId,
    });

    return verificationUser;
  }

  async findById(id: string): Promise<TypeORMVerificationUser> {
    const verificationUser = await this.repository.findOne(id);

    return verificationUser;
  }
}
