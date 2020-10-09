import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindInDayProviderDTO from '@modules/appointments/dtos/IFindInDayProviderDTO';
import IFindInMonthProviderDTO from '@modules/appointments/dtos/IFindInMonthProviderDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IApoointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import { uuid } from 'uuidv4';

class FakeAppointmentsRepository implements IApoointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment =>
                isEqual(appointment.date, date) &&
                provider_id === appointment.provider_id,
        );
        return findAppointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        year,
        month,
    }: IFindInMonthProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });
        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day,
    }: IFindInDayProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });
        return appointments;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();
        Object.assign(appointment, { id: uuid(), date, provider_id, user_id });
        this.appointments.push(appointment);
        return appointment;
    }
}

export default FakeAppointmentsRepository;
