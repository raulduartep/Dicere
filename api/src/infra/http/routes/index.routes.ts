import { Router } from 'express';

import { groupsRoutes } from './groups.routes';
import { sessionsRoutes } from './sessions.routes';
import { staticRoutes } from './static.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRoutes);
router.use('/groups', groupsRoutes);
router.use('/static', staticRoutes);

export { router };
