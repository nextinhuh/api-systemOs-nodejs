import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';
import Employee from '../models/Employee';
import Person from '../models/Person';

import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  sector: string;
  position: string;
  password: string;
  login: string;
}

interface ResponseData {
  id: string;
  name: string;
  email: string;
  sector: string;
  position: string;
  password: string;
  login: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    login,
    position,
    sector,
  }: RequestDTO): Promise<ResponseData> {
    const usersRepository = getRepository(User);
    const employeesRepository = getRepository(Employee);
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

    const employee = employeesRepository.create({
      sector,
      position,
      person_id: newPerson.id,
    });

    const newEmployee = await employeesRepository.save(employee);

    const hashedPassord = await hash(password, 8);

    const user = usersRepository.create({
      login,
      privilege: 'employee',
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
      position,
      sector,
    };

    return employeeCreated;
  }
}

export default CreateUserService;
