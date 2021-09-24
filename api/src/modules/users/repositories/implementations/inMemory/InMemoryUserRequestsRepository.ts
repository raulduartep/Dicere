import { ICreateUserRequestDTO } from '@modules/users/dtos/ICreateUserRequestDTO';
import { InMemoryUserRequest } from '@modules/users/entities/implementations/inMemory/InMemoryUserRequest';

import { IUserRequestsRepository } from '../../IUserRequestsRepository';

export class InMemoryUserRequestsRepository implements IUserRequestsRepository {
  private userRequests: InMemoryUserRequest[] = [];

  async create(data: ICreateUserRequestDTO): Promise<InMemoryUserRequest> {
    const userRequest = new InMemoryUserRequest(data);

    this.userRequests.push(userRequest);

    return userRequest;
  }

  async findById(id: string): Promise<InMemoryUserRequest> {
    const userRequest = this.userRequests.find(
      userRequest => userRequest.id === id
    );

    return userRequest;
  }

  async deleteAllByEmail(email: string): Promise<void> {
    this.userRequests
      .filter(userRequest => userRequest.email === email)
      .map(userRequest =>
        this.userRequests.findIndex(
          userRequestIndex => userRequestIndex === userRequest
        )
      )
      .forEach(userRequestIndex =>
        this.userRequests.splice(userRequestIndex, 1)
      );
  }
}
