import { Router } from 'express';
import ensureAuthtenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

providersRouter.use(ensureAuthtenticated);
const providersController = new ProvidersController();
providersRouter.get('/', providersController.index);

export default providersRouter;
