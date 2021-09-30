import { Router } from 'express';

import { CreateUserRequestControllerHttp } from '@modules/users/useCases/createUserRequest/CreateUserRequestControllerHttp';
import { GetFriendshipsControllerHttp } from '@modules/users/useCases/getFriendships/GetFriendshipsControllerHttp';
import { GetMeControllerHttp } from '@modules/users/useCases/getMe/GetMeControllerHttp';
import { GetPendingsFriendshipsControllerHttp } from '@modules/users/useCases/getPendingsFriendships/GetPendingsFriendshipsController';
import { GetUsersByUsernameControllerHttp } from '@modules/users/useCases/getUsersByUsername/GetUsersByUsernameControllerHttp';
import { ResetPasswordControllerHttp } from '@modules/users/useCases/resetPassword/ResetPasswordControllerHttp';
import { SendForgotPasswordController } from '@modules/users/useCases/sendforgotPasswordEmail/SendForgotPasswordController';
import { VerifyUserControllerHttp } from '@modules/users/useCases/verifyUser/VerifyUserControllerHttp';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const usersRouter = Router();

const createUserRequestController = new CreateUserRequestControllerHttp();
const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordControllerHttp();
const verifyUserController = new VerifyUserControllerHttp();
const getMeController = new GetMeControllerHttp();
const getFriendshipsController = new GetFriendshipsControllerHttp();
const getPendingsFriendshipsController = new GetPendingsFriendshipsControllerHttp();
const getUsersByUsernameController = new GetUsersByUsernameControllerHttp();

usersRouter.post('/', createUserRequestController.handle);

usersRouter.post('/forgot_password', sendForgotPasswordController.handle);

usersRouter.post('/reset_password', resetPasswordController.handle);

usersRouter.post('/verify', verifyUserController.handle);

usersRouter.get('/me', ensureAuthenticate, getMeController.handle);

usersRouter.get(
  '/username/:username',
  ensureAuthenticate,
  getUsersByUsernameController.handle
);

usersRouter.get(
  '/friendships',
  ensureAuthenticate,
  getFriendshipsController.handle
);

usersRouter.get(
  '/friendships/pendings',
  ensureAuthenticate,
  getPendingsFriendshipsController.handle
);

export { usersRouter };
