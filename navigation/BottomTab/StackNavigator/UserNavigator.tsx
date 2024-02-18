import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationProps, RootStackParamList } from 'types/Navigation/types';
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
import { UserOpinionsScreen } from 'screens/User/Opinions/UserOpinions.screen';
import { UserOpinionScreen } from 'screens/User/Opinions/UserOpinion.screen';
import { FavouriteVetsScreen } from 'screens/User/FavouriteVets.screen';
import { UserVacationsScreen } from 'screens/User/Vacations/UserVacations.screen';
import { CreateUserVacationScreen } from 'screens/User/Vacations/CreateUserVacation.screen';
import { UpdateUserVacationScreen } from 'screens/User/Vacations/UpdateUserVacation.screen';

export const UserNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);
  const navigation = useNavigation<NavigationProps>();
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
      {
        isVet && (
          <>
            <Stack.Screen
              name={routes.USER_OPINIONS}
              component={UserOpinionsScreen}
              options={() => getDefaultScreenOptions(t('navigation.user_opinions.title'))}
            />
            <Stack.Screen
              name={routes.USER_OPINION}
              component={UserOpinionScreen}
              options={() => getDefaultScreenOptions(t('navigation.user_opinion.title'))}
            />
            <Stack.Screen
              name={routes.USER_VACATIONS}
              component={UserVacationsScreen}
              options={() => getDefaultScreenOptions(t('navigation.user_vacations.title'))}
            />
            <Stack.Screen
              name={routes.CREATE_USER_VACATION}
              component={CreateUserVacationScreen}
              options={() => getDefaultScreenOptions(t('navigation.new_user_vacation.title'))}
            />
            <Stack.Screen
              name={routes.UPDATE_USER_VACATION}
              component={UpdateUserVacationScreen}
              options={() => getDefaultScreenOptions(t('navigation.update_user_vacation.title'))}
            />
          </>
        )
      }
      {!isVet && (
        <Stack.Screen
          name={routes.USER_FAVOURITE_VETS}
          component={FavouriteVetsScreen}
          options={() => getDefaultScreenOptions(t('navigation.favourite_vets.title'))}
        />
      )}
    </Stack.Navigator>
  );
};
