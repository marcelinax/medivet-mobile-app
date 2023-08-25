import { authClient } from 'api/services';
import {
  CreateVetClinicProvidedMedicalService,
  VetClinicProvidedMedicalService,
  VetSpecializationMedicalService,
} from 'types/api/vetClinicProvidedMedicalService/types';

export class VetClinicProvidedMedicalServiceApi {
  static async getVetClinicProvidedMedicalServices(
    clinicId: number,
    params?: Record<string, any>,
  ): Promise<VetClinicProvidedMedicalService[]> {
    const res = await authClient.get(`vet-provided-medical-services/clinic/${clinicId}`, { params });
    return res.data;
  }

  static async getVetSpecializationMedicalServices(
    params?: Record<string, any>,
  ): Promise<VetSpecializationMedicalService[]> {
    const res = await authClient.get('vet-specialization-medical-services', { params });
    return res.data;
  }

  static async createVetClinicProvidedMedicalService(
    data: CreateVetClinicProvidedMedicalService,
  ): Promise<VetClinicProvidedMedicalService> {
    const res = await authClient.post('vet-provided-medical-services', data);
    return res.data;
  }
}
