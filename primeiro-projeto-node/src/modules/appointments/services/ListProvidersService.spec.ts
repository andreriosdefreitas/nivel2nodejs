import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();

        listProvidersService = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Joao Silva',
            email: 'joao@test.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Joao Silva2',
            email: 'joao2@test.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'Joao Silva3',
            email: 'joao3@test.com',
            password: '123456',
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });

    it('should not be able to list the providers if user id is invalid', async () => {
        await expect(
            listProvidersService.execute({
                user_id: '123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
