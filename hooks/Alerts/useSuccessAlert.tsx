import { SuccessAlert } from 'components/Alerts/SuccessAlert';
import { useState } from 'react';

export const useSuccessAlert = (additionalHideAction?: () => void) => {
  const [ show, setShow ] = useState<boolean>(false);

  const handleOnHideSuccessAlert = (): void => {
    if (additionalHideAction) additionalHideAction();
    setShow(false);
  };

  const drawSuccessAlert = (title?: string, message?: string): JSX.Element => (
    <SuccessAlert
      isShown={show}
      onHide={handleOnHideSuccessAlert}
      title={title}
      message={message}
    />
  );

  const handleSuccessAlert = (): void => {
    if (!show) setShow(true);
  };

  return {
    drawSuccessAlert,
    handleSuccessAlert,
  };
};
