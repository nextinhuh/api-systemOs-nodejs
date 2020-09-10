import { Router } from 'express';

import CreateCostumerService from '../services/CreateCostumerService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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

  delete costumer.password;

  return response.json(costumer);
});
/*
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  async (request, response) => {},
); // patch é parecido com  "PUT", a diferença é que é usado para alterações pequenas, de apenas 1 campo
*/
export default usersRouter;
