import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';
import Costumer from '../models/Costumer';
import Person from '../models/Person';

import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  sector: string;
  password: string;
  login: string;
}

interface ResponseData {
  id: string;
  name: string;
  email: string;
  sector: string;
  password: string;
  login: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    login,
    sector,
  }: RequestDTO): Promise<ResponseData> {
    const usersRepository = getRepository(User);
    const costumersRepository = getRepository(Costumer);
    const personsRepository = getRepository(Person);

    const checkUserExist = await personsRepository.findOne({
      where: [{ email }, { name }],
    });

    if (checkUserExist) {
      throw new AppError('Email address or name, already used.');
    }

    const person = personsRepository.create({
      name,
      email,
    });

    const newPerson = await personsRepository.save(person);

    const costumer = costumersRepository.create({
      sector,
      person_id: newPerson.id,
    });

    const newCostumer = await costumersRepository.save(costumer);

    const hashedPassord = await hash(password, 8);

    const user = usersRepository.create({
      login,
      privilege: 'costumer',
      password: hashedPassord,
      person_id: newPerson.id,
    });

    const newUser = await usersRepository.save(user);

    const employeeCreated = {
      id: newPerson.id,
      name,
      email,
      password,
      login,
      sector,
    };

    return employeeCreated;
  }
}

export default CreateUserService;
