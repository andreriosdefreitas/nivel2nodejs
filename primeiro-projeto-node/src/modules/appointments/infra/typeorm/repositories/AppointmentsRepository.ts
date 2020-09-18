import iApoointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository
    extends Repository<Appointment>
    implements iApoointmentsRepository {
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment;
    }
}

export default AppointmentsRepository;
