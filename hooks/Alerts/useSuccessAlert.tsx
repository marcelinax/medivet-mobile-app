import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';

export const useSuccessAlert = () => {
  const toast = useToast();
  const { t } = useTranslation();

  const handleSuccessAlert = (message?: string) => {
    const finalMessage = message ?? t('alerts.success.title');
    toast.show(finalMessage, {
      type: 'success',
    });
  };

  return {
    handleSuccessAlert,
  };
};
