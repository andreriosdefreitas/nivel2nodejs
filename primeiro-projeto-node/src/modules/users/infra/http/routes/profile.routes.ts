import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthtenticated from '../middleware/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
profileRouter.use(ensureAuthtenticated);
const profileController = new ProfileController();

profileRouter.get('/', async (request, response) => {
    return profileController.show(request, response);
});

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password ')),
        },
    }),
    async (request, response) => {
        return profileController.update(request, response);
    },
);

export default profileRouter;
