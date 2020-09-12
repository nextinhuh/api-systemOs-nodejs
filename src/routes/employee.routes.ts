import { Router } from 'express';

import CreateEmployeeService from '../services/CreateEmployeeService';
import EditEmployeeService from '../services/EditEmployeeService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const employeeRouter = Router();

employeeRouter.post('/', async (request, response) => {
  const { name, email, password, login, position, sector } = request.body;

  const createUser = new CreateEmployeeService();

  const employee = await createUser.execute({
    name,
    email,
    password,
    login,
    position,
    sector,
  });

  return response.json(employee);
});

employeeRouter.put('/', ensureAuthenticated, async (request, response) => {
  const { name, password, position, sector, id, privilege } = request.body;

  const editEmploye = new EditEmployeeService();

  const employee = await editEmploye.execute({
    name,
    password,
    position,
    id,
    sector,
    privilege,
  });

  return response.json(employee);
});

export default employeeRouter;
