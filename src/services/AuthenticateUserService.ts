/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';
import Person from '../models/Person';

interface RequestDTO {
  login: string;
  password: string;
}

interface Response {
  token: string | undefined;
  name: string | undefined;
  sector: string | undefined;
  person_id: string | undefined;
  privilege: string | undefined;
}

class AuthenticateUserService {
  public async execute({ login, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(User);
    const personsRepository = getRepository(Person);

    const user = await usersRepository.findOne({ where: { login } });

    if (!user) {
      throw new AppError('Incorrect login/password combination.', 401);
    }

    // user.password - Senha criptografada
    // password - Senha não-criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect login/password combination.', 401);
    }

    // Usuário está autenticado

    const personId = user.person_id;

    const person = await personsRepository.findOne({ where: { id: personId } });

    const { expiresIn, secret } = authConfig.jwt; // Pega as informações de configuração para o JWT

    const token = sign({}, secret, {
      subject: person?.id,
      expiresIn,
    });

    if (person?.employee !== null) {
      const userAuthenticated = {
        token,
        name: person?.name,
        sector: person?.employee.sector,
        person_id: person?.id,
        privilege: user.privilege,
      };

      return userAuthenticated;
    }

    const userAuthenticated = {
      token,
      name: person?.name,
      sector: person?.costumer.sector,
      person_id: person?.id,
      privilege: user.privilege,
    };

    return userAuthenticated;
  }
}

export default AuthenticateUserService;
