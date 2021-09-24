import { Router } from 'express';

import { CreateGroupControllerHttp } from '@modules/chat/useCases/createGroup/CreateGroupControllerHttp';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const groupsRoutes = Router();

const createGroupControllerHttp = new CreateGroupControllerHttp();
groupsRoutes.post('/', ensureAuthenticate, createGroupControllerHttp.handle);

export { groupsRoutes };
