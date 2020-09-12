import { Router } from 'express';
import { getRepository } from 'typeorm';

import OrderService from '../models/OrderService';
import User from '../models/User';

import CreateOrderServiceService from '../services/CreateOrderServiceService';
import EditOrderServicesService from '../services/EditOrderSerivceService';
import ListCostumerService from '../services/ListOrderServiceService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const orderServiceRouter = Router();

orderServiceRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { sector, date, description, personId } = request.body;

  const createOrderService = new CreateOrderServiceService();

  const orderService = await createOrderService.execute({
    sector,
    date,
    description,
    id: personId,
  });

  return response.json(orderService);
});

orderServiceRouter.put('/', ensureAuthenticated, async (request, response) => {
  const { status, resolution, orderId } = request.body;

  const editOrderService = new EditOrderServicesService();

  const orderService = await editOrderService.execute({
    status,
    resolution,
    id: orderId,
  });

  return response.json(orderService);
});

orderServiceRouter.get('/', ensureAuthenticated, async (request, response) => {
  const listOrders = new ListCostumerService();

  const list = await listOrders.execute();

  return response.json(list);
});

export default orderServiceRouter;
