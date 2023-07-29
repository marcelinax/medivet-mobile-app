import { StyleSheet, Text, View } from 'react-native';
import { getInputErrors } from 'api/error/services';
import React, { FC, useEffect, useState } from 'react';
import { FormError } from 'types/api/error/types';
import { VetAvailability, VetAvailabilityFormProps } from 'types/api/vetAvailability/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { Button } from 'components/Buttons/Button';
import { inputStyles } from 'components/Inputs/utils/styles';
import { useNavigation } from '@react-navigation/native';
import { CreateVetClinicAvailabilityScreenNavigationProps } from 'types/Navigation/types';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { commonTranslations } from 'constants/translations/common.translations';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import { removeSingleSelect } from 'store/select/selectSlice';
import { SelectId } from 'constants/enums/selectId.enum';
import { setCurrentVetClinicAvailability } from 'store/clinic/clinicSlice';
import { dayOfWeekSelectOptions } from 'constants/selectOptions';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import {
  VetClinicAvailabilityReceptionHourFormList,
} from 'components/Forms/VetClinicAvailability/VetClinicAvailabilityReceptionHourFormList';

interface Props {
  availability?: VetAvailability;
}

export const VetClinicAvailabilityForm: FC<Props> = ({ availability }) => {
  const [ errors, setErrors ] = useState<FormError[]>([]);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const [ form, setForm ] = useState<VetAvailabilityFormProps>({
    userId: user!.id,
    clinicId: availability ? availability.clinic.id : clinic!.id,
    receptionHours: availability ? availability.receptionHours.map((receptionHour) => ({
      ...receptionHour,
      day: dayOfWeekSelectOptions.find((dayOption) => dayOption.id === receptionHour.day) as SelectOptionProps,
    })) : [],
    specialization: availability?.specialization ? {
      id: availability.specialization.id.toString(),
      label: availability.specialization.name,
    } : undefined,
  });
  const dispatch = useDispatch();
  const navigation = useNavigation<CreateVetClinicAvailabilityScreenNavigationProps>();
  const parsedUserVetSpecializations = parseDataToSelectOptions(user?.specializations || [], 'name', 'id');
  const currentAvailability = useSelector((state: RootState) => state.clinic.currentVetClinicAvailability);

  useEffect(() => () => handleClearSelectInputs(), []);

  const handleClearSelectInputs = () => {
    dispatch(removeSingleSelect(SelectId.VET_SPECIALIZATION));
  };

  const handleAddVetClinicAvailability = () => {
    dispatch(setCurrentVetClinicAvailability(currentAvailability || form));
    navigation.push('Create Vet Clinic Availability Reception Hours', {});
  };

  return (
    <View>
      <View>
        <SelectInput
          onChoose={(specialization) => setForm({
            ...form,
            specialization,
          })}
          variant="underline"
          id={SelectId.VET_SPECIALIZATION}
          options={parsedUserVetSpecializations}
          label={inputsTranslations.SPECIALIZATION}
          errors={getInputErrors(errors, 'specialization')}
          selectScreenHeaderTitle={commonTranslations.SPECIALIZATIONS}
        />
      </View>
      <View style={styles.receptionHoursContainer}>
        <Text
          style={[ inputStyles.label, styles.receptionHoursText ]}
        >
          {commonTranslations.RECEPTION_HOURS.toUpperCase()}
        </Text>
        <VetClinicAvailabilityReceptionHourFormList receptionHours={currentAvailability?.receptionHours || []} />
        <Button
          title={buttonsTranslations.ADD}
          variant="solid"
          onPress={handleAddVetClinicAvailability}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  receptionHoursContainer: {
    marginTop: 20,
  },
  receptionHoursText: {
    marginBottom: 10,
  },
});
