import {AppWrapper} from 'components/App/AppWrapper';
import {Provider} from 'react-redux';
import {store} from 'store/store';
import {ConfirmationAlertContextProvider} from "hooks/Alerts/useConfirmationAlert";

export default function App() {
    return (
        <Provider store={store}>
            <ConfirmationAlertContextProvider>
                <AppWrapper/>
            </ConfirmationAlertContextProvider>
        </Provider>
    );
}

