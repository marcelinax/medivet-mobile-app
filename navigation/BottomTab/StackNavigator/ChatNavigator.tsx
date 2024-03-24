import { getDefaultScreenOptions, navigatorScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import routes from 'constants/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Navigation/types';
import { useTranslation } from 'react-i18next';
import { ChatScreen } from 'screens/Chat/Chat.screen';
import { ChatPreviewScreen } from 'screens/Chat/ChatPreview.screen';

export const ChatNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={navigatorScreenOptions}>
      <Stack.Screen
        name={routes.CHAT}
        component={ChatScreen}
        options={() => getDefaultScreenOptions(t('navigation.chat.title'))}
      />
      <Stack.Screen
        name={routes.CHAT_PREVIEW}
        component={ChatPreviewScreen}
      />
    </Stack.Navigator>
  );
};
