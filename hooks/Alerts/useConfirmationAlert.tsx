import {
  createContext, useContext, useRef, useState,
} from 'react';
import { ConfirmationAlert } from 'components/Alerts/ConfirmationAlert';

interface ConfirmationAlertOptions {
  title?: string;
  message?: string;
}

interface ConfirmationAlertContextProviderProps {
  children: JSX.Element;
}

const ConfirmationAlertContext = createContext<(options: ConfirmationAlertOptions) => Promise<void>>(Promise.reject);

export const ConfirmationAlertContextProvider = ({ children }: ConfirmationAlertContextProviderProps) => {
  const [ confirmationState, setConfirmationState ] = useState<ConfirmationAlertOptions | undefined>(undefined);
  const resolver = useRef<Function>();

  const onOpen = (options: ConfirmationAlertOptions): Promise<void> => {
    setConfirmationState(options);
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const onClose = (): void => {
    setConfirmationState(undefined);
  };

  const onConfirm = (): void => {
    resolver.current && resolver.current(true);
    setConfirmationState(undefined);
  };

  return (
    <>
      <ConfirmationAlertContext.Provider
        value={onOpen}
        children={children}
      />
      <ConfirmationAlert
        show={!!confirmationState}
        onHide={onClose}
        onConfirm={onConfirm}
        title={confirmationState?.title}
        message={confirmationState?.message}
      />
    </>
  );
};

export const useConfirmationAlert = () => useContext(ConfirmationAlertContext);
