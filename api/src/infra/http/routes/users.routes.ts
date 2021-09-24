import { Router } from 'express';

import { CreateUserRequestControllerHttp } from '@modules/users/useCases/createUserRequest/CreateUserRequestControllerHttp';
import { ResetPasswordControllerHttp } from '@modules/users/useCases/resetPassword/ResetPasswordControllerHttp';
import { SendForgotPasswordController } from '@modules/users/useCases/sendforgotPasswordEmail/SendForgotPasswordController';
import { VerifyUserControllerHttp } from '@modules/users/useCases/verifyUser/VerifyUserControllerHttp';

const usersRouter = Router();

const createUserRequestController = new CreateUserRequestControllerHttp();
const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordControllerHttp();
const verifyUserController = new VerifyUserControllerHttp();

usersRouter.post('/', createUserRequestController.handle);

usersRouter.post('/forgot_password', sendForgotPasswordController.handle);

usersRouter.post('/reset_password', resetPasswordController.handle);

usersRouter.post('/verify', verifyUserController.handle);

export { usersRouter };
