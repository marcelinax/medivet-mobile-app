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
import { AnimalsNavigator } from 'navigation/BottomTab/StackNavigator/AnimalsNavigator';
import { UserNavigator } from 'navigation/BottomTab/StackNavigator/UserNavigator';
import { HomeNavigator } from 'navigation/BottomTab/StackNavigator/HomeNavigator';
import { ClinicsNavigator } from 'navigation/BottomTab/StackNavigator/ClinicsNavigator';
import { ChatNavigator } from 'navigation/BottomTab/StackNavigator/ChatNavigator';

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
      <Tab.Screen
        name={routes.APPOINTMENTS_NAVIGATOR}
        component={AppointmentsNavigator}
        options={{
          tabBarIcon: ({ focused }) => getTabIcon(focused, icons.CALENDAR_OUTLINE),
        }}
      />
      <Tab.Screen
        name={routes.USER_NAVIGATOR}
        component={UserNavigator}
        options={{
          tabBarIcon: ({ focused }) => getTabIcon(focused, icons.PERSON_OUTLINE),
        }}
      />
      <Tab.Screen
        name={routes.CHAT_NAVIGATOR}
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ focused }) => getTabIcon(focused, icons.CHATBUBBLE_OUTLINE),
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
