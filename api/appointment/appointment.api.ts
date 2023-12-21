import { Appointment, CreateAppointment } from 'types/api/appointment/types';
import { authClient } from 'api/services';

export class AppointmentApi {
  static async createAppointment(data: CreateAppointment): Promise<Appointment> {
    const res = await authClient.post('appointments', { ...data });
    return res.data;
  }
}
