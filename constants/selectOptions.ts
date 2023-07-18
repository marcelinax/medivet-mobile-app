import { SelectOptionProps } from 'types/components/Inputs/types';
import { AnimalType } from './enums/animalType.enum';
import { Gender } from './enums/gender.enum';
import { commonTranslations } from './translations/common.translations';
import { enumsTranslations } from './translations/enums.translations';

export const genderSelectOptions: SelectOptionProps[] = [
  {
    id: Gender.FEMALE,
    label: commonTranslations.FEMALE,
  },
  {
    id: Gender.MALE,
    label: commonTranslations.MALE,
  },
];

export const animalGenderSelectOptions: SelectOptionProps[] = [
  {
    id: Gender.FEMALE,
    label: commonTranslations.ANIMAL_FEMALE,
  },
  {
    id: Gender.MALE,
    label: commonTranslations.ANIMAL_MALE,
  },
];

export const animalTypeSelectOptions: SelectOptionProps[] = [
  {
    id: AnimalType.DOG,
    label: enumsTranslations.DOG,
  },
  {
    id: AnimalType.CAT,
    label: enumsTranslations.CAT,
  },
  {
    id: AnimalType.BIRD,
    label: enumsTranslations.BIRD,
  },
  {
    id: AnimalType.FUR_ANIMAL,
    label: enumsTranslations.FUR_ANIMAL,
  },
];
