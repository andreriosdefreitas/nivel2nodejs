import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Joao Silva',
            email: 'joao@test.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Joao Silva Sauro',
            email: 'joaosauro@test.com',
        });

        expect(updatedUser.name).toBe('Joao Silva Sauro');
        expect(updatedUser.email).toBe('joaosauro@test.com');
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Joao Silva',
            email: 'joao@test.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Joao Silva Sauro',
            email: 'joaosauro@test.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Joao Silva',
            email: 'joao@test.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Joao Silva Sauro',
                email: 'joaosauro@test.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Joao Silva',
            email: 'joao@test.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Joao Silva Sauro',
                email: 'joaosauro@test.com',
                old_password: 'wrongOldPassword',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Joao Silva',
            email: 'joao@test.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@test.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Joao Silva',
                email: 'joao@test.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update non existing user', async () => {
        await expect(
            updateProfileService.execute({
                user_id: uuid(),
                name: 'Joao Silva',
                email: 'joao@test.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
