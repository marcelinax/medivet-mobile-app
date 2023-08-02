import { ApiError, ErrorMessage } from 'types/api/error/types';
import errorsTranslations from 'constants/translations/errors.translations';

export const getAlertError = (errors: ApiError[]): ErrorMessage | undefined => {
  const errorMessages = errors.map((error) => error.message).flat();
  return errorMessages.find((errorMessage) => errorMessage.property === 'all');
};

export const getInputErrors = (errors: ApiError[], field: string): ErrorMessage[] => {
  const errorMessages = errors.map((error) => error.message).flat();
  return errorMessages.filter((errorMessage) => errorMessage.property === field);
};

const parseErrorMessageToTranslationKey = (errorMessage: string) => errorMessage.replace('.', '').replaceAll(' ', '_').toUpperCase();

export const getErrorMessage = (errors: ErrorMessage[]): string => {
  const errorMessage = errors[0].message;
  return errorsTranslations[parseErrorMessageToTranslationKey(errorMessage)];
};
