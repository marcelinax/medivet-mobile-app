import { StyleSheet, Text, View } from 'react-native';
import { getInputErrors } from 'api/error/services';
import { FC, useEffect, useState } from 'react';
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
    receptionHours: availability ? availability.receptionHours : [],
    specializationId: availability?.specialization?.id,
  });
  const dispatch = useDispatch();
  const navigation = useNavigation<CreateVetClinicAvailabilityScreenNavigationProps>();
  const parsedUserVetSpecializations = parseDataToSelectOptions(user?.specializations || [], 'name', 'id');

  useEffect(() => () => handleClearSelectInputs(), []);

  const handleClearSelectInputs = () => {
    dispatch(removeSingleSelect(SelectId.VET_SPECIALIZATION));
  };

  return (
    <View>
      <View>
        <SelectInput
          onChoose={() => console.log(1)}
          variant="underline"
          id={SelectId.VET_SPECIALIZATION}
          options={parsedUserVetSpecializations}
          label={inputsTranslations.SPECIALIZATION}
          errors={getInputErrors(errors, 'specializationId')}
          selectScreenHeaderTitle={commonTranslations.SPECIALIZATIONS}
        />
      </View>
      <View style={styles.receptionHoursContainer}>
        <Text style={[ inputStyles.label, styles.receptionHoursText ]}>GODZINY PRZYJMOWANIA</Text>
        <Button
          title="Dodaj"
          variant="solid"
          onPress={() => navigation.push('Create Vet Clinic Availability Reception Hours')}
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
    marginBottom: 20,
  },
});
