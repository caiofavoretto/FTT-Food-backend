import { Router } from 'express';

import UserRouter from './users.routes';
import RolesRouter from './roles.routes';
import GendersRouter from './genders.routes';
import FoodsRouter from './foods.routes';
import MealsRouter from './meals.routes';
import MenusRouter from './menus.routes';
import SessionsRouter from './sessions.routes';
import AttendancesRouter from './attendances.routes';
import RatingRouter from './ratings.routes';

import EnsureAuthenticated from '../middleware/ensureAuthenticated';
import EnsureEmployeeAuthenticated from '../middleware/ensureEmployeeAuthenticated';

const routes = Router();

routes.use('/users', UserRouter);
routes.use('/roles', EnsureEmployeeAuthenticated, RolesRouter);
routes.use('/genders', EnsureEmployeeAuthenticated, GendersRouter);
routes.use('/attendances', EnsureAuthenticated, AttendancesRouter);
routes.use('/ratings', EnsureAuthenticated, RatingRouter);

routes.use('/foods', FoodsRouter);
routes.use('/meals', MealsRouter);
routes.use('/menus', MenusRouter);

routes.use('/sessions', SessionsRouter);

export default routes;
