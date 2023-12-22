import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WideButton } from 'components/Buttons/WideButton';
import { Avatar } from 'components/Composition/Avatar';
import { DefaultLayout } from 'layouts/Default.layout';
import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { User } from 'types/api/user/types';
import { NavigationProps } from 'types/Navigation/types';
import * as SecureStore from 'expo-secure-store';
import { removeToken } from 'store/auth/authSlice';
import { hasVetRole } from 'utils/hasVetRole';
import { useTranslation } from 'react-i18next';
import { clearSelectedFilters } from 'store/home/homeSlice';

export const UserProfileScreen = () => {
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const isVet = hasVetRole(user);
  const { t } = useTranslation();

  const onEditUserDetails = (): void => {
    navigation.navigate('Edit User');
  };

  const onLogout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync('token');
    dispatch(clearSelectedFilters());
    dispatch(removeToken());
  };

  return (
    <DefaultLayout>
      <View>
        <TouchableWithoutFeedback onPress={onEditUserDetails}>
          <View style={styles.avatarContainer}>
            <Avatar
              size="medium"
              url={user?.profilePhotoUrl}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
            <Ionicons
              size={25}
              name={icons.CHEVRON_FORWARD_OUTLINE}
              style={styles.avatarContainerIcon}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.wideButtonsContainer}>
          {!isVet && (
            <WideButton
              onPress={() => navigation.navigate('Edit User Address')}
              title={t('words.address.title')}
              icon={icons.HOME_OUTLINE}
            />
          )}
          {isVet && (
            <WideButton
              onPress={() => navigation.navigate('User Specializations')}
              title={t('words.specializations.title')}
              icon={icons.MEDKIT_OUTLINE}
            />
          )}
          <WideButton
            onPress={onLogout}
            title={t('actions.logout.title')}
            icon={icons.LOG_OUT_OUTLINE}
          />
        </View>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
    color: colors.GRAY_DARK,
  },
  avatarContainerIcon: {
    marginLeft: 'auto',
  },
  wideButtonsContainer: {
    marginTop: 30,
  },
});
