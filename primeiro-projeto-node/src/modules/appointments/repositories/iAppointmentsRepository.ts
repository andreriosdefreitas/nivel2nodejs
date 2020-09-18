import Appointment from '../infra/typeorm/entities/Appointment';

interface iApoointmentsRepository {
    findByDate(date: Date): Promise<Appointment | undefined>;
}

export default iApoointmentsRepository;
