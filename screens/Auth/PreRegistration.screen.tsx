import { DefaultLayout } from 'layouts/Default.layout';
import { Button } from 'components/Buttons/Button';
import { StyleSheet, Text, View } from 'react-native';
import { commonTranslations } from 'constants/translations/common.translations';
import { useDispatch } from 'react-redux';
import { UserRoleType } from 'types/api/user/types';
import colors from 'themes/colors';
import { setUserRole } from 'store/user/userSlice';
import { useNavigation } from '@react-navigation/native';
import { PreRegistrationScreenNavigationProps } from 'types/Navigation/types';
import { otherTranslations } from 'constants/translations/other.translations';

export const PreRegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<PreRegistrationScreenNavigationProps>();

  const onChooseRole = (role: UserRoleType): void => {
    dispatch(setUserRole(role));
    navigation.navigate('Registration');
  };

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <Text style={styles.text}>
          {otherTranslations.CHOOSE_ROLE}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title={commonTranslations.PATIENT}
            variant="outline"
            onPress={() => onChooseRole('patient')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={commonTranslations.VET}
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
