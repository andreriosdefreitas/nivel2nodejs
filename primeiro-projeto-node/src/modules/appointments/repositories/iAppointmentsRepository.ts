import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindInDayProviderDTO from '../dtos/IFindInDayProviderDTO';
import IFindInMonthProviderDTO from '../dtos/IFindInMonthProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IApoointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: IFindInMonthProviderDTO,
    ): Promise<Appointment[]>;

    findAllInDayFromProvider(
        data: IFindInDayProviderDTO,
    ): Promise<Appointment[]>;
}

export default IApoointmentsRepository;
