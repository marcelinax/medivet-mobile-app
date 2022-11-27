import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { LoginScreen } from 'screens/Login.screen';
import { store } from 'store/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <LoginScreen />
      </SafeAreaView>
    </Provider>
  );
}

