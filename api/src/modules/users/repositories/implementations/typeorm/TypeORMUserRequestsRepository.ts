import { getRepository, Repository } from 'typeorm';

import { ICreateUserRequestDTO } from '@modules/users/dtos/ICreateUserRequestDTO';
import { TypeORMUserRequest } from '@modules/users/entities/implementations/typeorm/TypeORMUserRequest';

import { IUserRequestsRepository } from '../../IUserRequestsRepository';

export class TypeORMUserRequestsRepository implements IUserRequestsRepository {
  private readonly repository: Repository<TypeORMUserRequest>;

  constructor() {
    this.repository = getRepository(TypeORMUserRequest);
  }

  async create(data: ICreateUserRequestDTO): Promise<TypeORMUserRequest> {
    const userRequest = this.repository.create(data);

    await this.repository.save(userRequest);

    return userRequest;
  }

  async findById(id: string): Promise<TypeORMUserRequest> {
    const userRequest = await this.repository.findOne(id);

    return userRequest;
  }

  async deleteAllByEmail(email: string): Promise<void> {
    await this.repository.delete({
      email,
    });
  }
}
