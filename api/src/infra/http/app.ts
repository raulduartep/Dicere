import cors from 'cors';
import express from 'express';

import 'express-async-errors';
import { errorTratment } from './middlewares/errorTratment';
import { router } from './routes/index.routes';

const httpApp = express();

httpApp.use(express.json());

httpApp.use(cors());

httpApp.use(router);

httpApp.use(errorTratment);

export { httpApp };
