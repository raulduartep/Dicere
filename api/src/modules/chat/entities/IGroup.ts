import { IInvitationGroup } from './IInvitationGroup';

export interface IGroup {
  id: string;

  name: string;

  deleted: boolean;

  roomId: string;

  adminId: string;

  invitations?: IInvitationGroup[];
}
