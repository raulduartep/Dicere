import { ICreateGroupDTO } from '../dtos/ICreateGroupDTO';
import { IGroup } from '../entities/IGroup';

export interface IGroupsRepository {
  create(data: ICreateGroupDTO): Promise<IGroup>;
  findById(id: string): Promise<IGroup>;
  findByRoomId(roomId: string): Promise<IGroup>;
}
