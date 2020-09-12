import { Router } from 'express';
import usersRouter from './users.routes';
import employeeRouter from './employee.routes';
import costumerRouter from './costumer.routes';
import orderServiceRouter from './orderService.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/employees', employeeRouter);
routes.use('/costumers', costumerRouter);
routes.use('/order_serivce', orderServiceRouter);

export default routes;
