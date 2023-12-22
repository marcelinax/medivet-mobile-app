import { VetAvailabilityReceptionHourFormProps } from 'types/api/vetAvailability/types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { SelectId } from 'constants/enums/selectId.enum';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { Button } from 'components/Buttons/Button';
import { updateCurrentVetClinicAvailabilityReceptionHours } from 'store/clinic/clinicSlice';
import { removeSingleSelect } from 'store/select/selectSlice';
import { DatePicker } from 'components/Inputs/DatePicker';
import { parseDateFormatToTime, parseTimeStringToDate } from 'utils/formatDate';
import { useTranslation } from 'react-i18next';
import { getDayOfWeekSelectOptions } from 'constants/selectOptions';

export const VetClinicAvailabilityReceptionHourForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps<'Create Vet Clinic Availability Reception Hours'>>();
  const { index } = route.params;
  const { t } = useTranslation();
  const currentVetAvailability = useSelector((state: RootState) => state.clinic.currentVetClinicAvailability);
  const currentVetAvailabilityReceptionHour = index !== undefined && currentVetAvailability
    ? currentVetAvailability.receptionHours[index] : undefined;
  const [ form, setForm ] = useState<VetAvailabilityReceptionHourFormProps>({
    hourTo: currentVetAvailabilityReceptionHour?.hourTo || '',
    day: currentVetAvailabilityReceptionHour?.day ? getDayOfWeekSelectOptions(t).find(
      (dayOption) => dayOption.id === currentVetAvailabilityReceptionHour.day.id,
    ) as SelectOptionProps : getDayOfWeekSelectOptions(t)[0],
    hourFrom: currentVetAvailabilityReceptionHour?.hourFrom || '',
  });

  const handleChangeInput = (name: string, value: string | SelectOptionProps): void => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = () => {
    dispatch(updateCurrentVetClinicAvailabilityReceptionHours({
      receptionHour: form,
      index,
    }));
    dispatch(removeSingleSelect(SelectId.DAY_OF_WEEK));
    navigation.goBack();
  };

  const isFormCompleted = form.day && form.hourTo && form.hourFrom;

  return (
    <View>
      <View style={styles.inputMargin}>
        <SelectInput
          onChoose={(day) => handleChangeInput('day', day)}
          variant="underline"
          options={getDayOfWeekSelectOptions(t)}
          label={t('words.day_of_week.title')}
          errors={[]}
          id={SelectId.DAY_OF_WEEK}
          defaultValue={form?.day}
          selectScreenHeaderTitle={t('words.day_of_week.title')}
        />
      </View>
      <View style={styles.inputMargin}>
        <DatePicker
          value={form?.hourFrom ? parseTimeStringToDate(form.hourFrom) : undefined}
          errors={[]}
          mode="time"
          onConfirm={(hourFrom) => {
            handleChangeInput('hourFrom', parseDateFormatToTime(hourFrom));
          }}
          label={t('words.hour_from.title')}
        />
      </View>
      <View style={styles.inputMargin}>
        <DatePicker
          value={form?.hourTo ? parseTimeStringToDate(form.hourTo) : undefined}
          errors={[]}
          mode="time"
          onConfirm={(hourTo) => {
            handleChangeInput('hourTo', parseDateFormatToTime(hourTo));
          }}
          label={t('words.hour_to.title')}
        />
      </View>
      <Button
        title={currentVetAvailabilityReceptionHour
          ? t('actions.change.title')
          : t('actions.add.title')}
        variant="solid"
        onPress={onSubmit}
        disabled={!isFormCompleted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputMargin: {
    marginBottom: 20,
  },
});
