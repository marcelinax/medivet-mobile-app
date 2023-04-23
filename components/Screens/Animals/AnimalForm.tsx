import {AnimalApi} from "api/animal/animal.api";
import {getInputErrors, handleInputErrors, hasInternalError} from "api/error/services";
import {LoadingButton} from "components/Buttons/LoadingButton";
import {AvatarInput} from "components/Inputs/AvatarInput";
import {DatePicker} from "components/Inputs/DatePicker";
import {Select} from "components/Inputs/Select/Select";
import {TextInput} from "components/Inputs/TextInput";
import apiErrors from "constants/apiErrors";
import {animalGenderSelectOptions, animalTypeSelectOptions} from "constants/selectOptions";
import {buttonsTranslations} from "constants/translations/buttons.translations";
import {inputsTranslations} from "constants/translations/inputs.translations";
import {useErrorAlert} from "hooks/Modals/useErrorAlert";
import {FC, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Animal, CreateAnimal} from "types/api/animal/types";
import {FormError} from "types/api/error/types";
import {SelectOptionProps} from "types/components/Inputs/types";

interface Props {
    animal?: Animal;
}

export const AnimalForm: FC<Props> = ({animal}) => {
    const [errors, setErrors] = useState<FormError[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const {drawErrorAlert, handleErrorAlert} = useErrorAlert();
    const [form, setForm] = useState<CreateAnimal>({
        name: animal?.name ?? '',
        type: animal?.type ?? '',
        birthDate: animal?.birthDate ? new Date(animal.birthDate) : undefined,
        breedId: animal?.breed?.id,
        gender: animal?.gender ?? animalGenderSelectOptions[0].id,
        coatColorId: animal?.coatColor?.id,
    });

    useEffect(() => {
        if (form?.breedId) {
            onChangeInput('breedId', null);
        }
    }, [form.type]);

    const onChangeInput = (field: string, value: any): void => {
        setForm({
            ...form,
            [field]: value
        });
    };

    const onFetchAnimalBreeds = async (search?: string, params?: Record<string, any>): Promise<SelectOptionProps[]> => {
        params = {...params, animalType: form.type};
        const res = await AnimalApi.getAnimalBreeds(params);
        return res.map(x => ({
            id: x.id.toString(),
            label: x.name
        }));
    };

    const onFetchAnimaCoatColors = async (search?: string, params?: Record<string, any>): Promise<SelectOptionProps[]> => {
        const res = await AnimalApi.getAnimalCoatColors(params);
        return res.map(x => ({
            id: x.id.toString(),
            label: x.name
        }));
    };

    const onSubmit = async (): Promise<void> => {
        setLoading(true);
        console.log(form);
        try {
            setErrors([]);
            let res;
            if (animal?.id) {
            } else res = await AnimalApi.createAnimal(form);
        } catch (err: any) {
            const errs = [err?.response?.data];

            if (hasInternalError(errs)) handleErrorAlert();

            const nameErrors = handleInputErrors(errs, [
                apiErrors.NAME_SHOULD_NOT_BE_EMPTY
            ], 'name');

            const typeErrors = handleInputErrors(errs, [
                apiErrors.TYPE_SHOULD_NOT_BE_EMPTY
            ], 'type');

            const breedErrors = handleInputErrors(errs, [
                apiErrors.BREEDID_SHOULD_NOT_BE_EMPTY
            ], 'breedId');

            const birthDateErrors = handleInputErrors(errs, [
                apiErrors.BIRTHDATE_SHOULD_NOT_BE_EMPTY,
                apiErrors.BIRTH_DATE_CANNOT_BE_LATER_THAN_TODAY,
            ], 'birthDate');

            setErrors([birthDateErrors, nameErrors, typeErrors, breedErrors]);
        }
        setLoading(false);
    };

    return (
        <View>
            {drawErrorAlert()}
            {animal?.id && (
                <View style={styles.avatarContainer}>
                    <AvatarInput url={animal?.profilePhotoUrl} onChange={(e) => onChangeInput('profilePhotoUrl', e)}/>
                </View>
            )}
            <View>
                <TextInput errors={getInputErrors(errors, 'name')} value={form?.name}
                           label={inputsTranslations.SINGLE_NAME}
                           onChangeText={(name) => onChangeInput('name', name)} variant="underline"
                />
            </View>
            <View style={styles.inputMargin}>
                <Select errors={getInputErrors(errors, 'type')} value={form.type}
                        label={inputsTranslations.TYPE}
                        variant='underline' options={animalTypeSelectOptions}
                        onChange={(type) => onChangeInput('type', type)}/>
            </View>
            {
                form?.type && (
                    <View style={styles.inputMargin}>
                        <Select errors={getInputErrors(errors, 'breedId')} value={Number(form?.breedId)} variant='underline'
                                onFetchOptions={onFetchAnimalBreeds}
                                label={inputsTranslations.BREED}
                                onChange={(breed) => onChangeInput('breedId', +breed)}/>
                    </View>
                )
            }
            <View style={styles.inputMargin}>
                <Select errors={[]} value={form.gender}
                        label={inputsTranslations.GENDER}
                        variant='underline' options={animalGenderSelectOptions}
                        onChange={(gender) => onChangeInput('gender', gender)}/>
            </View>
            <View style={styles.inputMargin}>
                <Select errors={[]} value={Number(form?.coatColorId)} variant='underline'
                        onFetchOptions={onFetchAnimaCoatColors}
                        label={inputsTranslations.COAT_COLOR}
                        onChange={(coatColor) => onChangeInput('coatColorId', +coatColor)}/>
            </View>
            <View style={styles.inputMargin}>
                <DatePicker
                    value={form.birthDate ?? new Date()}
                    errors={getInputErrors(errors, 'birthDate')}
                    onCancel={() => {
                    }}
                    onConfirm={(date) => onChangeInput('birthDate', date)}
                    shouldDisplayPlaceholder={!form.birthDate}
                    placeholder={inputsTranslations.BIRTH_DATE}
                />
            </View>
            <LoadingButton variant='solid' title={buttonsTranslations.SAVE} loading={loading}
                           style={styles.inputMargin} onPress={onSubmit}/>
        </View>
    );
};

const styles = StyleSheet.create({
    inputMargin: {
        marginTop: 20
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 15
    },
});
