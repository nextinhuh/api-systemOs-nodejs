import { Router } from 'express';

import CreateCostumerService from '../services/CreateCostumerService';
import AuthenticateUserService from '../services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password, sector, login } = request.body;

  const createCostumer = new CreateCostumerService();

  const costumer = await createCostumer.execute({
    name,
    email,
    password,
    sector,
    login,
  });

  return response.json(costumer);
});

usersRouter.post('/login', async (request, response) => {
  const { password, login } = request.body;

  const userAuthentication = new AuthenticateUserService();

  const user = await userAuthentication.execute({
    password,
    login,
  });

  return response.json(user);
});
export default usersRouter;
