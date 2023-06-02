import errorsTranslations from 'constants/translations/errors.translations';
import { Error } from 'types/api/error/types';

export const getErrorMessage = (errors: Error[]): string => {
    const errorMessage = errors[0]?.message;
    const keys = Object.keys(errorsTranslations);
    const values = Object.values(errorsTranslations);

    const messageKey = keys.find(k => k === errorMessage);

    if (messageKey) return values[keys.indexOf(messageKey)];
    return '';
};