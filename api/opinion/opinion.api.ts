import { authClient } from 'api/services';
import { VetOpinion } from 'types/api/user/types';

export class OpinionApi {
  static async getVetOpinions(vetId: number, params?: Record<string, any>): Promise<VetOpinion[]> {
    const res = await authClient.get(`opinions/${vetId}`, { params });
    return res.data;
  }
}
