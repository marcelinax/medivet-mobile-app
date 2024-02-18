import { authClient } from 'api/services';
import { CreateVacation, Vacation } from 'types/api/vacation/types';

class VacationApi {
  static async getUserVacations(params: Record<string, any>): Promise<Vacation[]> {
    const res = await authClient.get('vacations', { params });
    return res.data;
  }

  static async getUserVacation(vacationId: number): Promise<Vacation> {
    const res = await authClient.post(`vacations/${vacationId}`);
    return res.data;
  }

  static async createUserVacation(data: CreateVacation): Promise<Vacation> {
    const res = await authClient.post('vacations', data);
    return res.data;
  }
}

export { VacationApi };
