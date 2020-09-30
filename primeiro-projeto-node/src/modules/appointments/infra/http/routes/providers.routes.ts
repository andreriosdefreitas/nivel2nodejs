import { Router } from 'express';
import ensureAuthtenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

providersRouter.use(ensureAuthtenticated);

const providersController = new ProvidersController();
const monthAvailability = new ProviderMonthAvailabilityController();
const dayAvailability = new ProviderDayAvailabilityController();

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:provider_id/month-availability',
    monthAvailability.index,
);
providersRouter.get('/:provider_id/day-availability', dayAvailability.index);

export default providersRouter;
