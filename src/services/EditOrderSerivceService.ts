import { getRepository } from 'typeorm';

import OrderSerivce from '../models/OrderService';

import AppError from '../errors/AppError';

interface RequestDTO {
  id: string;
  status: string;
  resolution: string;
}

interface ResponseData {
  id: string;
  sector: string;
  date: Date;
  description: string;
  resolution: string;
  status: string;
  nameCostumer: string;
}

class CreateUserService {
  public async execute({
    status,
    resolution,
    id,
  }: RequestDTO): Promise<ResponseData> {
    const orderServiceRepository = getRepository(OrderSerivce);

    const findOrder = await orderServiceRepository.findOne({
      where: [{ id }],
    });

    if (findOrder) {
      findOrder.status = status;
      findOrder.resolution = resolution;

      const saveUpdatedOrder = await orderServiceRepository.save(findOrder);

      const orderUpdated = {
        id: saveUpdatedOrder.id,
        sector: saveUpdatedOrder.sector,
        date: saveUpdatedOrder.date,
        description: saveUpdatedOrder.description,
        resolution: saveUpdatedOrder.resolution,
        status: saveUpdatedOrder.status,
        nameCostumer: saveUpdatedOrder.person.name,
      };

      return orderUpdated;
    }
    throw new AppError('Any error ocurred, please try again.');
  }
}

export default CreateUserService;
