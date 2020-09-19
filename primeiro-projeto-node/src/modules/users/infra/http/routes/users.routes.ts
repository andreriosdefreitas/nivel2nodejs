import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';
import ensureAuthtenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, password });
    delete user.password;
    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    ensureAuthtenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );
        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;
        return response.json(user);
    },
);

export default usersRouter;
