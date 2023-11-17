import { authClient } from 'api/services';
import {
  CreateVetClinicProvidedMedicalService,
  UpdateVetClinicProvidedMedicalService,
  VetClinicProvidedMedicalService,
  VetSpecializationMedicalService,
} from 'types/api/vetClinicProvidedMedicalService/types';

export class VetClinicProvidedMedicalServiceApi {
  static async getVetClinicProvidedMedicalServices(
    clinicId: number,
    params: Record<string, any>,
  ): Promise<VetClinicProvidedMedicalService[]> {
    const res = await authClient.get(`vet-provided-medical-services/clinics/${clinicId}`, { params });
    return res.data;
  }

  static async getProvidedMedicalServices(
    params?: Record<string, any>,
  ): Promise<VetClinicProvidedMedicalService[]> {
    const res = await authClient.get('vet-provided-medical-services', { params });
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

  static async updateVetClinicProvidedMedicalService(
    vetClinicProvidedMedicalServiceId: number,
    data: UpdateVetClinicProvidedMedicalService,
  ): Promise<VetClinicProvidedMedicalService> {
    const res = await authClient.put(`vet-provided-medical-services/${vetClinicProvidedMedicalServiceId}`, data);
    return res.data;
  }

  static async getVetClinicProvidedMedicalService(
    vetClinicProvidedMedicalServiceId: number,
    params?: Record<string, any>,
  ): Promise<VetClinicProvidedMedicalService> {
    const res = await authClient.get(`vet-provided-medical-services/${vetClinicProvidedMedicalServiceId}`, { params });
    return res.data;
  }

  static async removeVetClinicProvidedMedicalService(vetClinicProvidedMedicalServiceId: number): Promise<void> {
    await authClient.delete(`vet-provided-medical-services/${vetClinicProvidedMedicalServiceId}`);
  }

  static async getVetClinicProvidedMedicalServicesForVet(
    vetId: number,
    params?: Record<string, any>,
  ): Promise<VetClinicProvidedMedicalService[]> {
    const res = await authClient.get(`vet-provided-medical-services/vets/${vetId}`, { params });
    return res.data;
  }
}
