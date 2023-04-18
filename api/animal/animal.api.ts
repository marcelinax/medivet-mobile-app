import { authClient } from "api/services";
import { Animal, AnimalBreed, AnimalCoatColor, CreateAnimal } from "types/api/animal/types";

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

    static async uploadNewAnimalProfilePhoto(animalId: number, data: FormData): Promise<Animal> {
        const res = await authClient.post(`animals/upload-profile-photo/${animalId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return res.data;
    }
}