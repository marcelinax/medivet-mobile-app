import { StyleSheet, View } from 'react-native';
import {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { removeSingleSelect, setSingleSelectSelectedOption } from 'store/select/selectSlice';
import { SelectId } from 'constants/enums/selectId.enum';
import { useDispatch, useSelector } from 'react-redux';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { useTranslation } from 'react-i18next';
import { User } from 'types/api/user/types';
import { getAddressString } from 'components/Formatters/FormatAddress';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { AppointmentCalendarDatesForm } from 'components/Forms/Appointment/AppointmentCalendarDatesForm';
import { AppointmentDetails, setAppointmentDetails } from 'store/home/appointmentSlice';
import { RootState } from 'store/store';
import { HandleSubmitAppointmentCalendarForm } from 'types/components/Forms/types';
import moment from 'moment';
import { hasVetRole } from 'utils/hasVetRole';
import { Animal } from 'types/api/animal/types';

interface Props {
  vet: User;
  clinicId?: number;
  medicalService?: VetClinicProvidedMedicalService;
  date?: string;
  setIsButtonDisabled: (disabled: boolean) => void;
  isButtonDisabled: boolean;
  animal?: Animal;
}

const getDefaultAddressForm = (vet: User, clinicId?: number) => {
  if (clinicId !== undefined) {
    return {
      id: clinicId.toString(),
      label: getAddressString(vet.clinics!.find((clinic) => clinic.id === clinicId)!.address),
    };
  }
  if (!vet.clinics || vet.clinics.length === 0) return undefined;

  const clinic = vet.clinics[0];
  return {
    id: clinic.id.toString(),
    label: getAddressString(clinic.address),
  };
};

const getInitialFormState = (
  appointmentDetails: AppointmentDetails,
  vet: User,
  clinicId?: number,
  medicalService?: VetClinicProvidedMedicalService,
  date?: string,
) => {
  if (Object.keys(appointmentDetails).length === 0) {
    return {
      clinicAddress: getDefaultAddressForm(vet, clinicId),
      medicalService: medicalService ? {
        id: medicalService.id.toString(),
        label: medicalService.medicalService.name,
      } : undefined,
      date,
      hour: date ? moment(date).format('HH:mm') : undefined,
      animal: undefined,
      vet: vet.name,
      price: medicalService?.price,
    };
  }

  return {
    ...appointmentDetails,
  };
};

export const AppointmentCalendarForm = forwardRef<HandleSubmitAppointmentCalendarForm, Props>(({
  vet,
  clinicId,
  medicalService,
  setIsButtonDisabled,
  isButtonDisabled,
  date,
  animal,
}, ref) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);
  const { t } = useTranslation();
  const { appointmentDetails } = useSelector((state: RootState) => state.appointment);
  const [ form, setForm ] = useState<AppointmentDetails>(getInitialFormState(appointmentDetails, vet, clinicId, medicalService, date));

  useImperativeHandle(ref, () => ({
    loading: false,
    submit: () => {
      dispatch(setAppointmentDetails(isVet ? {
        ...form,
        animal: animal ? {
          id: animal.id.toString(),
          label: animal.name,
        } : undefined,
      } : form));
    },
    buttonDisabled: isFormButtonDisabled(),
  }));

  useEffect(() => () => handleClearForm(), []);

  useEffect(() => {
    if (isFormButtonDisabled() && !isButtonDisabled) {
      setIsButtonDisabled(true);
    } else if (isButtonDisabled && !isFormButtonDisabled()) {
      setIsButtonDisabled(false);
    }
  }, [ JSON.stringify(form) ]);

  const isFormButtonDisabled = () => !form.clinicAddress
    || !form.date
    || !form.hour
    || !form.medicalService;

  const handleClearForm = () => {
    dispatch(removeSingleSelect(SelectId.APPOINTMENT_CLINIC));
    dispatch(removeSingleSelect(SelectId.APPOINTMENT_MEDICAL_SERVICE));
    dispatch(setAppointmentDetails({}));
  };

  const getClinicAddressOptions = (): SelectOptionProps[] => {
    const clinics = isVet ? user?.clinics || [] : vet?.clinics || [];
    return clinics.map((clinic) => ({
      id: clinic.id.toString(),
      label: getAddressString(clinic.address),
    }));
  };

  const fetchClinicMedicalService = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    if (!form.clinicAddress?.id) return [];

    params = {
      ...params,
      vetId: isVet ? user.id : vet.id,
      include: 'medicalService,user,medicalService.specialization',
      specializationIds: isVet && form.specialization?.id ? [ form.specialization.id ] : undefined,
    };
    const res = await VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalServices(Number(form.clinicAddress.id), params);
    const options = parseDataToSelectOptions(res, 'medicalService.name', 'id', [ 'price' ]);
    return options.map((option) => ({
      ...option,
      label: `${option.label} (${option.additionalFields?.price} PLN)`,
    }));
  };

  const handleChangeAddressInput = (address: SelectOptionProps) => {
    setForm({
      ...form,
      clinicAddress: address,
      medicalService: undefined,
    });
    dispatch(setSingleSelectSelectedOption({
      option: undefined,
      id: SelectId.APPOINTMENT_MEDICAL_SERVICE,
    }));
  };

  const handleChangeMedicalServiceInput = (service: SelectOptionProps) => {
    setForm({
      ...form,
      medicalService: service,
      hour: undefined,
      date: undefined,
      price: service.additionalFields?.price,
    });
  };

  const handleChangeVetSpecialization = (specialization: SelectOptionProps) => {
    setForm({
      ...form,
      specialization,
      clinicAddress: undefined,
      medicalService: undefined,
    });
    dispatch(setSingleSelectSelectedOption({
      option: undefined,
      id: SelectId.APPOINTMENT_CLINIC,
    }));
    dispatch(setSingleSelectSelectedOption({
      option: undefined,
      id: SelectId.APPOINTMENT_CLINIC,
    }));
  };

  return (
    <View>
      {
        isVet && (
          <View style={styles.inputContainer}>
            <SelectInput
              onChoose={handleChangeVetSpecialization}
              variant="outline"
              options={(user.specializations || []).map((specialization) => ({
                id: specialization.id.toString(),
                label: specialization.name,
              }))}
              label={t('words.specialization.title')}
              errors={[]}
              id={SelectId.APPOINTMENT_SPECIALIZATION}
              defaultValue={form?.specialization}
              selectScreenHeaderTitle={t('words.specializations.title')}
            />
          </View>
        )
      }
      {
        ((!isVet || (isVet && form?.specialization))) && (
          <View style={styles.inputContainer}>
            <SelectInput
              onChoose={handleChangeAddressInput}
              variant="outline"
              options={getClinicAddressOptions()}
              label={t('words.address.title')}
              errors={[]}
              id={SelectId.APPOINTMENT_CLINIC}
              defaultValue={form?.clinicAddress}
              selectScreenHeaderTitle={t('words.address.title')}
            />
          </View>
        )
      }
      {
        (!isVet || (isVet && form?.specialization && form?.clinicAddress)) && (
          <View style={styles.inputContainer}>
            <SelectInput
              onChoose={handleChangeMedicalServiceInput}
              variant="outline"
              fetchOptions={fetchClinicMedicalService}
              label={t('words.service.title')}
              errors={[]}
              id={SelectId.APPOINTMENT_MEDICAL_SERVICE}
              defaultValue={form?.medicalService}
              selectScreenHeaderTitle={t('words.service.title')}
            />
          </View>
        )
      }
      {
        form?.medicalService?.id && (
          <AppointmentCalendarDatesForm
            vetId={vet.id}
            medicalServiceId={Number(form.medicalService.id)}
            setForm={setForm}
            form={form}
          />
        )
      }
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
});
