import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList, UserScreenNavigationProps } from 'types/Navigation/types';
import routes from 'constants/routes';
import { UserProfileScreen } from 'screens/User/UserProfile.screen';
import { EditUserProfileScreen } from 'screens/User/EditUserProfile.screen';
import { EditUserAddressScreen } from 'screens/User/EditUserAddress.screen';
import { navigationTranslations } from 'constants/translations/navigation.translations';
import colors from 'themes/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { hasVetRole } from 'utils/hasVetRole';
import { UserSpecializationsScreen } from 'screens/User/UserSpecializations.screen';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'components/Buttons/IconButton';
import icons from 'themes/icons';
import { fetchMultiSelectOptions, onChooseSelectedOptions, setSelectedOptions } from 'store/multiSelect/multiSelectSlice';
import { commonTranslations } from 'constants/translations/common.translations';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { setCurrentUser } from 'store/user/userSlice';
import { getDefaultScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import { UserApi } from 'api/user/user.api';

export const UserNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);
  const navigation = useNavigation<UserScreenNavigationProps>();
  const dispatch = useDispatch();

  const fetchVetSpecializations = async (params?: Record<string, any>) => UserApi.getVetSpecializations(params);

  const onNavigateToUserSpecializationsScreen = (): void => {
    const parsedUserVetSpecializations = parseDataToSelectOptions(user.specializations || [], 'name', 'id');
    dispatch(fetchMultiSelectOptions(fetchVetSpecializations));
    dispatch(setSelectedOptions(parsedUserVetSpecializations));
    dispatch(onChooseSelectedOptions(onChangeUserSpecializations));
    navigation.navigate('Multi Select', {
      title: commonTranslations.SPECIALIZATIONS,
    });
  };

  const userSpecializationsScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(navigationTranslations.USER_SPECIALIZATIONS),
    headerRight: () => (
      <IconButton
        icon={icons.PENCIL_OUTLINE}
        size="large"
        color={colors.PRIMARY}
        onPress={onNavigateToUserSpecializationsScreen}
      />
    ),
  };

  const onChangeUserSpecializations = async (specializations: SelectOptionProps[]): Promise<void> => {
    try {
      const specializationIds = specializations.map((specialization) => specialization.id.toString());
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
        options={() => getDefaultScreenOptions(navigationTranslations.USER_PROFILE)}
      />
      <Stack.Screen
        name={routes.EDIT_USER}
        component={EditUserProfileScreen}
        options={() => getDefaultScreenOptions(navigationTranslations.EDIT_USER_PROFILE)}
      />
      <Stack.Screen
        name={routes.EDIT_USER_ADDRESS}
        component={EditUserAddressScreen}
        options={() => getDefaultScreenOptions(navigationTranslations.EDIT_ADDRESS)}
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
