import { IRoomUser } from '../entities/IRoomUser';

export type ICreateRoomUserDTO = Pick<IRoomUser, 'userId' | 'roomId'>;
