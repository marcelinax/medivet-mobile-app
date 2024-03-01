import {
  Appointment, AppointmentDiary, CreateAppointment, CreateAppointmentDiary,
} from 'types/api/appointment/types';
import { authClient } from 'api/services';

export class AppointmentApi {
  static async createAppointment(data: CreateAppointment): Promise<Appointment> {
    const res = await authClient.post('appointments', { ...data });
    return res.data;
  }

  static async getAppointments(params?: Record<string, any>): Promise<Appointment[]> {
    const res = await authClient.get('appointments', { params });
    return res.data;
  }

  static async getAppointment(id: number, params?: Record<string, any>): Promise<Appointment> {
    const res = await authClient.get(`appointments/${id}`, { params });
    return res.data;
  }

  static async cancelAppointment(id: number, params?: Record<string, any>): Promise<Appointment> {
    const res = await authClient.put(`appointments/${id}/cancel`, undefined, { params });
    return res.data;
  }

  static async finishAppointment(id: number, params?: Record<string, any>): Promise<Appointment> {
    const res = await authClient.put(`appointments/${id}/finish`, undefined, { params });
    return res.data;
  }

  static async getNearestAppointment(params?: Record<string, any>): Promise<Appointment | undefined> {
    const res = await authClient.get('appointments/nearest', { params });
    return res.data;
  }

  static async createAppointmentDiary(data: CreateAppointmentDiary): Promise<AppointmentDiary> {
    const res = await authClient.post('appointment-diaries', data);
    return res.data;
  }

  static async getAppointmentDiary(id: number, params?: Record<string, any>): Promise<AppointmentDiary> {
    const res = await authClient.get(`appointment-diaries/${id}`, { params });
    return res.data;
  }

  static async getAnimalAppointmentDiaries(animalId: number, params?: Record<string, any>): Promise<AppointmentDiary[]> {
    const res = await authClient.get(`appointment-diaries/animal/${animalId}`, { params });
    return res.data;
  }
}
