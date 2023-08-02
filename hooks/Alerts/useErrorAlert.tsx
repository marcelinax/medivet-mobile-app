import { ErrorAlert } from 'components/Alerts/ErrorAlert';
import { useState } from 'react';
import { ApiError } from 'types/api/error/types';
import { getAlertError, getErrorMessage } from 'api/error/services';

export const useErrorAlert = () => {
  const [ show, setShow ] = useState<boolean>(false);

  const drawErrorAlert = (errors: ApiError[], title?: string, message?: string): JSX.Element => {
    const alertError = getAlertError(errors);
    const alertErrorMessage = alertError ? getErrorMessage([ alertError ]) : '';
    const finalTitle = title || alertErrorMessage || '';

    return (
      <ErrorAlert
        isShown={show}
        onHide={() => setShow(false)}
        title={finalTitle}
        message={message}
      />
    );
  };

  const handleErrorAlert = (errors: ApiError[], force?: boolean) => {
    const alertError = getAlertError(errors);
    if ((alertError || force) && !show) {
      setShow(true);
    }
  };

  return {
    drawErrorAlert,
    handleErrorAlert,
  };
};
