import { inject, injectable } from 'tsyringe';

import { IUserMapForPublic, UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

type IRequest = {
  username: string;
};

type IResponse = IUserMapForPublic[];

@injectable()
export class GetUsersByUsernameUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ username }: IRequest): Promise<IResponse> {
    const users = await this.usersRepository.getAllByUsername(username);

    return UserMap.mapManyForPublic(users);
  }
}
