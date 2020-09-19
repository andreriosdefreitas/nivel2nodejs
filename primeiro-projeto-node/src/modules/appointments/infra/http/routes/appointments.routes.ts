import { Router } from 'express';
import { parseISO } from 'date-fns';
import ensureAuthtenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthtenticated);

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
        CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
        provider_id,
        date: parsedDate,
    });

    return response.json(appointment);
});

// appointmentsRouter.get('/', async (request, response) => {
//     const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//     const appointments = await appointmentsRepository.find();
//     return response.json(appointments);
// });

export default appointmentsRouter;
