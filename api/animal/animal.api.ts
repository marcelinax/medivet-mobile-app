import { authClient } from 'api/services';
import {
  Animal, AnimalBreed, AnimalCoatColor, CreateAnimal,
} from 'types/api/animal/types';

export class AnimalApi {
  static async getAnimalBreeds(params?: Record<string, any>): Promise<AnimalBreed[]> {
    const res = await authClient.get('animal-breeds', { params });
    return res.data;
  }

  static async getAnimalCoatColors(params?: Record<string, any>): Promise<AnimalCoatColor[]> {
    const res = await authClient.get('animal-coat-colors', { params });
    return res.data;
  }

  static async createAnimal(data: CreateAnimal): Promise<Animal> {
    const res = await authClient.post('animals', { ...data });
    return res.data;
  }

  static async updateAnimal(animalId: number, data: CreateAnimal): Promise<Animal> {
    const res = await authClient.put(`animals/update/${animalId}`, { ...data });
    return res.data;
  }

  static async uploadNewAnimalProfilePhoto(animalId: number, data: FormData): Promise<Animal> {
    const res = await authClient.post(`animals/upload-profile-photo/${animalId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }

  static async removeAnimalProfilePhoto(animalId: number): Promise<Animal> {
    const res = await authClient.delete(`animals/remove-profile-photo/${animalId}`);
    return res.data;
  }

  static async getOwnerAnimals(params?: Record<string, any>): Promise<Animal[]> {
    const res = await authClient.get('animals/my', { params });
    return res.data;
  }

  static async getAnimal(animalId: number, params?: Record<string, any>): Promise<Animal> {
    const res = await authClient.get(`animals/${animalId}`, { params });
    return res.data;
  }

  static async archiveAnimal(animalId: number, params?: Record<string, any>): Promise<Animal> {
    const res = await authClient.put(`animals/archive/${animalId}`, undefined, { params });
    return res.data;
  }

  static async restoreAnimal(animalId: number, params?: Record<string, any>): Promise<Animal> {
    const res = await authClient.put(`animals/restore/${animalId}`, undefined, { params });
    return res.data;
  }
}
