import { Button } from "components/Buttons/Button";
import { Avatar } from "components/Composition/Avatar";
import { errorAlertTranslations } from "constants/translations/alerts/errorAlert.translations";
import { buttonsTranslations } from "constants/translations/buttons.translations";
import * as ImagePicker from 'expo-image-picker';
import { useErrorAlert } from 'hooks/Modals/useErrorAlert';
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";


interface Props {
    onChange: (url?: string) => void;
    url?: string;
}

export const AvatarInput: FC<Props> = ({ url, onChange }) => {
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [image, setImage] = useState<string>(url || '');
    const { drawErrorAlert, handleErrorAlert } = useErrorAlert();

    const onPickImage = async () => {
        if (!status?.granted) {
            if (!status?.canAskAgain) {
                handleErrorAlert();
            }
            else {
                await requestPermission();
            }
        }
        else {
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

    return (
        <View style={styles.container}>
            {drawErrorAlert(errorAlertTranslations.NO_MEDIA_LIBRARY_PERMISSION_TITLE, errorAlertTranslations.NO_MEDIA_LIBRARY_PERMISSION_MESSAGE)}
            <Avatar size="large" url={image} />
            <Button variant="link" title={buttonsTranslations.CHANGE.toUpperCase()} color='light' onPress={onPickImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
});