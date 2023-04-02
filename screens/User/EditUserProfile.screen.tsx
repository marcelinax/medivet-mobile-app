import { getInputErrors, handleInputErrors, hasInternalError } from "api/errors/services";
import { UserApi } from "api/user/user.api";
import { LoadingButton } from "components/Buttons/LoadingButton";
import { AvatarInput } from "components/Inputs/AvatarInput";
import { DatePicker } from 'components/Inputs/DatePicker';
import { PhoneNumberInput } from "components/Inputs/PhoneNumberInput";
import { Select } from "components/Inputs/Select/Select";
import { TextInput } from "components/Inputs/TextInput";
import apiErrors from "constants/apiErrors";
import { genderSelectOptions } from "constants/selectOptions";
import { successAlertTranslations } from "constants/translations/alerts/successAlert.translations";
import { buttonsTranslations } from "constants/translations/buttons.translations";
import { inputsTranslations } from 'constants/translations/inputs.translations';
import { useErrorAlert } from "hooks/Modals/useErrorAlert";
import { useSuccessAlert } from "hooks/Modals/useSuccessAlert";
import { DefaultLayout } from "layouts/Default.layout";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setCurrentUser } from "store/user/userSlice";
import { FormError } from "types/api/errors/types";
import { User } from "types/api/user/types";
import { appendFileToFormData } from "utils/appendFileToFormData";

export const EditUserProfileScreen = () => {
    const user = useSelector((state: RootState) => state.user.currentUser) as User;
    const [form, setForm] = useState<User>(user);
    const [errors, setErrors] = useState<FormError[]>([]);
    const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
    const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onChangeInput = (field: string, newValue: any): void => {
        setForm({
            ...form,
            [field]: newValue
        });
    };

    const onDatePickerConfirm = (e: any): void => {
        onChangeInput('birthDate', e);
    };

    const onChangeBasicInformation = async (): Promise<void> => {
        setLoading(true);
        try {
            setErrors([]);;
            if (!form.address) delete form.address;
            const res = await UserApi.updateUser(form);
            dispatch(setCurrentUser(res));
        }
        catch (err: any) {
            const errs = [err?.response?.data];

            if (hasInternalError(errs)) handleErrorAlert();

            const birthDateErrors = handleInputErrors(errs, [
                apiErrors.BIRTHDATE_MUST_BE_A_DATE_INSTANCE,
                apiErrors.BIRTHDATE_SHOULD_NOT_BE_EMPTY,
                apiErrors.BIRTH_DATE_CANNOT_BE_LATER_THAN_TODAY,
                apiErrors.USER_HAS_TO_BE_AT_LEAST_18_YEARS_OF_AGE,
            ], 'birthDate');

            const phoneNumberErrors = handleInputErrors(errs, [
                apiErrors.PHONENUMBER_MUST_BE_A_VALID_PHONE_NUMBER,
            ], 'phoneNumber');

            setErrors([birthDateErrors, phoneNumberErrors]);
        }
        setLoading(false);
    };

    const onSubmit = async (): Promise<void> => {
        await onChangeBasicInformation();
        await onChangeProfilePhoto();
        handleSuccessAlert();
    };

    const onChangeProfilePhoto = async (): Promise<void> => {
        if (form?.profilePhotoUrl) {
            setLoading(true);
            try {
                const formData = appendFileToFormData(form.profilePhotoUrl, 'profile-user-image.jpg');
                const res = await UserApi.uploadNewUserProfilePhoto(formData);
                dispatch(setCurrentUser(res));
            }
            catch (err: any) {
                const errs = [err?.response?.data];

                if (hasInternalError(errs)) handleErrorAlert();
            }
            setLoading(false);
        }
    };

    return (
        <DefaultLayout>
            <View>
                {drawErrorAlert()}
                {drawSuccessAlert(successAlertTranslations.SAVED)}
                <View style={styles.avatarContainer}>
                    <AvatarInput url={user?.profilePhotoUrl} onChange={(e) => onChangeInput('profilePhotoUrl', e)} />
                </View>
                <View>
                    <TextInput value={user.name} variant='underline' isClearable={false}
                        label={inputsTranslations.NAME} onChangeText={(e) => onChangeInput('name', e)} errors={[]} />
                    <View style={styles.inputMargin}>
                        <DatePicker
                            value={new Date(form.birthDate)}
                            errors={getInputErrors(errors, 'birthDate')}
                            onCancel={() => { }}
                            onConfirm={onDatePickerConfirm}
                            label={inputsTranslations.BIRTH_DATE}
                        />
                    </View>
                    <View style={styles.inputMargin}>
                        <Select errors={[]} value={form.gender} variant='underline'
                            label={inputsTranslations.GENDER}
                            options={genderSelectOptions}
                            onChange={(gender) => onChangeInput('gender', gender)} />
                    </View>
                    <View style={styles.inputMargin}>
                        <PhoneNumberInput variant="underline" errors={getInputErrors(errors, 'phoneNumber')}
                            value={form?.phoneNumber} onChangeText={(e) => onChangeInput('phoneNumber', e)} />
                    </View>
                </View>
                <LoadingButton variant='solid' title={buttonsTranslations.SAVE} loading={loading}
                    style={styles.inputMargin} onPress={onSubmit} />
            </View>
        </DefaultLayout>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 15
    },
    inputMargin: {
        marginTop: 20
    }
});