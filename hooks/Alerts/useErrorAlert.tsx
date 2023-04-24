import { ErrorAlert } from "components/Alerts/ErrorAlert";
import { useState } from "react";

export const useErrorAlert = () => {
    const [show, setShow] = useState<boolean>(false);

    const drawErrorAlert = (title?: string, message?: string): JSX.Element => (
        <ErrorAlert isShown={show} onHide={() => setShow(false)}
            title={title} message={message}
        />
    );

    const handleErrorAlert = () => {
        !show && setShow(true);
    };

    return {
        drawErrorAlert,
        handleErrorAlert
    };
};
