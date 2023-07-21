import { authClient } from 'api/services';
import { Clinic } from 'types/api/clinic/types';

export class ClinicApi {
  static async getClinicsAssignedToVet(params?: Record<string, any>): Promise<Clinic[]> {
    const res = await authClient.get('clinics/assigned', { params });
    return res.data;
  }

  static async getUnassignedClinics(params?: Record<string, any>): Promise<Clinic[]> {
    const res = await authClient.get('clinics/unassigned', { params });
    return res.data;
  }

  static async getClinic(clinicId: number, params?: Record<string, any>): Promise<Clinic> {
    const res = await authClient.get(`clinics/${clinicId}`, { params });
    return res.data;
  }

  static async addClinic(clinicId: number): Promise<{}> {
    const res = await authClient.post(`clinic-assignment-requests/${clinicId}/assignment-request`);
    return res.data;
  }
}
