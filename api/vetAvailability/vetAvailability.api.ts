import { CreateVetAvailability, VetAvailability } from 'types/api/vetAvailability/types';
import { authClient } from 'api/services';

export class VetAvailabilityApi {
  static async getVetAvailabilities(params?: Record<string, any>): Promise<VetAvailability[]> {
    const res = await authClient.get('vet-availabilities', { params });
    return res.data;
  }

  static async createVetAvailabilities(data: CreateVetAvailability): Promise<VetAvailability> {
    const res = await authClient.post('vet-availabilities', data);
    return res.data;
  }
}
