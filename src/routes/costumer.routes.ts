import { Router } from 'express';

import CreateCostumerService from '../services/CreateCostumerService';
import EditCostumerService from '../services/EditCostumerService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const costumerRouter = Router();

costumerRouter.post('/', async (request, response) => {
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

costumerRouter.put('/', ensureAuthenticated, async (request, response) => {
  const { name, password, sector, id, privilege } = request.body;

  const editCostumer = new EditCostumerService();

  const costumer = await editCostumer.execute({
    name,
    password,
    sector,
    id,
    privilege,
  });

  return response.json(costumer);
});

export default costumerRouter;
