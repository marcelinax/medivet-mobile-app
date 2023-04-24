import {useState} from "react";
import {ActionsSheetButtonProps} from "types/components/Alerts/types";
import {ActionsSheet} from "components/Alerts/ActionsSheet/ActionsSheet";

export const useActionsSheet = () => {
    const [show, setShow] = useState<boolean>(false);

    const drawActionsSheet = (buttons: ActionsSheetButtonProps[]): JSX.Element => (
        <ActionsSheet visible={show} onHide={() => setShow(false)} buttons={buttons}/>
    );

    const handleActionsSheet = () => {
        !show && setShow(true);
    };

    return {
        drawActionsSheet,
        handleActionsSheet
    };
};
