import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import employeeRouter from './employee.routes';
import costumerRouter from './costumer.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/employees', employeeRouter);
routes.use('/costumers', costumerRouter);

export default routes;
