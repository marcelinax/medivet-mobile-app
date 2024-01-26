import { AppWrapper } from 'components/App/AppWrapper';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ConfirmationAlertContextProvider } from 'hooks/Alerts/useConfirmationAlert';
import { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SwipeButtonContext } from 'contexts/buttons/SwipeButtonContext';
import './i18n.ts';
import { Platform, UIManager } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import colors from 'themes/colors';

export default function App() {
  const currentSwipeButton = useRef<Swipeable | null>(null);

  if (
    Platform.OS === 'android'
    && UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <Provider store={store}>
      <ToastProvider
        placement="top"
        style={{
          width: '100%',
        }}
        dangerColor={colors.DANGER}
        warningColor={colors.WARNING}
        successColor={colors.SUCCESS}
        swipeEnabled
      >
        <ConfirmationAlertContextProvider>
          <SwipeButtonContext.Provider value={{
            currentSwipeButton,
            setCurrentSwipeButton: (swipeButton) => currentSwipeButton.current = swipeButton,
          }}
          >
            <AppWrapper />
          </SwipeButtonContext.Provider>
        </ConfirmationAlertContextProvider>
      </ToastProvider>
    </Provider>
  );
}

