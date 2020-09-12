import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import Person from '../models/Person';

import AppError from '../errors/AppError';

interface RequestDTO {
  id: string;
  name: string;
  sector: string;
  password: string;
  privilege: string;
}

interface ResponseData {
  id: string;
  name: string;
  email: string;
  sector: string;
  login: string;
}

class CreateUserService {
  public async execute({
    name,
    password,
    sector,
    privilege,
    id,
  }: RequestDTO): Promise<ResponseData> {
    const personsRepository = getRepository(Person);

    const findPerson = await personsRepository.findOne({
      where: [{ id }],
    });

    if (findPerson) {
      const findPerName = await personsRepository.findOne({
        where: { name },
      });

      if (findPerName) {
        throw new AppError('Name already used, please try again.');
      }

      const hashedPassord = await hash(password, 8);
      findPerson.name = name;
      findPerson.user.password = hashedPassord;
      findPerson.costumer.sector = sector;
      findPerson.user.privilege = privilege;

      const saveCostumer = await personsRepository.save(findPerson);

      const costumerEdited = {
        id: saveCostumer.id,
        name: saveCostumer.name,
        email: saveCostumer.email,
        sector: saveCostumer.costumer.sector,
        login: saveCostumer.user.login,
      };

      return costumerEdited;
    }
    throw new AppError('Any error ocurred, please try again.');
  }
}

export default CreateUserService;
