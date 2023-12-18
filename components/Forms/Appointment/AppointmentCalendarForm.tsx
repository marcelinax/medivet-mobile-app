import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { removeSingleSelect, setSingleSelectSelectedOption } from 'store/select/selectSlice';
import { SelectId } from 'constants/enums/selectId.enum';
import { useDispatch } from 'react-redux';
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

interface FormProps {
  address?: SelectOptionProps;
  medicalService?: SelectOptionProps;
}

interface Props {
  vet: User;
  clinicId?: number;
  medicalService?: VetClinicProvidedMedicalService;
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

export const AppointmentCalendarForm = ({ vet, clinicId, medicalService }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [ form, setForm ] = useState<FormProps>({
    address: getDefaultAddressForm(vet, clinicId),
    medicalService: medicalService ? {
      id: medicalService.medicalService.id.toString(),
      label: medicalService.medicalService.name,
    } : undefined,
  });
  // POWINNO SIE WYCZYSCIC DOPIERO JAK CAŁKOWICIE WYJDZIE Z FORMULARZA UMWAIANIA (czyli tez krok 2)
  // z tego wynika, że w momencie przejścia dalej formularz powinien być zapisany w reduxie
  useEffect(() => () => handleClearSelectInputs(), []);

  const handleClearSelectInputs = () => {
    dispatch(removeSingleSelect(SelectId.APPOINTMENT_CLINIC));
    dispatch(removeSingleSelect(SelectId.APPOINTMENT_MEDICAL_SERVICE));
  };

  const onChangeInput = (field: string, value: any): void => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const getClinicAddressOptions = (): SelectOptionProps[] => (vet?.clinics || []).map((clinic) => ({
    id: clinic.id.toString(),
    label: getAddressString(clinic.address),
  }));

  const fetchClinicMedicalService = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    if (!form.address?.id) return [];

    params = {
      ...params,
      vetId: vet.id,
      include: 'medicalService,user',
    };
    const res = await VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalServices(Number(form.address.id), params);
    return parseDataToSelectOptions(res, 'medicalService.name', 'id');
  };

  const handleChangeAddressInput = (address: SelectOptionProps) => {
    onChangeInput('address', address);
    onChangeInput('medicalService', undefined);
    dispatch(setSingleSelectSelectedOption({
      option: undefined,
      id: SelectId.APPOINTMENT_MEDICAL_SERVICE,
    }));
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <SelectInput
          onChoose={handleChangeAddressInput}
          variant="outline"
          options={getClinicAddressOptions()}
          label={t('words.address.title')}
          errors={[]}
          id={SelectId.APPOINTMENT_CLINIC}
          defaultValue={form?.address}
          selectScreenHeaderTitle={t('words.address.title')}
        />
      </View>
      <View style={styles.inputContainer}>
        <SelectInput
          onChoose={(service) => onChangeInput('medicalService', service)}
          variant="outline"
          fetchOptions={fetchClinicMedicalService}
          label={t('words.service.title')}
          errors={[]}
          id={SelectId.APPOINTMENT_MEDICAL_SERVICE}
          defaultValue={form?.medicalService}
          selectScreenHeaderTitle={t('words.service.title')}
        />
      </View>
      {
        form?.medicalService?.id && (
          <AppointmentCalendarDatesForm
            vetId={vet.id}
            medicalServiceId={Number(form.medicalService.id)}
          />
        )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
});
