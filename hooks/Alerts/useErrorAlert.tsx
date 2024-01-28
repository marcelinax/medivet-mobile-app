import { ApiError } from 'types/api/error/types';
import { getAlertError, getErrorMessage } from 'api/error/services';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';

export const useErrorAlert = () => {
  const toast = useToast();
  const { t } = useTranslation();

  const handleErrorAlert = (errors: ApiError[], message?: string) => {
    const alertError = getAlertError(errors);
    if (!alertError) return;

    const alertErrorMessage = alertError ? getErrorMessage([ alertError ]) : t('errors.something_went_wrong.title');
    const finalMessage = message || alertErrorMessage || '';

    toast.show(finalMessage, {
      type: 'danger',
    });
  };

  return {
    handleErrorAlert,
  };
};
