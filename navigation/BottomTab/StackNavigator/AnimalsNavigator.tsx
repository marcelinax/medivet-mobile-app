import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationProps, RootStackParamList } from 'types/Navigation/types';
import routes from 'constants/routes';
import { UserAnimalsScreen } from 'screens/Animals/UserAnimals.screen';
import { EditAnimalScreen } from 'screens/Animals/EditAnimal.screen';
import { IconButton } from 'components/Buttons/IconButton';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { useNavigation } from '@react-navigation/native';
import { CreateAnimalScreen } from 'screens/Animals/CreateAnimal.screen';
import { useTranslation } from 'react-i18next';
import { getDefaultScreenOptions, navigatorScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import { AnimalScreen } from 'screens/Animals/Animal.screen';
import { AnimalAppointmentDiaryScreen } from 'screens/Animals/AnimalAppointmentDiary.screen';
import { AppointmentDiariesScreen } from 'screens/AppointmentDiaries/AppointmentDiaries.screen';

export const AnimalsNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation();

  const onNavigateToCreateAnimalScreen = (): void => {
    navigation.navigate('Create Animal');
  };

  const animalsScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(t('navigation.user_animals.title')),
    headerRight: () => (
      <IconButton
        icon={icons.ADD_OUTLINE}
        size="large"
        color={colors.PRIMARY}
        onPress={onNavigateToCreateAnimalScreen}
      />
    ),
  };

  return (
    <Stack.Navigator screenOptions={navigatorScreenOptions}>
      <Stack.Screen
        name={routes.USER_ANIMALS}
        component={UserAnimalsScreen}
        options={animalsScreenOptions}
      />
      <Stack.Screen
        name={routes.EDIT_ANIMAL}
        component={EditAnimalScreen}
      />
      <Stack.Screen
        name={routes.CREATE_ANIMAL}
        component={CreateAnimalScreen}
        options={() => getDefaultScreenOptions(t('navigation.new_animal.title'))}
      />
      <Stack.Screen
        name={routes.ANIMAL}
        component={AnimalScreen}
        options={() => getDefaultScreenOptions('')}
      />
      <Stack.Screen
        name={routes.APPOINTMENT_DIARY}
        component={AnimalAppointmentDiaryScreen}
        options={() => getDefaultScreenOptions(t('navigation.appointment_diary.title'))}
      />
      <Stack.Screen
        name={routes.APPOINTMENT_DIARIES}
        component={AppointmentDiariesScreen}
        options={() => getDefaultScreenOptions(t('navigation.appointment_diaries.title'))}
      />
    </Stack.Navigator>
  );
};
