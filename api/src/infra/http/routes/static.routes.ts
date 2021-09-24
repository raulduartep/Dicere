import { Router } from 'express';

import { EnsureAuthorizationToViewMediaControllerHttp } from '@modules/chat/useCases/ensureAuthorizationToViewMedia/EnsureAuthorizationToViewMediaControllerHttp';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const staticRoutes = Router();

const ensureAuthorizationToViewMediaControllerHttp = new EnsureAuthorizationToViewMediaControllerHttp();

staticRoutes.get(
  '/:mediaPath',
  ensureAuthenticate,
  ensureAuthorizationToViewMediaControllerHttp.handle
);

export { staticRoutes };
