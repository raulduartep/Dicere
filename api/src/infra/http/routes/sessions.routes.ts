import { Router } from 'express';

import { AuthenticateUserControllerHttp } from '@modules/users/useCases/authenticateUser/AuthenticateUserControllerHttp';
import { AuthenticateUserWithGithubControllerHttp } from '@modules/users/useCases/authenticateUserWithGithub/AuthenticateUserWithGithubControllerHttp';
import { AuthenticateUserWithGoogleControllerHttp } from '@modules/users/useCases/authenticateUserWithGoogle/AuthenticateUserWithGoogleControllerHttp';
import { RefreshAuthTokensControllerHttp } from '@modules/users/useCases/refreshAuthTokens/RefreshAuthTokensControllerHttp';

const sessionsRoutes = Router();

const authenticateUserControllerHttp = new AuthenticateUserControllerHttp();
const refreshAuthTokenControllerHttp = new RefreshAuthTokensControllerHttp();
const authenticateUserWithGoogleControllerHttp = new AuthenticateUserWithGoogleControllerHttp();
const authenticateUserWithGithubControllerHttp = new AuthenticateUserWithGithubControllerHttp();

sessionsRoutes.post('/', authenticateUserControllerHttp.handle);
sessionsRoutes.post('/refresh_token', refreshAuthTokenControllerHttp.handle);

sessionsRoutes.get('/google', authenticateUserWithGoogleControllerHttp.handle);
sessionsRoutes.get('/github', authenticateUserWithGithubControllerHttp.handle);

export { sessionsRoutes };
