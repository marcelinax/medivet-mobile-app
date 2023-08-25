import { StyleSheet, Text, View } from 'react-native';
import { getInputErrors, getNotOmittedErrors } from 'api/error/services';
import React, {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { ApiError } from 'types/api/error/types';
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
import { VetAvailabilityApi } from 'api/vetAvailability/vetAvailability.api';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { DayWeek } from 'constants/enums/dayWeek.enum';
import { ErrorText } from 'components/Composition/ErrorText';

interface Props {
  availability?: VetAvailability;
}

export interface HandleSubmitVetClinicAvailabilityForm {
  submit: () => void;
  loading: boolean;
}

export const VetClinicAvailabilityForm = forwardRef<HandleSubmitVetClinicAvailabilityForm, Props>((
  { availability },
  ref,
) => {
  const [ errors, setErrors ] = useState<ApiError[]>([]);
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
  const [ loading, setLoading ] = useState(false);
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const receptionHoursAsString = JSON.stringify(currentAvailability?.receptionHours || []);

  useEffect(() => () => {
    handleClearSelectInputs();
    dispatch(setCurrentVetClinicAvailability(undefined));
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      receptionHours: [ ...(currentAvailability?.receptionHours || []) ],
    });
  }, [ receptionHoursAsString ]);

  useEffect(() => {
    if (availability) {
      dispatch(setCurrentVetClinicAvailability(form));
    }
  }, [ availability?.id ]);

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmitForm();
    },
    loading,
  }));

  const handleClearSelectInputs = () => {
    dispatch(removeSingleSelect(SelectId.VET_SPECIALIZATION));
  };

  const handleAddVetClinicAvailability = () => {
    dispatch(setCurrentVetClinicAvailability(currentAvailability || form));
    navigation.push('Create Vet Clinic Availability Reception Hours', {});
  };

  const getParsedFormData = () => {
    const receptionHours = form.receptionHours.map((receptionHour) => ({
      ...receptionHour,
      day: receptionHour.day.id as DayWeek,
    }));
    return ({
      ...form,
      specializationId: Number(form.specialization?.id),
      receptionHours,
    });
  };

  const handleSubmitForm = async () => {
    setLoading(true);
    try {
      if (availability) {
        await VetAvailabilityApi.editVetAvailability(availability.id, getParsedFormData());
      } else {
        await VetAvailabilityApi.createVetAvailability(getParsedFormData());
      }
      navigation.navigate('Vet Clinic Availabilities');
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      handleErrorAlert(errs);
      setErrors([ ...errs ]);
    }
    setLoading(false);
  };

  const receptionHoursErrors = getInputErrors(errors, 'receptionHours');

  const handleUpdateReceptionHourErrors = () => {
    const errorsWithoutReceptionHourErrors = getNotOmittedErrors(errors, 'receptionHour');
    setErrors([ ...errorsWithoutReceptionHourErrors ]);
  };

  return (
    <View>
      {drawErrorAlert(errors)}
      <View>
        <SelectInput
          onChoose={(specialization) => setForm({
            ...form,
            specialization,
          })}
          isEditable={!availability}
          defaultValue={form?.specialization}
          variant="underline"
          id={SelectId.VET_SPECIALIZATION}
          options={parsedUserVetSpecializations}
          label={inputsTranslations.SPECIALIZATION}
          errors={getInputErrors(errors, 'specializationId')}
          selectScreenHeaderTitle={commonTranslations.SPECIALIZATIONS}
        />
      </View>
      <View style={styles.receptionHoursContainer}>
        <Text
          style={[ inputStyles.label, styles.receptionHoursText ]}
        >
          {commonTranslations.RECEPTION_HOURS.toUpperCase()}
        </Text>
        {
          receptionHoursErrors.length > 0
          && (
            <ErrorText errorMessages={receptionHoursErrors} />
          )
        }
        <VetClinicAvailabilityReceptionHourFormList
          receptionHours={currentAvailability?.receptionHours || []}
          onRemoveReceptionHour={handleUpdateReceptionHourErrors}
          errors={errors}
        />
        <View style={{ marginTop: 10 }}>
          <Button
            title={buttonsTranslations.ADD}
            variant="outline"
            onPress={handleAddVetClinicAvailability}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  receptionHoursContainer: {
    marginTop: 20,
  },
  receptionHoursText: {
    marginBottom: 10,
  },
});