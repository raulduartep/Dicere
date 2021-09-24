import { IGroup } from '../entities/IGroup';

export type ICreateGroupDTO = Pick<IGroup, 'roomId' | 'name' | 'adminId'>;
