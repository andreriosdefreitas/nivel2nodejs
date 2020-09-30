import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { day, month, year } = request.body;
        const { provider_id } = request.params;

        const listProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const availability = await listProviderDayAvailabilityService.execute({
            day,
            month,
            provider_id,
            year,
        });

        return response.json(availability);
    }
}