import { getRepository } from 'typeorm';

import OrderService from '../models/OrderService';

import AppError from '../errors/AppError';
import orderServiceRouter from '../routes/orderService.routes';

interface ResponseData {
  id: string;
  sector: string;
  date: Date;
  description: string;
  resolution: string;
  status: string;
  nameCostumer: string;
}

class ListOrderServiceService {
  public async execute(): Promise<ResponseData[]> {
    const orderServicesRepository = getRepository(OrderService);

    const listOrders = await orderServicesRepository.find();

    const responseList = listOrders.map(order => {
      const object = {
        id: order.id,
        sector: order.sector,
        date: order.date,
        description: order.description,
        resolution: order.resolution,
        status: order.status,
        nameCostumer: order.person.name,
      };
      return object;
    });

    return responseList;
  }
}

export default ListOrderServiceService;
