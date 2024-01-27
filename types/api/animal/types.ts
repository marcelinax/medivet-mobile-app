import { User } from 'types/api/user/types';
import { Gender } from 'constants/enums/enums';

export interface Animal {
  id: number;
  name: string;
  type: string;
  birthDate: string;
  breed: AnimalBreed;
  coatColor?: AnimalCoatColor;
  gender: Gender.ANIMAL_FEMALE | Gender.ANIMAL_MALE;
  profilePhotoUrl?: string;
  owner: User;
}

export interface CreateAnimal {
  name: string;
  type: string;
  birthDate?: Date;
  breedId?: number;
  coatColorId?: number;
  gender: string;
  profilePhotoUrl?: string;
}

export interface AnimalBreed {
  id: number;
  type: string;
  name: string;
}

export interface AnimalCoatColor {
  id: number;
  name: string;
}
