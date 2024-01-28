import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ApiError } from 'types/api/error/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { getRequestErrors } from 'utils/errors';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { CreateAppointmentDiary } from 'types/api/appointment/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { getInputErrors } from 'api/error/services';
import { TextInput } from 'components/Inputs/TextInput';
import { HandleSubmitForm } from 'types/components/Forms/types';

interface Props {
  setLoading: (loading: boolean) => void;
}

export const AppointmentDiaryForm = forwardRef<HandleSubmitForm, Props>(({ setLoading }, ref) => {
  const { t } = useTranslation();
  const { params: { appointmentId } } = useRoute<RouteProps<'Create Appointment Diary'>>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const { handleErrorAlert } = useErrorAlert();
  const { handleSuccessAlert } = useSuccessAlert();
  const [ form, setForm ] = useState<CreateAppointmentDiary>({
    reason: '',
    description: '',
    appointmentId,
  });

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await AppointmentApi.createAppointmentDiary(form);
      handleSuccessAlert(t('alerts.success.save.title'));
      navigation.navigate('Appointment', {
        appointmentId,
        diaryCreated: true,
      });
    } catch (err: any) {
      const errs = getRequestErrors(err);
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
    setLoading(false);
  };

  const handleChangeFormInput = (value: string, field: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          variant="outline"
          value={form.reason}
          label={t('words.reason.title')}
          onChangeText={(value) => handleChangeFormInput(value, 'reason')}
          errors={getInputErrors(errors, 'reason')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          variant="outline"
          value={form.description}
          label={t('words.description.title')}
          onChangeText={(value) => handleChangeFormInput(value, 'description')}
          errors={getInputErrors(errors, 'description')}
          multiline
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
});
