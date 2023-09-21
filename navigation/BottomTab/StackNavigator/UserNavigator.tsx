import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList, UserScreenNavigationProps } from 'types/Navigation/types';
import routes from 'constants/routes';
import { UserProfileScreen } from 'screens/User/UserProfile.screen';
import { EditUserProfileScreen } from 'screens/User/EditUserProfile.screen';
import { EditUserAddressScreen } from 'screens/User/EditUserAddress.screen';
import colors from 'themes/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { hasVetRole } from 'utils/hasVetRole';
import { UserSpecializationsScreen } from 'screens/User/UserSpecializations.screen';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'components/Buttons/IconButton';
import icons from 'themes/icons';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { setCurrentUser } from 'store/user/userSlice';
import { getDefaultScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import { UserApi } from 'api/user/user.api';
import { MultiSelectId } from 'constants/enums/multiSelectId.enum';
import {
  fetchSingleMultiSelectOptions,
  handleChooseSingleMultiSelectSelectedOptions,
  initSingleMultiSelect,
  setSingleMultiSelectSelectedOptions,
} from 'store/multiSelect/multiSelectSlice';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { useTranslation } from 'react-i18next';

export const UserNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);
  const navigation = useNavigation<UserScreenNavigationProps>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchVetSpecializations = async (params?: Record<string, any>) => {
    const res = await UserApi.getVetSpecializations(params);
    return parseDataToSelectOptions(res, 'name', 'id');
  };

  const onNavigateToUserSpecializationsScreen = (): void => {
    const parsedUserVetSpecializations = parseDataToSelectOptions(user.specializations || [], 'name', 'id');
    dispatch(initSingleMultiSelect(MultiSelectId.VET_SPECIALIZATIONS));
    dispatch(fetchSingleMultiSelectOptions({
      fetch: (params) => fetchVetSpecializations(params),
      id: MultiSelectId.VET_SPECIALIZATIONS,
    }));
    dispatch(setSingleMultiSelectSelectedOptions({
      options: [ ...parsedUserVetSpecializations ],
      id: MultiSelectId.VET_SPECIALIZATIONS,
    }));
    dispatch(handleChooseSingleMultiSelectSelectedOptions({
      onChoose: onChangeUserSpecializations,
      id: MultiSelectId.VET_SPECIALIZATIONS,
    }));
    navigation.navigate('Multi Select', {
      title: t('words.specializations.title'),
      id: MultiSelectId.VET_SPECIALIZATIONS,
    });
  };

  const userSpecializationsScreenHeaderRight = () => (
    <IconButton
      icon={icons.PENCIL_OUTLINE}
      size="large"
      color={colors.PRIMARY}
      onPress={onNavigateToUserSpecializationsScreen}
    />
  );

  const userSpecializationsScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(t('navigation.user_specializations.title')),
    headerRight: () => userSpecializationsScreenHeaderRight(),
  };

  const onChangeUserSpecializations = async (specializations: SelectOptionProps[]): Promise<void> => {
    try {
      const specializationIds = specializations.map((specialization) => Number(specialization.id));
      const res = await UserApi.updateUserVetSpecializations(specializationIds);
      dispatch(setCurrentUser({
        ...user,
        specializations: [ ...(res.specializations || []) ],
      }));
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerBackTitle: '',
      headerTintColor: colors.BLACK,
    }}
    >
      <Stack.Screen
        name={routes.USER}
        component={UserProfileScreen}
        options={() => getDefaultScreenOptions(t('navigation.user_profile.title'))}
      />
      <Stack.Screen
        name={routes.EDIT_USER}
        component={EditUserProfileScreen}
        options={() => getDefaultScreenOptions(t('navigation.edit_user_profile.title'))}
      />
      <Stack.Screen
        name={routes.EDIT_USER_ADDRESS}
        component={EditUserAddressScreen}
        options={() => getDefaultScreenOptions(t('navigation.edit_address.title'))}
      />
      {
        isVet && (
          <Stack.Screen
            name={routes.USER_SPECIALIZATIONS}
            component={UserSpecializationsScreen}
            options={userSpecializationsScreenOptions}
          />
        )
      }
    </Stack.Navigator>
  );
};
