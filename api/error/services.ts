import { ApiError, ErrorMessage } from 'types/api/error/types';
import errorsTranslations from 'constants/translations/errors.translations';

export const getAlertError = (errors: ApiError[]): ErrorMessage | undefined => {
  if (errors.length === 0) return undefined;

  if (errors[0].statusCode === 500) {
    return {
      message: 'Internal server error',
      property: 'all',
    };
  }

  if (errors[0].statusCode === 403) {
    return {
      message: 'Forbidden resource',
      property: 'all',
    };
  }

  if (errors[0].statusCode === 404) {
    return {
      message: 'Not found',
      property: 'all',
    };
  }

  const errorMessages = errors.map((error) => error?.message).flat();
  return errorMessages.find((errorMessage) => errorMessage!.property === 'all');
};

export const getInputErrors = (errors: ApiError[], field: string): ErrorMessage[] => {
  const errorMessages = errors.map((error) => error.message).flat();
  return errorMessages.filter((errorMessage) => errorMessage.property === field);
};

const parseErrorMessageToTranslationKey = (errorMessage: string) => errorMessage.replace('.', '').replaceAll(' ', '_').toUpperCase();

export const getErrorMessage = (errors: ErrorMessage[]): string => {
  const errorMessage = errors[0].message;
  return errorsTranslations[parseErrorMessageToTranslationKey(errorMessage)] || errorsTranslations.SOMETHING_WENT_WRONG;
};

export const getNotOmittedErrors = (errors: ApiError[], fieldToOmit: string) => errors.filter(
  (error) => error.message?.find((errorMessage) => errorMessage.property !== fieldToOmit),
);
