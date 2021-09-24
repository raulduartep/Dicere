import { getRepository, Repository } from 'typeorm';

import { ICreateForgotPassword } from '@modules/users/dtos/ICreateForgotPassword';
import { TypeORMForgotPassword } from '@modules/users/entities/implementations/typeorm/TypeORMForgotPassword';

import { IForgotPasswordsRepository } from '../../IForgotPasswordsRepository';

export class TypeORMForgotPasswordsRepository
  implements IForgotPasswordsRepository {
  private readonly repository: Repository<TypeORMForgotPassword>;

  constructor() {
    this.repository = getRepository(TypeORMForgotPassword);
  }

  async create(data: ICreateForgotPassword): Promise<TypeORMForgotPassword> {
    const forgotPassword = this.repository.create(data);

    await this.repository.save(forgotPassword);

    return forgotPassword;
  }

  async findValidByUserId(userId: string): Promise<TypeORMForgotPassword> {
    const forgotPassword = await this.repository.findOne({
      userId,
      isValid: true,
    });

    return forgotPassword;
  }

  async findById(id: string): Promise<TypeORMForgotPassword> {
    const forgotPassword = await this.repository.findOne(id);

    return forgotPassword;
  }

  async invalidate(id: string): Promise<void> {
    await this.repository.update(id, {
      isValid: false,
    });
  }
}
