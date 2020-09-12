import { getRepository } from 'typeorm';

import OrderService from '../models/OrderService';
import Person from '../models/Person';

import AppError from '../errors/AppError';

interface RequestDTO {
  date: Date;
  description: string;
  sector: string;
  id: string;
}

interface ResponseData {
  date: Date;
  description: string;
  sector: string;
  status: string;
  id: string;
}

class CreateUserService {
  public async execute({
    sector,
    date,
    description,
    id,
  }: RequestDTO): Promise<ResponseData> {
    const orderServicesRepository = getRepository(OrderService);

    const checkOrderExist = await orderServicesRepository.findOne({
      where: [{ description }],
    });

    if (checkOrderExist) {
      throw new AppError(
        'Already exist a service order in this date, with this description.',
      );
    }

    const orserService = orderServicesRepository.create({
      sector,
      description,
      date,
      resolution: '',
      status: 'Em aberto',
      person_id: id,
    });

    const newOrder = await orderServicesRepository.save(orserService);

    const orderServiceCreated = {
      id: newOrder.id,
      date,
      description,
      sector,
      status: newOrder.status,
    };

    return orderServiceCreated;
  }
}

export default CreateUserService;
