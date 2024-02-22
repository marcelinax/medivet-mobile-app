import { authClient } from 'api/services';
import { CreateVacation, Vacation } from 'types/api/vacation/types';

class VacationApi {
  static async getUserVacations(params: Record<string, any>): Promise<Vacation[]> {
    const res = await authClient.get('vacations', { params });
    return res.data;
  }

  static async getUserVacation(vacationId: number): Promise<Vacation> {
    const res = await authClient.get(`vacations/${vacationId}`);
    return res.data;
  }

  static async createUserVacation(data: CreateVacation): Promise<Vacation> {
    const res = await authClient.post('vacations', data);
    return res.data;
  }

  static async cancelUserVacation(vacationId: number): Promise<Vacation> {
    const res = await authClient.put(`vacations/${vacationId}/cancel`);
    return res.data;
  }

  static async updateUserVacation(vacationId: number, data: CreateVacation): Promise<Vacation> {
    const res = await authClient.put(`vacations/${vacationId}`, data);
    return res.data;
  }

  static async getAmountOfAppointmentsToBeCancelled(data: CreateVacation): Promise<number> {
    const res = await authClient.get('vacations/appointments-to-be-cancelled', {
      params: {
        from: data.from,
        to: data.to,
      },
    });
    return res.data;
  }
}

export { VacationApi };
