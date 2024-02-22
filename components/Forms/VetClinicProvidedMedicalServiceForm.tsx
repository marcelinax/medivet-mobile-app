import {
  CreateVetClinicProvidedMedicalService,
  UpdateVetClinicProvidedMedicalService,
  VetClinicProvidedMedicalService,
} from 'types/api/vetClinicProvidedMedicalService/types';
import {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { MoneyInput } from 'components/Inputs/MoneyInput';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';
import { setForceFetchingList } from 'store/list/listSlice';

interface Props {
  providedMedicalService?: VetClinicProvidedMedicalService;
  setLoading: (loading: boolean) => void;
}

interface FormProps {
  specialization?: SelectOptionProps;
  specializationMedicalService?: SelectOptionProps;
  price?: number;
  duration?: number;
}

export const VetClinicProvidedMedicalServiceForm = forwardRef<HandleSubmitForm, Props>((
  { providedMedicalService, setLoading },
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
  const navigation = useNavigation<NavigationProps>();
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const dispatch = useDispatch();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const [ firstRender, setFirstRender ] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { handleErrorAlert } = useErrorAlert();
  const parsedUserVetSpecializations = parseDataToSelectOptions(user?.specializations || [], 'name', 'id');
  const { t } = useTranslation();

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
      dispatch(setForceFetchingList(true));
    } catch (err: any) {
      const errs = getRequestErrors(err);
      handleErrorAlert(errs);
      setErrors([ ...errs ]);
    }
    setLoading(false);
  };

  return (
    <View>
      <View>
        <SelectInput
          onChoose={(specialization) => handleChangeInput('specialization', specialization)}
          variant="underline"
          options={parsedUserVetSpecializations}
          label={t('words.specialization.title')}
          errors={getInputErrors(errors, 'specializationId')}
          id={SelectId.VET_MEDICAL_SPECIALIZATION}
          defaultValue={form.specialization}
          selectScreenHeaderTitle={t('words.specialization.title')}
        />
      </View>
      {
        form?.specialization && (
          <View style={styles.inputMargin}>
            <SelectInput
              onChoose={(medicalService) => handleChangeInput('specializationMedicalService', medicalService)}
              variant="underline"
              fetchOptions={fetchVetSpecializationMedicalServices}
              label={t('words.service.title')}
              errors={getInputErrors(errors, 'specializationMedicalServiceId')}
              id={SelectId.VET_MEDICAL_SERVICE}
              defaultValue={form.specializationMedicalService}
              selectScreenHeaderTitle={t('words.service.title')}
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
          label={`${t('words.price.title')} (PLN)`}
        />
      </View>
      <View style={styles.inputMargin}>
        <NumberInput
          variant="underline"
          value={form?.duration?.toString()}
          onChangeText={(duration) => handleChangeInput('duration', duration)}
          errors={getInputErrors(errors, 'duration')}
          label={`${t('words.average_duration_time.title')} (min)`}
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
