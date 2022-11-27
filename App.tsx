import { Navigator } from 'navigation/Navigator';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { isAndroidPlatfrom } from 'utils/isAndroidPlatfrom';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          networkActivityIndicatorVisible
          barStyle={`${isAndroidPlatfrom() ? 'default' : 'dark-content'}`}
        />
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
}

