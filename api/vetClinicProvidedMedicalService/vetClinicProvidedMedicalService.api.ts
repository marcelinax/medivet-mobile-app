import { authClient } from 'api/services';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';

export class VetClinicProvidedMedicalServiceApi {
  static async getVetClinicProvidedMedicalServices(
    clinicId: number,
    params?: Record<string, any>,
  ): Promise<VetClinicProvidedMedicalService[]> {
    const res = await authClient.get(`vet-provided-medical-services/clinic/${clinicId}`, { params });
    return res.data;
  }
}
