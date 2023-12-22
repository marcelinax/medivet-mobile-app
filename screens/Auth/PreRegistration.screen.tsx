import { DefaultLayout } from 'layouts/Default.layout';
import { Button } from 'components/Buttons/Button';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { UserRoleType } from 'types/api/user/types';
import colors from 'themes/colors';
import { setUserRole } from 'store/user/userSlice';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useTranslation } from 'react-i18next';

export const PreRegistrationScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  const onChooseRole = (role: UserRoleType): void => {
    dispatch(setUserRole(role));
    navigation.navigate('Registration');
  };

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <Text style={styles.text}>
          {t('actions.choose_role.title')}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title={t('enums.user.role.PATIENT.title')}
            variant="outline"
            onPress={() => onChooseRole('patient')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={t('enums.user.role.VET.title')}
            variant="solid"
            onPress={() => onChooseRole('vet')}
          />
        </View>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: colors.PRIMARY,
  },
});
