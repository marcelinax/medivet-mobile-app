import { UserApi } from 'api/user/user.api';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { NumberInput } from 'components/Inputs/NumberInput';
import { TextInput } from 'components/Inputs/TextInput';
import { ZipCodeInput } from 'components/Inputs/ZipCodeInput';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { DefaultLayout } from 'layouts/Default.layout';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setCurrentUser } from 'store/user/userSlice';
import { AddressApi } from 'types/api/types';
import { User } from 'types/api/user/types';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';

export const EditUserAddressScreen = () => {
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const [ form, setForm ] = useState<AddressApi | undefined>(user?.address);
  const [ loading, setLoading ] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { handleErrorAlert } = useErrorAlert();
  const { handleSuccessAlert } = useSuccessAlert();
  const { t } = useTranslation();

  const onChange = (field: string, value: string | number): void => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await UserApi.updateUser({
        ...user,
        address: { ...form },
      });
      dispatch(setCurrentUser(res));
      handleSuccessAlert(t('alerts.success.save.title'));
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setLoading(false);
  };

  return (
    <DefaultLayout stickyFooterChildren={(
      <LoadingButton
        title={t('actions.save.title')}
        variant="solid"
        loading={loading}
        onPress={onSubmit}
      />
    )}
    >
      <View>
        <View style={styles.inputMargin}>
          <TextInput
            onChangeText={(e) => onChange('street', e)}
            label={t('words.street.title')}
            value={form?.street}
            errors={[]}
            variant="underline"
            isClearable
          />
        </View>
        <View style={styles.inputMargin}>
          <NumberInput
            onChangeText={(e) => onChange('buildingNumber', e)}
            label={t('words.building_number.title')}
            value={form?.buildingNumber}
            errors={[]}
            variant="underline"
            isClearable
          />
        </View>
        <View style={styles.inputMargin}>
          <NumberInput
            onChangeText={(e) => onChange('flatNumber', e)}
            label={t('words.flat_number.title')}
            value={form?.flatNumber}
            errors={[]}
            variant="underline"
            isClearable
          />
        </View>
        <View style={styles.inputMargin}>
          <TextInput
            onChangeText={(e) => onChange('city', e)}
            label={t('words.city.title')}
            value={form?.city}
            errors={[]}
            variant="underline"
            isClearable
          />
        </View>
        <View style={styles.inputMargin}>
          <ZipCodeInput
            onChangeText={(e) => onChange('zipCode', e)}
            label={t('words.zip_code.title')}
            value={form?.zipCode}
            errors={[]}
            variant="underline"
            isClearable
          />
        </View>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  inputMargin: {
    marginTop: 30,
  },
});
