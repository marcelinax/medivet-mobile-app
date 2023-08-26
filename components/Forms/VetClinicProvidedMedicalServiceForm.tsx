import {
  CreateVetClinicProvidedMedicalService,
  UpdateVetClinicProvidedMedicalService,
  VetClinicProvidedMedicalService,
} from 'types/api/vetClinicProvidedMedicalService/types';
import {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import { getInputErrors } from 'api/error/services';
import { SelectId } from 'constants/enums/selectId.enum';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { ApiError } from 'types/api/error/types';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { removeSingleSelect, setSingleSelectSelectedOption } from 'store/select/selectSlice';
import { NumberInput } from 'components/Inputs/NumberInput';
import { commonTranslations } from 'constants/translations/common.translations';
import { useNavigation } from '@react-navigation/native';
import { CreateVetClinicProvidedMedicalServiceScreenNavigationProps } from 'types/Navigation/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { MoneyInput } from 'components/Inputs/MoneyInput';

interface Props {
  providedMedicalService?: VetClinicProvidedMedicalService;
}

interface FormProps {
  specialization?: SelectOptionProps;
  specializationMedicalService?: SelectOptionProps;
  price?: number;
  duration?: number;
}

export interface HandleSubmitVetClinicProvidedMedicalServiceForm {
  submit: () => void;
  loading: boolean;
}

export const VetClinicProvidedMedicalServiceForm = forwardRef<HandleSubmitVetClinicProvidedMedicalServiceForm, Props>((
  { providedMedicalService },
  ref,
) => {
  const [ form, setForm ] = useState<FormProps>({
    specialization: providedMedicalService?.medicalService?.specialization ? {
      id: providedMedicalService.medicalService.specialization.id.toString(),
      label: providedMedicalService.medicalService.specialization.name,
    } : undefined,
    specializationMedicalService: providedMedicalService?.medicalService ? {
      id: providedMedicalService.medicalService.id.toString(),
      label: providedMedicalService.medicalService.name,
    } : undefined,
    price: providedMedicalService?.price,
    duration: providedMedicalService?.duration,
  });
  const [ loading, setLoading ] = useState(false);
  const navigation = useNavigation<CreateVetClinicProvidedMedicalServiceScreenNavigationProps>();
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const dispatch = useDispatch();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const [ firstRender, setFirstRender ] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const parsedUserVetSpecializations = parseDataToSelectOptions(user?.specializations || [], 'name', 'id');

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => () => handleClearSelectInputs(), []);

  useEffect(() => {
    if (firstRender) return;
    if (form?.specializationMedicalService) {
      handleChangeInput('specializationMedicalService', undefined);
      dispatch(setSingleSelectSelectedOption({
        option: undefined,
        id: SelectId.VET_MEDICAL_SERVICE,
      }));
    }
  }, [ form?.specialization?.id ]);

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmitForm();
    },
    loading,
  }));

  const handleChangeInput = (field: string, value: string | SelectOptionProps | undefined | number): void => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleClearSelectInputs = () => {
    dispatch(removeSingleSelect(SelectId.VET_MEDICAL_SPECIALIZATION));
    dispatch(removeSingleSelect(SelectId.VET_MEDICAL_SERVICE));
  };

  const fetchVetSpecializationMedicalServices = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    params = {
      ...params,
      specializationIds: [ Number(form!.specialization!.id) ],
      include: 'specialization',
    };
    const res = await VetClinicProvidedMedicalServiceApi.getVetSpecializationMedicalServices(params);
    return parseDataToSelectOptions(res, 'name', 'id');
  };

  const getParsedFormData = (): CreateVetClinicProvidedMedicalService | UpdateVetClinicProvidedMedicalService => {
    if (!providedMedicalService) {
      return {
        price: form?.price?.toString() || '',
        duration: Number(form?.duration),
        specializationMedicalServiceId: Number(form.specializationMedicalService?.id),
        clinicId: clinic!.id,
      };
    }
    return {
      price: form?.price?.toString() || '',
      duration: Number(form?.duration),
    };
  };

  const handleSubmitForm = async () => {
    setLoading(true);
    try {
      if (providedMedicalService) {
        await VetClinicProvidedMedicalServiceApi.updateVetClinicProvidedMedicalService(providedMedicalService.id, getParsedFormData());
      } else {
        await VetClinicProvidedMedicalServiceApi.createVetClinicProvidedMedicalService(
          getParsedFormData() as CreateVetClinicProvidedMedicalService,
        );
      }
      navigation.navigate('Vet Clinic Provided Medical Services');
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      handleErrorAlert(errs);
      setErrors([ ...errs ]);
    }
    setLoading(false);
  };

  return (
    <View>
      {drawErrorAlert(errors)}
      <View>
        <SelectInput
          onChoose={(specialization) => handleChangeInput('specialization', specialization)}
          variant="underline"
          options={parsedUserVetSpecializations}
          label={inputsTranslations.SPECIALIZATION}
          errors={getInputErrors(errors, 'specializationId')}
          id={SelectId.VET_MEDICAL_SPECIALIZATION}
          defaultValue={form.specialization}
          selectScreenHeaderTitle={inputsTranslations.SPECIALIZATION}
        />
      </View>
      {
        form?.specialization && (
          <View style={styles.inputMargin}>
            <SelectInput
              onChoose={(medicalService) => handleChangeInput('specializationMedicalService', medicalService)}
              variant="underline"
              fetchOptions={fetchVetSpecializationMedicalServices}
              label={inputsTranslations.SERVICE}
              errors={getInputErrors(errors, 'specializationMedicalServiceId')}
              id={SelectId.VET_MEDICAL_SERVICE}
              defaultValue={form.specializationMedicalService}
              selectScreenHeaderTitle={inputsTranslations.SERVICE}
            />
          </View>
        )
      }
      <View style={styles.inputMargin}>
        <MoneyInput
          variant="underline"
          value={form?.price}
          onChangeText={(price) => handleChangeInput('price', price)}
          errors={getInputErrors(errors, 'price')}
          label={`${commonTranslations.PRICE} (PLN)`}
        />
      </View>
      <View style={styles.inputMargin}>
        <NumberInput
          variant="underline"
          value={form?.duration?.toString()}
          onChangeText={(duration) => handleChangeInput('duration', duration)}
          errors={getInputErrors(errors, 'duration')}
          label={`${commonTranslations.AVERAGE_DURATION_TIME} (min)`}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  inputMargin: {
    marginTop: 20,
  },
});
