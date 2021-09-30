import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { InMemoryUser } from '@modules/users/entities/implementations/inMemory/InMemoryUser';
import { IUser } from '@modules/users/entities/IUser';

import { IUsersRepository } from '../../IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: InMemoryUser[] = [];

  async create(data: ICreateUserDTO): Promise<InMemoryUser> {
    const user = new InMemoryUser(data);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<InMemoryUser> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findByUsername(username: string): Promise<IUser> {
    const user = this.users.find(user => user.username === username);

    return user;
  }

  async getAllByUsername(username: string): Promise<IUser[]> {
    const users = this.users.filter(user => user.username.startsWith(username));

    return users;
  }

  async findById(id: string): Promise<InMemoryUser> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  async findByIds(ids: string[]): Promise<IUser[]> {
    const users = this.users.filter(user => ids.includes(user.id));

    return users;
  }

  async resetPassword({
    id,
    password,
  }: {
    id: string;
    password: string;
  }): Promise<void> {
    const user = this.users.find(user => user.id === id);

    user.password = password;
  }
}
