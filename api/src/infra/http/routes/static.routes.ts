import { EnsureAuthorizationToViewMessageMediaControllerHttp } from '@modules/chat/useCases/ensureAuthorizationToViewMessageMedia/EnsureAuthorizationToViewMessageMediaControllerHttp';
import { Router, static as expressStatic } from 'express';
import path from 'path';


import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const staticRoutes = Router();

const ensureAuthorizationToViewMessageMediaControllerHttp = new EnsureAuthorizationToViewMessageMediaControllerHttp();

staticRoutes.get(
  '/medias/messages/:mediaPath',
  ensureAuthenticate,
  ensureAuthorizationToViewMessageMediaControllerHttp.handle
);

staticRoutes.get(
  '/medias/rooms_pictures/:mediaPath',
  ensureAuthenticate,
  ensureAuthorizationToViewMediaControllerHttp.handle
);

staticRoutes.use(
  '/pictures',
  expressStatic(path.join(process.cwd(), 'static', 'pictures'))
);

console.log({
  path: path.join(process.cwd(), 'static', 'pictures'),
});

export { staticRoutes };
