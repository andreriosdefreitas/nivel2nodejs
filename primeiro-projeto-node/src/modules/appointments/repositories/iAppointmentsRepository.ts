import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindInMonthProviderDTO from '../dtos/IFindInMonthProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IApoointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: IFindInMonthProviderDTO,
    ): Promise<Appointment[]>;
}

export default IApoointmentsRepository;
