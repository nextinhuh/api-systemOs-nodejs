import { Router } from 'express';

import CreateEmployeeService from '../services/CreateEmployeeService';
import EditEmployeeService from '../services/EditEmployeeService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
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

  delete employee.password;

  return response.json(employee);
});

usersRouter.put('/', async (request, response) => {
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

  delete employee.password;

  return response.json(employee);
});

/*
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  async (request, response) => {},
); // patch é parecido com  "PUT", a diferença é que é usado para alterações pequenas, de apenas 1 campo
*/

export default usersRouter;
