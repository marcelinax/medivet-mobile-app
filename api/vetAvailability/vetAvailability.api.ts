import { VetAvailability } from 'types/api/vetAvailability/types';
import { authClient } from 'api/services';

export class VetAvailabilityApi {
  static async getVetAvailabilities(params?: Record<string, any>): Promise<VetAvailability[]> {
    const res = await authClient.get('vet-availabilities', { params });
    return res.data;
  }
}
