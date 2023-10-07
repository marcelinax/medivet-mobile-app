import { authClient } from 'api/services';
import { AvailableDate } from 'types/api/availableDates/types';

export class AvailableDatesApi {
  static async getAvailableDates(
    vetId: number,
    medicalServiceId: number,
    params?: Record<string, any>,
  ): Promise<AvailableDate[]> {
    const res = await authClient.get(`available-dates?vetId=${vetId}&medicalServiceId=${medicalServiceId}`, { params });
    return res.data;
  }

  static async getAvailableDate(
    vetId: number,
    medicalServiceId: number,
    params?: Record<string, any>,
  ): Promise<AvailableDate | undefined> {
    const res = await authClient.get(`available-dates/first-available?vetId=${vetId}&medicalServiceId=${medicalServiceId}`, { params });
    return res.data;
  }
}
