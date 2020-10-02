import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthtenticated from '../middleware/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    async (request, response) => {
        return usersController.create(request, response);
    },
);

usersRouter.patch(
    '/avatar',
    ensureAuthtenticated,
    upload.single('avatar'),
    async (request, response) => {
        return userAvatarController.update(request, response);
    },
);

export default usersRouter;
