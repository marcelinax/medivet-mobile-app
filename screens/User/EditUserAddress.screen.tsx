import { hasInternalError } from "api/error/services";
import { UserApi } from "api/user/user.api";
import { LoadingButton } from "components/Buttons/LoadingButton";
import { NumberInput } from "components/Inputs/NumberInput";
import { TextInput } from "components/Inputs/TextInput";
import { ZipCodeInput } from "components/Inputs/ZipCodeInput";
import { successAlertTranslations } from "constants/translations/alerts/successAlert.translations";
import { buttonsTranslations } from "constants/translations/buttons.translations";
import { inputsTranslations } from "constants/translations/inputs.translations";
import { useErrorAlert } from "hooks/Modals/useErrorAlert";
import { useSuccessAlert } from "hooks/Modals/useSuccessAlert";
import { DefaultLayout } from "layouts/Default.layout";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { setCurrentUser } from "store/user/userSlice";
import { AddressApi } from "types/api/types";
import { User } from "types/api/user/types";

export const EditUserAddressScreen = () => {
    const user = useSelector((state: RootState) => state.user.currentUser) as User;
    const [form, setForm] = useState<AddressApi | undefined>(user?.address);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
    const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();

    const onChange = (field: string, value: string | number): void => {
        setForm({
            ...form,
            [field]: value
        });
    };

    const onSubmit = async (): Promise<void> => {
        setLoading(true);
        try {
            const res = await UserApi.updateUser({
                ...user,
                address: { ...form }
            });
            dispatch(setCurrentUser(res));
            handleSuccessAlert();
        }
        catch (err: any) {
            const errs = [err?.response?.data];

            if (hasInternalError(errs)) handleErrorAlert();
        }
        setLoading(false);
    };


    return (
        <DefaultLayout>
            <View>
                {drawErrorAlert()}
                {drawSuccessAlert(successAlertTranslations.SAVED)}
                <View style={styles.inputMargin}>
                    <TextInput onChangeText={(e) => onChange('street', e)} label={inputsTranslations.STREET}
                        value={form?.street} errors={[]} variant="underline" isClearable />
                </View>
                <View style={styles.inputMargin}>
                    <NumberInput onChangeText={(e) => onChange('buildingNumber', e)} label={inputsTranslations.BUILDING_NUMBER}
                        value={form?.buildingNumber} errors={[]} variant="underline" isClearable />
                </View>
                <View style={styles.inputMargin}>
                    <NumberInput onChangeText={(e) => onChange('flatNumber', e)} label={inputsTranslations.FLAT_NUMBER}
                        value={form?.flatNumber} errors={[]} variant="underline" isClearable />
                </View>
                <View style={styles.inputMargin}>
                    <TextInput onChangeText={(e) => onChange('city', e)} label={inputsTranslations.CITY}
                        value={form?.city} errors={[]} variant="underline" isClearable />
                </View>
                <View style={styles.inputMargin}>
                    <ZipCodeInput onChangeText={(e) => onChange('zipCode', e)} label={inputsTranslations.ZIP_CODE}
                        value={form?.zipCode} errors={[]} variant="underline" isClearable />
                </View>
                <LoadingButton variant='solid' title={buttonsTranslations.SAVE} loading={loading}
                    style={styles.inputMargin} onPress={onSubmit} />
            </View>
        </DefaultLayout>
    );
};

const styles = StyleSheet.create({
    inputMargin: {
        marginTop: 30
    }
});