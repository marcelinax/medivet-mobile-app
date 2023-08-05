import { VetAvailabilityReceptionHourFormProps } from 'types/api/vetAvailability/types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  CreateVetClinicAvailabilityReceptionHoursScreenNavigationProps,
  CreateVetClinicAvailabilityReceptionHoursScreenRouteProps,
} from 'types/Navigation/types';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { dayOfWeekSelectOptions } from 'constants/selectOptions';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import { SelectId } from 'constants/enums/selectId.enum';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { Button } from 'components/Buttons/Button';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { updateCurrentVetClinicAvailabilityReceptionHours } from 'store/clinic/clinicSlice';
import { removeSingleSelect } from 'store/select/selectSlice';
import { DatePicker } from 'components/Inputs/DatePicker';
import { parseDateFormatToTime, parseTimeStringToDate } from 'utils/formatDate';

export const VetClinicAvailabilityReceptionHourForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<CreateVetClinicAvailabilityReceptionHoursScreenNavigationProps>();
  const route = useRoute<CreateVetClinicAvailabilityReceptionHoursScreenRouteProps>();
  const { index } = route.params;
  const currentVetAvailability = useSelector((state: RootState) => state.clinic.currentVetClinicAvailability);
  const currentVetAvailabilityReceptionHour = index !== undefined && currentVetAvailability
    ? currentVetAvailability.receptionHours[index] : undefined;
  const [ form, setForm ] = useState<VetAvailabilityReceptionHourFormProps>({
    hourTo: currentVetAvailabilityReceptionHour?.hourTo || '',
    day: currentVetAvailabilityReceptionHour?.day ? dayOfWeekSelectOptions.find(
      (dayOption) => dayOption.id === currentVetAvailabilityReceptionHour.day.id,
    ) as SelectOptionProps : dayOfWeekSelectOptions[0],
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
          options={dayOfWeekSelectOptions}
          label={inputsTranslations.DAY_OF_WEEK}
          errors={[]}
          id={SelectId.DAY_OF_WEEK}
          defaultValue={form?.day}
          selectScreenHeaderTitle={inputsTranslations.DAY_OF_WEEK}
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
          label={inputsTranslations.HOUR_FROM}
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
          label={inputsTranslations.HOUR_TO}
        />
      </View>
      <Button
        title={currentVetAvailabilityReceptionHour ? buttonsTranslations.CHANGE : buttonsTranslations.ADD}
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
