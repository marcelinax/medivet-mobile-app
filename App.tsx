import { AppWrapper } from 'components/App/AppWrapper';
import { Provider } from 'react-redux';
import { store } from 'store/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

