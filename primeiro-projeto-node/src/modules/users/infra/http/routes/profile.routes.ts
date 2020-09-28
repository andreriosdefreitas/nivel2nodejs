import { Router } from 'express';
import ensureAuthtenticated from '../middleware/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
profileRouter.use(ensureAuthtenticated);
const profileController = new ProfileController();

profileRouter.get('/', async (request, response) => {
    return profileController.show(request, response);
});

profileRouter.put('/', async (request, response) => {
    return profileController.update(request, response);
});

export default profileRouter;
