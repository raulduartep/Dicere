import { ICreateVerificationUserDTO } from '@modules/users/dtos/ICreateVerificationUserDTO';
import { InMemoryVerificationUser } from '@modules/users/entities/implementations/inMemory/InMemoryVerificationUser';

import { IVerificationUsersRepository } from '../../IVerificationUsersRepository';

export class InMemoryVerificationUsersRepository
  implements IVerificationUsersRepository {
  private verificationUsers: InMemoryVerificationUser[] = [];

  async create(
    data: ICreateVerificationUserDTO
  ): Promise<InMemoryVerificationUser> {
    const verificationUser = new InMemoryVerificationUser(data);

    this.verificationUsers.push(verificationUser);

    return verificationUser;
  }

  async findById(id: string): Promise<InMemoryVerificationUser> {
    const verificationUser = this.verificationUsers.find(
      verificationUser => verificationUser.id === id
    );

    return verificationUser;
  }

  async findByUserRequestId(
    userRequestId: string
  ): Promise<InMemoryVerificationUser> {
    const verificationUser = this.verificationUsers.find(
      verificationUser => verificationUser.userRequestId === userRequestId
    );

    return verificationUser;
  }
}
