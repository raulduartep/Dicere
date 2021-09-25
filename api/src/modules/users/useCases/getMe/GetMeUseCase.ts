import { inject, injectable } from 'tsyringe';

import { IUserMap, UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GetMeError } from './GetMeError';

type IRequest = {
  userId: string;
};

type IResponse = IUserMap;

@injectable()
export class GetMeUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new GetMeError.UserDoesNotExist();
    }

    return UserMap.map(user);
  }
}
