import { AnimalApi } from 'api/animal/animal.api';
import { getInputErrors } from 'api/error/services';
import { DatePicker } from 'components/Inputs/DatePicker';
import { TextInput } from 'components/Inputs/TextInput';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { Animal, CreateAnimal } from 'types/api/animal/types';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { AvatarInput } from 'components/Inputs/AvatarInput';
import { appendFileToFormData } from 'utils/appendFileToFormData';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useDispatch } from 'react-redux';
import icons from 'themes/icons';
import { useNavigation } from '@react-navigation/native';
import { EditAnimalScreenNavigationProps } from 'types/Navigation/types';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { removeSingleSelect, setSingleSelectSelectedOption } from 'store/select/selectSlice';
import { SelectId } from 'constants/enums/selectId.enum';
import { ApiError } from 'types/api/error/types';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { useTranslation } from 'react-i18next';
import { getAnimalGenderSelectOptions, getAnimalTypeSelectOptions } from 'constants/selectOptions';
import { setForceFetchingList } from 'store/list/listSlice';

interface Props {
  animal?: Animal;
}

interface FormProps {
  name: string;
  type?: SelectOptionProps;
  birthDate?: Date;
  breed?: SelectOptionProps;
  coatColor?: SelectOptionProps;
  gender?: SelectOptionProps;
  profilePhotoUrl?: string;
}

export const AnimalForm = forwardRef<HandleSubmitForm, Props>((
  { animal },
  ref,
) => {
  const navigation = useNavigation<EditAnimalScreenNavigationProps>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();
  const [ firstRender, setFirstRender ] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [ form, setForm ] = useState<FormProps>({
    name: animal?.name ?? '',
    type: getAnimalTypeSelectOptions(t).find((type) => animal?.type === type.id),
    birthDate: animal?.birthDate ? new Date(animal.birthDate) : undefined,
    breed: animal?.breed ? {
      id: animal.breed.id.toString(),
      label: animal.breed.name,
    } : undefined,
    gender: getAnimalGenderSelectOptions(t).find((gender) => animal?.gender === gender.id)
      || getAnimalGenderSelectOptions(t)[0],
    coatColor: animal?.coatColor ? {
      id: animal.coatColor.id.toString(),
      label: animal.coatColor.name,
    } : undefined,
    profilePhotoUrl: animal?.profilePhotoUrl,
  });

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => () => handleClearSelectInputs(), []);

  useImperativeHandle(ref, () => ({
    submit() {
      onSubmit();
    },
    loading,
  }));

  useEffect(() => {
    if (firstRender) return;
    if (form?.breed) {
      onChangeInput('breed', undefined);
      dispatch(setSingleSelectSelectedOption({
        option: undefined,
        id: SelectId.ANIMAL_BREED,
      }));
    }
  }, [ form.type?.id ]);

  const handleClearSelectInputs = () => {
    dispatch(removeSingleSelect(SelectId.ANIMAL_BREED));
    dispatch(removeSingleSelect(SelectId.ANIMAL_TYPE));
    dispatch(removeSingleSelect(SelectId.ANIMAL_GENDER));
    dispatch(removeSingleSelect(SelectId.ANIMAL_COAT_COLOR));
  };

  const onChangeInput = (field: string, value: any): void => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const fetchAnimalBreeds = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    params = {
      ...params,
      animalType: form.type?.id,
    };
    const res = await AnimalApi.getAnimalBreeds(params);
    return parseDataToSelectOptions(res, 'name', 'id');
  };

  const fetchAnimalCoatColors = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    const res = await AnimalApi.getAnimalCoatColors(params);
    return parseDataToSelectOptions(res, 'name', 'id');
  };

  const getParsedDataForm = (): CreateAnimal => ({
    profilePhotoUrl: form.profilePhotoUrl,
    breedId: Number(form.breed?.id),
    birthDate: form.birthDate,
    name: form.name,
    type: form.type?.id || '',
    gender: form.gender?.id || '',
    coatColorId: Number(form.coatColor?.id),
  });

  const onChangeBasicInformation = async () => {
    setLoading(true);
    try {
      setErrors([]);
      let res;

      if (animal?.id) {
        res = await AnimalApi.updateAnimal(Number(animal?.id), getParsedDataForm());
        dispatch(setForceFetchingList(true));
        navigation.setOptions({
          headerTitle: `${t('words.edition.title')} "${res.name}"`,
        });
      } else {
        res = await AnimalApi.createAnimal(getParsedDataForm());
        // TODO navigate to preview
      }
      handleSuccessAlert();
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
    setLoading(false);
  };

  const onChangeProfilePhoto = async (): Promise<void> => {
    if (form?.profilePhotoUrl !== animal?.profilePhotoUrl && form?.profilePhotoUrl) {
      setLoading(true);
      try {
        const formData = appendFileToFormData(form.profilePhotoUrl, 'animal-profile-image.jpg');
        const res = await AnimalApi.uploadNewAnimalProfilePhoto(Number(animal?.id), formData);
      } catch (err: any) {
        const errs = [ err?.response?.data ];
        handleErrorAlert(errs);
        setErrors([ ...errs ]);
      }
      setLoading(false);
    }
  };

  const onRemoveProfilePhoto = async (): Promise<void> => {
    if (!form?.profilePhotoUrl && animal?.profilePhotoUrl) {
      setLoading(true);
      try {
        const res = await AnimalApi.removeAnimalProfilePhoto(Number(animal?.id));
      } catch (err: any) {
        const errs = [ err?.response?.data ];
        handleErrorAlert(errs);
        setErrors([ ...errs ]);
      }
      setLoading(false);
    }
  };

  const onSubmit = async (): Promise<void> => {
    await onChangeBasicInformation();
    await onRemoveProfilePhoto();
    await onChangeProfilePhoto();
  };

  return (
    <View>
      {drawErrorAlert(errors)}
      {drawSuccessAlert()}
      {animal?.id && (
        <View style={styles.avatarContainer}>
          <AvatarInput
            onRemove={() => onChangeInput('profilePhotoUrl', '')}
            url={animal?.profilePhotoUrl}
            icon={icons.PAW_OUTLINE}
            onChange={(e) => onChangeInput('profilePhotoUrl', e)}
          />
        </View>
      )}
      <View>
        <TextInput
          errors={getInputErrors(errors, 'name')}
          value={form?.name}
          label={t('words.single_name.title')}
          onChangeText={(name) => onChangeInput('name', name)}
          variant="underline"
        />
      </View>
      <View style={styles.inputMargin}>
        <SelectInput
          onChoose={(type) => onChangeInput('type', type)}
          variant="underline"
          options={getAnimalTypeSelectOptions(t)}
          label={t('words.type.title')}
          errors={getInputErrors(errors, 'type')}
          id={SelectId.ANIMAL_TYPE}
          defaultValue={form.type}
          selectScreenHeaderTitle={t('words.type.title')}
        />
      </View>
      {
        form?.type && (
          <View style={styles.inputMargin}>
            <SelectInput
              onChoose={(breed) => onChangeInput('breed', breed)}
              variant="underline"
              fetchOptions={fetchAnimalBreeds}
              label={t('words.breed.title')}
              errors={getInputErrors(errors, 'breedId')}
              id={SelectId.ANIMAL_BREED}
              defaultValue={form?.breed}
              selectScreenHeaderTitle={t('words.breed.title')}
            />
          </View>
        )
      }
      <View style={styles.inputMargin}>
        <SelectInput
          onChoose={(gender) => onChangeInput('gender', gender)}
          variant="underline"
          label={t('words.gender.title')}
          errors={[]}
          id={SelectId.ANIMAL_GENDER}
          options={getAnimalGenderSelectOptions(t)}
          defaultValue={form.gender}
          selectScreenHeaderTitle={t('words.gender.title')}
        />
      </View>
      <View style={styles.inputMargin}>
        <SelectInput
          onChoose={(coatColor) => onChangeInput('coatColor', coatColor)}
          variant="underline"
          label={t('words.coat_color.title')}
          errors={[]}
          id={SelectId.ANIMAL_COAT_COLOR}
          fetchOptions={fetchAnimalCoatColors}
          defaultValue={form.coatColor}
          selectScreenHeaderTitle={t('words.coat_color.title')}
        />
      </View>
      <View style={styles.inputMargin}>
        <DatePicker
          value={form.birthDate ?? new Date()}
          errors={getInputErrors(errors, 'birthDate')}
          onConfirm={(date) => onChangeInput('birthDate', date)}
          shouldDisplayPlaceholder={!form.birthDate}
          placeholder={t('words.birth_date.title')}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  inputMargin: {
    marginTop: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
});
