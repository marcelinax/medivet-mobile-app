import { StyleSheet, View } from 'react-native';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { SelectId } from 'constants/enums/selectId.enum';
import {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { UserApi } from 'api/user/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilters } from 'store/home/homeSlice';
import { RootState } from 'store/store';
import { useTranslation } from 'react-i18next';
import { ClinicApi } from 'api/clinic/clinic.api';

interface FormProps {
  specialization?: SelectOptionProps;
  city?: SelectOptionProps;
}

export interface HandleSearchVets {
  onSearch: () => void;
}

interface Props {
  setIsButtonDisabled: (value: boolean) => void;
  isButtonDisabled: boolean;
}

export const SearchVetsForm = forwardRef<HandleSearchVets, Props>((
  { setIsButtonDisabled, isButtonDisabled },
  ref,
) => {
  const filters = useSelector((state: RootState) => state.home.selectedFilters);
  const [ form, setForm ] = useState<FormProps>({
    city: filters?.city,
    specialization: filters?.specialization,
  });
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    onSearch: handleSearch,
  }));

  useEffect(() => {
    if (!isButtonDisabled && (!form.city || !form.specialization)) {
      setIsButtonDisabled(true);
      return;
    }
    if (isButtonDisabled && form.city && form.specialization) {
      setIsButtonDisabled(false);
    }
  }, [ JSON.stringify(form) ]);

  const handleSearch = () => {
    dispatch(setSelectedFilters({
      city: form.city,
      specialization: form.specialization,
    }));
    navigation.navigate('Vets');
  };

  const handleChangeInput = (field: string, value: SelectOptionProps | string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const fetchSpecializations = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    const res = await UserApi.getVetSpecializations(params);
    return parseDataToSelectOptions(res, 'name', 'id');
  };

  const fetchCities = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    const res = await ClinicApi.getCities(params);
    return res.map((item) => ({
      id: item,
      label: item,
    }));
  };

  return (
    <View>
      <View style={styles.inputMargin}>
        <SelectInput
          id={SelectId.SEARCH_VET_MEDICAL_SPECIALIZATION}
          variant="outline"
          errors={[]}
          onChoose={(specialization) => handleChangeInput('specialization', specialization)}
          label={t('words.specialization.title')}
          fetchOptions={fetchSpecializations}
          defaultValue={form?.specialization}
        />
      </View>
      <View>
        <SelectInput
          id={SelectId.CITY}
          variant="outline"
          errors={[]}
          onChoose={(city) => handleChangeInput('city', city)}
          label={t('words.city.title')}
          fetchOptions={fetchCities}
          defaultValue={form?.city}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  inputMargin: {
    marginBottom: 20,
  },
});
