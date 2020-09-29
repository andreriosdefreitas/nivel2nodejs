import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Joao Silva',
            email: 'joao@test.com',
            password: '123456',
        });
        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email another', async () => {
        const user = await createUser.execute({
            name: 'Joao Silva',
            email: 'joao@test.com',
            password: '123456',
        });
        expect(user).toHaveProperty('id');
        await expect(
            createUser.execute({
                name: 'Joao Silva',
                email: 'joao@test.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
