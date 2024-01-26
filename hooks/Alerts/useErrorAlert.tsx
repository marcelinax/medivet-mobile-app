import { ApiError } from 'types/api/error/types';
import { getAlertError, getErrorMessage } from 'api/error/services';
import { useToast } from 'react-native-toast-notifications';

export const useErrorAlert = () => {
  const toast = useToast();

  const handleErrorAlert = (errors: ApiError[], message?: string) => {
    const alertError = getAlertError(errors);
    const alertErrorMessage = alertError ? getErrorMessage([ alertError ]) : '';
    const finalMessage = message || alertErrorMessage || '';

    toast.show(finalMessage, {
      type: 'danger',
    });
  };

  return {
    handleErrorAlert,
  };
};
