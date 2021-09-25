import { Server } from 'http';
import { Server as ServerIO, Socket } from 'socket.io';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { SocketError } from '@shared/errors/SocketError';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';

import { ChangeMessageUserStatusControllerWs } from '@modules/chat/useCases/changeMessageUserStatus/ChangeMessageUserStatusControllerWs';
import { CreateInvitationGroupControllerWs } from '@modules/chat/useCases/createInvitationGroup/CreateInvitationGroupControllerWs';
import { CreateMessageControllerWs } from '@modules/chat/useCases/createMessage/CreateMessageControllerWs';
import { DecideInvitationGroupControllerWs } from '@modules/chat/useCases/decideInvitationGroup/DecideInvitationGroupControllerWs';
import { GetMessagesControllerWs } from '@modules/chat/useCases/getMessages/GetMessagesControllerWs';
import { GetUserRoomsUseCase } from '@modules/chat/useCases/getUserRooms/GetUserRoomsUseCase';
import { TypingMessageControllerWs } from '@modules/chat/useCases/typingMessage/TypingMessageControllerWs';
import { CancelFriendshipRequestControllerWs } from '@modules/users/useCases/cancelFriendshipRequest/CancelFriendshipRequestControllerWs';
import { CreateFriendshipRequestControllerWs } from '@modules/users/useCases/createFriendshipRequest/CreateFriendshipRequestControllerWs';
import { CreateIoConnectionUseCase } from '@modules/users/useCases/createIoConnection/CreateIoConnectionUseCase';
import { DecidedFriendRequestControllerWs } from '@modules/users/useCases/decideFriendRequest/DecideFriendRequestControllerWs';

import { ensureAuthenticate } from './middlewares/ensureAuthenticate';
// import { ensureAuthenticateForSocket } from './middlewares/ensureAuthenticateForSocket';

export type IExtendedSocket = Socket & { user: { id: string } };

export type IRequestWS = {
  io: ServerIO;
  socket: IExtendedSocket;
  body: Record<string, unknown>;
  filename: string | undefined;
};

export type ICallbackWS = (err: AppError, data?: any) => void;

type FunctionHandle = (
  request: IRequestWS,
  callback: ICallbackWS
) => Promise<void>;

type IUploadFile = {
  name: string;
  buffer: Buffer;
  size: number;
  type: string;
  lasModified: Date;
};

type ISocketData = {
  body?: Record<string, unknown>;
  file?: IUploadFile;
};
export class WebSocketApp {
  private readonly io: ServerIO;

  constructor(server: Server) {
    this.io = new ServerIO(server, {
      maxHttpBufferSize: 1e7,
      cors: {
        origin: '*',
      },
    });

    this.io.use(ensureAuthenticate);
  }

  public run(): void {
    const createMessageController = new CreateMessageControllerWs();
    const getMessagesUseCase = new GetMessagesControllerWs();
    const changeMessageUserStatusController = new ChangeMessageUserStatusControllerWs();
    const createFriendshipRequestController = new CreateFriendshipRequestControllerWs();
    const decideFrienshipRequestController = new DecidedFriendRequestControllerWs();
    const createInvitationGroupController = new CreateInvitationGroupControllerWs();
    const decideInvitationGroupController = new DecideInvitationGroupControllerWs();
    const typingMessageController = new TypingMessageControllerWs();
    const cancelFriendshipRequestController = new CancelFriendshipRequestControllerWs();

    this.io.on('connection', async (socket: IExtendedSocket) => {
      // socket.use(await ensureAuthenticateForSocket(socket));

      const createConnectionUseCase = container.resolve(
        CreateIoConnectionUseCase
      );
      const getUserRoomsUseCase = container.resolve(GetUserRoomsUseCase);

      await createConnectionUseCase.execute({
        socketId: socket.id,
        userId: socket.user.id,
      });

      const rooms = await getUserRoomsUseCase.execute({
        userId: socket.user.id,
      });

      const roomsIds = rooms.map(room => room.room.id);

      this.registerSocketInRooms(roomsIds, socket);

      socket.emit('server:allRooms', rooms);

      this.prepareOn(
        socket,
        'client:sendMessage',
        createMessageController.handle
      );

      this.prepareOn(socket, 'client:getMessage', getMessagesUseCase.handle);

      this.prepareOn(
        socket,
        'client:changeMessageStatus',
        changeMessageUserStatusController.handle
      );

      this.prepareOn(
        socket,
        'client:createFriendshipRequest',
        createFriendshipRequestController.handle
      );

      this.prepareOn(
        socket,
        'client:decideFriendshipRequest',
        decideFrienshipRequestController.handle
      );

      this.prepareOn(
        socket,
        'client:createInvitationGroup',
        createInvitationGroupController.handle
      );

      this.prepareOn(
        socket,
        'client:decideInvitationGroup',
        decideInvitationGroupController.handle
      );

      this.prepareOn(
        socket,
        'client:typingMessage',
        typingMessageController.handle
      );

      this.prepareOn(
        socket,
        'client:cancelFriendshipRequest',
        cancelFriendshipRequestController.handle
      );
    });
  }

  private async registerSocketInRooms(
    roomsId: string[],
    socket: IExtendedSocket
  ): Promise<void> {
    roomsId.forEach(id => {
      socket.join(id);
    });
  }

  private prepareOn(
    socket: IExtendedSocket,
    eventName: string,
    functionHandle: FunctionHandle
  ): void {
    socket.on(eventName, async (data: ISocketData, callback: ICallbackWS) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const callbackFunction = callback || (() => {});
      try {
        if (!(typeof data === 'object')) {
          throw new SocketError.FirstArgumentObject();
        }

        console.log(data);

        const request = await this.prepareRequest(socket, data);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        await functionHandle(request, callbackFunction);
      } catch (error) {
        if (error instanceof AppError) {
          callbackFunction(error);
          return;
        }

        callbackFunction(new SocketError.InternalServerError());
      }
    });
  }

  private async prepareRequest(
    socket: IExtendedSocket,
    data: ISocketData
  ): Promise<IRequestWS> {
    let filename: string | undefined;

    if (data.file) {
      filename = await this.handleUpload(data.file);
    }

    return {
      io: this.io,
      socket,
      body: data.body || {},
      filename,
    };
  }

  private async handleUpload(data: IUploadFile): Promise<string> {
    const storageProvider = container.resolve<IStorageProvider>(
      'StorageProvider'
    );

    const filePath = await storageProvider.save(
      {
        filename: data.name,
        content: data.buffer,
      },
      'media'
    );

    return filePath;
  }
}
