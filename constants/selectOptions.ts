import { SelectOptionProps } from 'types/components/Inputs/types';
import { Gender } from './enums/gender.enum';
import { commonTranslations } from './translations/common.translations';

export const genderSelectOptions: SelectOptionProps[] = [
    {
        id: Gender.female,
        label: commonTranslations.FEMALE
    },
    {
        id: Gender.male,
        label: commonTranslations.MALE
    }
];