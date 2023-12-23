import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from 'constants/routes';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { hasVetRole } from 'utils/hasVetRole';
import { AppointmentsNavigator } from 'navigation/BottomTab/StackNavigator/AppointmentsNavigator';
import { AnimalsNavigator } from './StackNavigator/AnimalsNavigator';
import { UserNavigator } from './StackNavigator/UserNavigator';
import { HomeNavigator } from './StackNavigator/HomeNavigator';
import { ClinicsNavigator } from './StackNavigator/ClinicsNavigator';

export const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);

  const getTabIcon = (focused: boolean, name: any) => (
    <Ionicons
      name={name}
      size={focused ? 28 : 24}
      color={focused ? colors.PRIMARY : colors.GRAY}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName={routes.HOME_NAVIGATOR}
    >
      <Tab.Screen
        name={routes.HOME_NAVIGATOR}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => getTabIcon(focused, icons.HOME_OUTLINE),
        }}
      />
      {!isVet && (
        <Tab.Screen
          name={routes.APPOINTMENTS_NAVIGATOR}
          component={AppointmentsNavigator}
          options={{
            tabBarIcon: ({ focused }) => getTabIcon(focused, icons.CALENDAR_OUTLINE),
          }}
        />
      )}
      <Tab.Screen
        name={routes.USER_NAVIGATOR}
        component={UserNavigator}
        options={{
          tabBarIcon: ({ focused }) => getTabIcon(focused, icons.PERSON_OUTLINE),
        }}
      />
      {
        !isVet && (
          <Tab.Screen
            name={routes.ANIMALS_NAVIGATOR}
            component={AnimalsNavigator}
            options={{
              tabBarIcon: ({ focused }) => getTabIcon(focused, icons.PAW_OUTLINE),
            }}
          />
        )
      }
      {
        isVet && (
          <Tab.Screen
            name={routes.CLINICS_NAVIGATOR}
            component={ClinicsNavigator}
            options={{
              tabBarIcon: ({ focused }) => getTabIcon(focused, icons.FITNESS_OUTLINE),
            }}
          />
        )
      }

    </Tab.Navigator>
  );
};
