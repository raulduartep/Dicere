import { getRepository, Like, Repository, Not } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { TypeORMUser } from '@modules/users/entities/implementations/typeorm/TypeORMUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

export class TypeORMUsersRepository implements IUsersRepository {
  private readonly repository: Repository<TypeORMUser>;

  constructor() {
    this.repository = getRepository(TypeORMUser);
  }

  async create(data: ICreateUserDTO): Promise<TypeORMUser> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<TypeORMUser> {
    const user = await this.repository.findOne({
      email,
    });

    return user;
  }

  async findByUsername(username: string): Promise<TypeORMUser> {
    const user = await this.repository.findOne({
      username,
    });

    return user;
  }

  async getAllByUsername(
    username: string,
    currentUserId: string
  ): Promise<TypeORMUser[]> {
    const users = await this.repository.find({
      where: {
        username: Like(`${username}%`),
        id: Not(currentUserId),
      },
    });

    return users;
  }

  async findById(id: string): Promise<TypeORMUser> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByIds(ids: string[]): Promise<TypeORMUser[]> {
    const users = this.repository.findByIds(ids);

    return users;
  }

  async resetPassword({
    id,
    password,
  }: {
    id: string;
    password: string;
  }): Promise<void> {
    await this.repository.update(id, {
      password,
    });
  }
}
