import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '../../dtos/IFindAllProvidersDTO';
import User from '../../infra/typeorm/entities/User';

class FakeUserRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(u => u.id === id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(u => u.email === email);
        return user;
    }

    public async findAllProviders({
        except_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let { users } = this;

        if (except_user_id) {
            users = this.users.filter(user => user.id !== except_user_id);
        }

        return users;
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { id: uuid() }, data);
        this.users.push(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(u => u.id === user.id);
        this.users[findIndex] = user;
        return user;
    }
}

export default FakeUserRepository;
