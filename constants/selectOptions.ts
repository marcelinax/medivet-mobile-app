import { SelectOptionProps } from 'types/components/Inputs/types';
import { DayWeek } from 'constants/enums/dayWeek.enum';
import { TFunction } from 'i18next';
import { AnimalType } from './enums/animalType.enum';
import { Gender } from './enums/gender.enum';

export const getGenderSelectOptions = (t: TFunction<string, undefined>): SelectOptionProps[] => [
  {
    id: Gender.FEMALE,
    label: t('enums.gender.FEMALE'),
  },
  {
    id: Gender.MALE,
    label: t('enums.gender.MALE'),
  },
];

export const getAnimalGenderSelectOptions = (t: TFunction<string, undefined>): SelectOptionProps[] => [
  {
    id: Gender.FEMALE,
    label: t('enums.gender.ANIMAL_FEMALE'),
  },
  {
    id: Gender.MALE,
    label: t('enums.gender.ANIMAL_MALE'),
  },
];

export const getAnimalTypeSelectOptions = (t: TFunction<string, undefined>): SelectOptionProps[] => [
  {
    id: AnimalType.DOG,
    label: t('enums.animal.type.DOG'),
  },
  {
    id: AnimalType.CAT,
    label: t('enums.animal.type.CAT'),
  },
  {
    id: AnimalType.BIRD,
    label: t('enums.animal.type.BIRD'),
  },
  {
    id: AnimalType.FUR_ANIMAL,
    label: t('enums.animal.type.FUR_ANIMAL'),
  },
];

export const getDayOfWeekSelectOptions = (t: TFunction<string, undefined>): SelectOptionProps[] => [
  {
    id: DayWeek.MONDAY,
    label: t('enums.day_of_week.MONDAY'),
  }, {
    id: DayWeek.TUESDAY,
    label: t('enums.day_of_week.TUESDAY'),
  }, {
    id: DayWeek.WEDNESDAY,
    label: t('enums.day_of_week.WEDNESDAY'),
  }, {
    id: DayWeek.THURSDAY,
    label: t('enums.day_of_week.THURSDAY'),
  }, {
    id: DayWeek.FRIDAY,
    label: t('enums.day_of_week.FRIDAY'),
  }, {
    id: DayWeek.SATURDAY,
    label: t('enums.day_of_week.SATURDAY'),
  }, {
    id: DayWeek.SUNDAY,
    label: t('enums.day_of_week.SUNDAY'),
  },
];
