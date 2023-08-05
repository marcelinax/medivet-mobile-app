import { AnimalApi } from 'api/animal/animal.api';
import { getInputErrors } from 'api/error/services';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { DatePicker } from 'components/Inputs/DatePicker';
import { TextInput } from 'components/Inputs/TextInput';
import { animalGenderSelectOptions, animalTypeSelectOptions } from 'constants/selectOptions';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Animal, CreateAnimal } from 'types/api/animal/types';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { AvatarInput } from 'components/Inputs/AvatarInput';
import { appendFileToFormData } from 'utils/appendFileToFormData';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setAnimalToUpdate } from 'store/animal/animalSlice';
import icons from 'themes/icons';
import { useNavigation } from '@react-navigation/native';
import { EditAnimalScreenNavigationProps } from 'types/Navigation/types';
import { commonTranslations } from 'constants/translations/common.translations';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { removeSingleSelect, setSingleSelectSelectedOption } from 'store/select/selectSlice';
import { SelectId } from 'constants/enums/selectId.enum';
import { ApiError } from 'types/api/error/types';

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

export const AnimalForm: FC<Props> = ({ animal }) => {
  const navigation = useNavigation<EditAnimalScreenNavigationProps>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();
  const [ firstRender, setFirstRender ] = useState<boolean>(true);
  const dispatch = useDispatch();
  const animalToUpdate = useSelector((state: RootState) => state.animal.animalToUpdate);
  const [ form, setForm ] = useState<FormProps>({
    name: animal?.name ?? '',
    type: animalTypeSelectOptions.find((type) => animal?.type === type.id),
    birthDate: animal?.birthDate ? new Date(animal.birthDate) : undefined,
    breed: animal?.breed ? {
      id: animal.breed.id.toString(),
      label: animal.breed.name,
    } : undefined,
    gender: animalGenderSelectOptions.find((gender) => animal?.gender === gender.id) || animalGenderSelectOptions[0],
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
        navigation.setOptions({
          headerTitle: `${commonTranslations.EDIT} "${res.name}"`,
        });
      } else {
        res = await AnimalApi.createAnimal(getParsedDataForm());
        // navigate to preview
      }
      handleSuccessAlert();
      handleSetAnimalToUpdate(res);
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
        handleSetAnimalToUpdate(res);
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
        handleSetAnimalToUpdate(res);
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

  const handleSetAnimalToUpdate = (newAnimal: Animal): void => {
    if (!animalToUpdate) dispatch(setAnimalToUpdate(newAnimal));
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
          label={inputsTranslations.SINGLE_NAME}
          onChangeText={(name) => onChangeInput('name', name)}
          variant="underline"
        />
      </View>
      <View style={styles.inputMargin}>
        <SelectInput
          onChoose={(type) => onChangeInput('type', type)}
          variant="underline"
          options={animalTypeSelectOptions}
          label={inputsTranslations.TYPE}
          errors={getInputErrors(errors, 'type')}
          id={SelectId.ANIMAL_TYPE}
          defaultValue={form.type}
          selectScreenHeaderTitle={inputsTranslations.TYPE}
        />
      </View>
      {
        form?.type && (
          <View style={styles.inputMargin}>
            <SelectInput
              onChoose={(breed) => onChangeInput('breed', breed)}
              variant="underline"
              fetchOptions={fetchAnimalBreeds}
              label={inputsTranslations.BREED}
              errors={getInputErrors(errors, 'breedId')}
              id={SelectId.ANIMAL_BREED}
              defaultValue={form?.breed}
              selectScreenHeaderTitle={inputsTranslations.BREED}
            />
          </View>
        )
      }
      <View style={styles.inputMargin}>
        <SelectInput
          onChoose={(gender) => onChangeInput('gender', gender)}
          variant="underline"
          label={inputsTranslations.GENDER}
          errors={[]}
          id={SelectId.ANIMAL_GENDER}
          options={animalGenderSelectOptions}
          defaultValue={form.gender}
          selectScreenHeaderTitle={inputsTranslations.GENDER}
        />
      </View>
      <View style={styles.inputMargin}>
        <SelectInput
          onChoose={(coatColor) => onChangeInput('coatColor', coatColor)}
          variant="underline"
          label={inputsTranslations.COAT_COLOR}
          errors={[]}
          id={SelectId.ANIMAL_COAT_COLOR}
          fetchOptions={fetchAnimalCoatColors}
          defaultValue={form.coatColor}
          selectScreenHeaderTitle={inputsTranslations.COAT_COLOR}
        />
      </View>
      <View style={styles.inputMargin}>
        <DatePicker
          value={form.birthDate ?? new Date()}
          errors={getInputErrors(errors, 'birthDate')}
          onConfirm={(date) => onChangeInput('birthDate', date)}
          shouldDisplayPlaceholder={!form.birthDate}
          placeholder={inputsTranslations.BIRTH_DATE}
        />
      </View>
      <LoadingButton
        variant="solid"
        title={buttonsTranslations.SAVE}
        loading={loading}
        style={styles.inputMargin}
        onPress={onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputMargin: {
    marginTop: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
});
