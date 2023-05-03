import {Button} from "components/Buttons/Button";
import {Avatar} from "components/Composition/Avatar";
import {errorAlertTranslations} from "constants/translations/alerts/errorAlert.translations";
import {buttonsTranslations} from "constants/translations/buttons.translations";
import * as ImagePicker from 'expo-image-picker';
import {useErrorAlert} from 'hooks/Alerts/useErrorAlert';
import {FC, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useActionsSheet} from "hooks/Alerts/useActionsSheet";
import {ActionsSheetButtonProps} from "types/components/Alerts/types";
import {useConfirmationAlert} from "hooks/Alerts/useConfirmationAlert";
import {confirmationAlertTranslations} from "constants/translations/alerts/confirmationAlert.translations";

interface Props {
    onChange: (url?: string) => void;
    onRemove: () => void;
    url?: string;
    isAnimal?: boolean;
}

export const AvatarInput: FC<Props> = ({url, onChange, onRemove, isAnimal}) => {
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [image, setImage] = useState<string>(url || '');
    const {drawErrorAlert, handleErrorAlert} = useErrorAlert();
    const {drawActionsSheet, handleActionsSheet} = useActionsSheet();
    const confirmation = useConfirmationAlert();

    const onPickImage = async (): Promise<void> => {
        if (!status?.granted) {
            if (!status?.canAskAgain) {
                handleErrorAlert();
            } else {
                await requestPermission();
            }
        } else {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if (!res.canceled) {
                setImage(res.assets[0].uri);
                onChange(res.assets[0].uri);
            }
        }
    };

    const onRemoveImage = async (): Promise<void> => {
        await confirmation({
            title: '',
            message: confirmationAlertTranslations.REMOVING_CONFIRMATION
        });
        await onRemove();
        setImage('');
    }

    const actions: ActionsSheetButtonProps[] = [
        {
            onPress: onPickImage,
            title: buttonsTranslations.CHOOSE,
            variant: 'primary'
        },
        {
            onPress: onRemoveImage,
            title: buttonsTranslations.REMOVE,
            variant: 'danger',
            visible: !!image
        },
    ];

    return (
        <>
            {drawActionsSheet(actions)}
            <View style={styles.container}>
                {drawErrorAlert(errorAlertTranslations.NO_MEDIA_LIBRARY_PERMISSION_TITLE, errorAlertTranslations.NO_MEDIA_LIBRARY_PERMISSION_MESSAGE)}
                <Avatar size="large" url={image} isAnimal={isAnimal}/>
                <Button variant="link" title={buttonsTranslations.CHANGE.toUpperCase()} color='light'
                        onPress={handleActionsSheet}/>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
});
