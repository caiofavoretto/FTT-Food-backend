import { Router } from 'express';

import UserRouter from './users.routes';
import FoodsRouter from './foods.routes';
import SessionsRouter from './sessions.routes';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const routes = Router();

routes.use('/users', UserRouter);
routes.use('/foods', ensureAuthenticated,FoodsRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
