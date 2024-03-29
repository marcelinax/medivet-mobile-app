import { authClient } from 'api/services';
import { CreateVetOpinion, VetOpinion } from 'types/api/opinion/types';

export class OpinionApi {
  static async getVetOpinions(vetId: number, params?: Record<string, any>): Promise<VetOpinion[]> {
    const res = await authClient.get(`opinions/${vetId}`, { params });
    return res.data;
  }

  static async createOpinion(data: CreateVetOpinion): Promise<VetOpinion> {
    const res = await authClient.post('opinions', data);
    return res.data;
  }

  static async getTotalAmountOfVetOpinions(vetId: number): Promise<number> {
    const res = await authClient.get(`opinions/${vetId}/amount`);
    return res.data;
  }

  static async getMyOpinions(params?: Record<string, any>): Promise<VetOpinion[]> {
    const res = await authClient.get('opinions/my', { params });
    return res.data;
  }

  static async getMyOpinion(opinionId: number, params?: Record<string, any>): Promise<VetOpinion> {
    const res = await authClient.get(`opinions/my/${opinionId}`, { params });
    return res.data;
  }

  static async reportOpinion(opinionId: number, params?: Record<string, any>): Promise<VetOpinion> {
    const res = await authClient.put(`opinions/my/${opinionId}/report`, undefined, { params });
    return res.data;
  }
}
