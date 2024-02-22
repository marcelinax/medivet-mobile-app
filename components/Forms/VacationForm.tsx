import { forwardRef, useImperativeHandle, useState } from 'react';
import { CreateVacation, Vacation } from 'types/api/vacation/types';
import { StyleSheet, View } from 'react-native';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { DatePicker } from 'components/Inputs/DatePicker';
import { ApiError } from 'types/api/error/types';
import { getInputErrors } from 'api/error/services';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useDispatch } from 'react-redux';
import { setForceFetchingList } from 'store/list/listSlice';
import { VacationApi } from 'api/vacation/vacation.api';
import moment from 'moment';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';

interface Props {
  vacation?: Vacation;
  setLoading: (loading: boolean) => void;
}

export const VacationForm = forwardRef<HandleSubmitForm, Props>(
  ({ vacation, setLoading }, ref) => {
    const [ form, setForm ] = useState<CreateVacation>({
      from: vacation?.from ? moment(vacation.from).toDate() : new Date(),
      to: vacation?.to ? moment(vacation.to).toDate() : new Date(),
    });
    const [ errors, setErrors ] = useState<ApiError[]>([]);
    const { t } = useTranslation();
    const { handleErrorAlert } = useErrorAlert();
    const navigation = useNavigation<NavigationProps>();
    const { handleSuccessAlert } = useSuccessAlert();
    const dispatch = useDispatch();
    const maxDate = moment().add(3, 'month').toDate();
    const minDate = moment().toDate();
    const confirmation = useConfirmationAlert();

    useImperativeHandle(ref, () => ({
      submit() {
        onSubmit();
      },
    }));

    const handleDatePickerConfirmation = (value: Date, field: string) => {
      setForm({
        ...form,
        [field]: value,
      });
    };

    const handleFetchAppointmentsToBeCancelled = async () => {
      setLoading(true);
      try {
        return VacationApi.getAmountOfAppointmentsToBeCancelled(form);
      } catch (err: any) {
        const errors = getRequestErrors(err);
        handleErrorAlert(errors);
      }
      setLoading(false);
    };

    const onSubmit = async () => {
      const appointmentsCount = await handleFetchAppointmentsToBeCancelled();
      await confirmation({
        title: '',
        message: t('alerts.confirmation.create_vacation.message', { count: appointmentsCount }),
      });

      try {
        if (vacation) {
          await VacationApi.updateUserVacation(vacation.id, form);
        } else {
          await VacationApi.createUserVacation(form);
        }
        handleSuccessAlert();
        dispatch(setForceFetchingList(true));
        navigation.goBack();
      } catch (err: any) {
        const errs = getRequestErrors(err);
        setErrors(errs);
        handleErrorAlert(errs);
      }
      setLoading(false);
    };

    return (
      <View>
        <View style={styles.inputContainer}>
          <DatePicker
            onConfirm={(value) => handleDatePickerConfirmation(value, 'from')}
            errors={getInputErrors(errors, 'from')}
            mode="datetime"
            label={t('words.from.title')}
            value={form.from}
            showSeconds={false}
            minimumDate={minDate}
            maximumDate={maxDate}
          />
        </View>
        <DatePicker
          onConfirm={(value) => handleDatePickerConfirmation(value, 'to')}
          errors={getInputErrors(errors, 'to')}
          mode="datetime"
          label={t('words.to.title')}
          value={form.to}
          showSeconds={false}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
});
