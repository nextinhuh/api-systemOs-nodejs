import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';
import Employee from '../models/Employee';
import Person from '../models/Person';

import AppError from '../errors/AppError';

interface RequestDTO {
  id: string;
  name: string;
  sector: string;
  position: string;
  password: string;
  privilege: string;
}

interface ResponseData {
  id: string;
  name: string;
  email: string;
  sector: string;
  position: string;
  login: string;
}

class CreateUserService {
  public async execute({
    name,
    password,
    position,
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
      findPerson.employee.position = position;
      findPerson.employee.sector = sector;
      findPerson.user.privilege = privilege;

      const saveEmployee = await personsRepository.save(findPerson);

      const employeeEdited = {
        id: saveEmployee.id,
        name: saveEmployee.name,
        email: saveEmployee.email,
        sector: saveEmployee.employee.sector,
        position: saveEmployee.employee.position,
        login: saveEmployee.user.login,
      };

      return employeeEdited;
    }
    throw new AppError('Any error ocurred, please try again.');

    /* if (checkUserExist) {
      throw new AppError('Email address or name, already used.');
    } */
  }
}

export default CreateUserService;
