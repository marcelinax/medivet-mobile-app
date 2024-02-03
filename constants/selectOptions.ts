import { SelectOptionProps } from 'types/components/Inputs/types';
import { TFunction } from 'i18next';
import { AnimalType, DayWeek, Gender } from 'constants/enums/enums';

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

export const getAvailableDatesSelectOptions = (t: TFunction<string, undefined>): SelectOptionProps[] => [
  {
    id: 'TODAY',
    label: t('enums.available_date.TODAY'),
  },
  {
    id: 'WITHIN_3_DAYS',
    label: t('enums.available_date.WITHIN_3_DAYS'),
  },
  {
    id: 'WHENEVER',
    label: t('enums.available_date.WHENEVER'),
  },
];

export const getUserOpinionSortingModeSelectOptions = (t: TFunction<string, undefined>): SelectOptionProps[] => [
  {
    id: 'newest',
    label: t('enums.sorting_mode.NEWEST'),
  },
  {
    id: 'oldest',
    label: t('enums.sorting_mode.OLDEST'),
  },
  {
    id: 'highest-rate',
    label: t('enums.sorting_mode.HIGHEST_RATE'),
  },
  {
    id: 'lowest-rate',
    label: t('enums.sorting_mode.LOWEST_RATE'),
  },
];
