import { AppWrapper } from 'components/App/AppWrapper';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ConfirmationAlertContextProvider } from 'hooks/Alerts/useConfirmationAlert';
import { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SwipeButtonContext } from 'contexts/buttons/SwipeButtonContext';
import './i18n.ts';
import { Platform, UIManager } from 'react-native';

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
      <ConfirmationAlertContextProvider>
        <SwipeButtonContext.Provider value={{
          currentSwipeButton,
          setCurrentSwipeButton: (swipeButton) => currentSwipeButton.current = swipeButton,
        }}
        >
          <AppWrapper />
        </SwipeButtonContext.Provider>
      </ConfirmationAlertContextProvider>
    </Provider>
  );
}

