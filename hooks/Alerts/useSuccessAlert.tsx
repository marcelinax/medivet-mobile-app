import { SuccessAlert } from "components/Alerts/SuccessAlert";
import { useState } from "react";

export const useSuccessAlert = () => {
    const [show, setShow] = useState<boolean>(false);

    const drawSuccessAlert = (title?: string, message?: string): JSX.Element => (
        <SuccessAlert isShown={show} onHide={() => setShow(false)}
            title={title} message={message}
        />
    );

    const handleSuccessAlert = () => {
        !show && setShow(true);
    };

    return {
        drawSuccessAlert,
        handleSuccessAlert
    };
};
