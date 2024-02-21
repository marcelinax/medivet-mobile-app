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

// TODO w momencie tworzenia/edycji urlopu powinno wyskoczyć potwierdzenie czy na
//  pewno chce utworzyć urlop z informacją ile wizyt zostanie odwołanych
// TODO Do tego będzie osobny request, który powinien się odaplić przed samym zapisem

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

    const onSubmit = async () => {
      setLoading(true);
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
