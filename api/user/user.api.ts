import { authClient, noAuthClient } from 'api/services';
import { RegistrationCredentials, User, VetSpecialization } from 'types/api/user/types';

class UserApi {
  static async registerUser(data: RegistrationCredentials): Promise<User> {
    const res = await noAuthClient.post('users', {
      ...data,
    });
    return res.data;
  }

  static async getUser(): Promise<User> {
    const res = await authClient.get('users/me');
    return res.data;
  }

  static async uploadNewUserProfilePhoto(data: FormData): Promise<User> {
    const res = await authClient.post('users/me/upload-profile-photo', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }

  static async removeUserProfilePhoto(): Promise<User> {
    const res = await authClient.delete('users/me/remove-profile-photo');
    return res.data;
  }

  static async updateUser(data: User): Promise<User> {
    const res = await authClient.put('users/me', data);
    return res.data;
  }

  static async getVetSpecializations(params?: Record<string, any>): Promise<VetSpecialization[]> {
    const res = await authClient.get('vet-specializations', { params });
    return res.data;
  }

  static async updateUserVetSpecializations(specializationIds: number[]): Promise<User> {
    const res = await authClient.put('users/me/vet-specializations', { specializationIds });
    return res.data;
  }

  static async getVets(params?: Record<string, any>): Promise<User[]> {
    const res = await authClient.get('users/vets', { params });
    return res.data;
  }

  static async getVet(vetId: number, params?: Record<string, any>): Promise<User> {
    const res = await authClient.get(`users/vets/${vetId}`, { params });
    return res.data;
  }
}

export { UserApi };
