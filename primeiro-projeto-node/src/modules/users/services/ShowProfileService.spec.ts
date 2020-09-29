import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();

        showProfileService = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Joao Silva',
            email: 'joao@test.com',
            password: '123456',
        });

        const savedUser = await showProfileService.execute({
            user_id: user.id,
        });

        expect(savedUser.name).toBe('Joao Silva');
        expect(savedUser.email).toBe('joao@test.com');
    });

    it('should not be able to show the profile', async () => {
        await expect(
            showProfileService.execute({
                user_id: uuid(),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
