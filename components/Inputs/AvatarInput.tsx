import { Button } from 'components/Buttons/Button';
import { Avatar } from 'components/Composition/Avatar';
import * as ImagePicker from 'expo-image-picker';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useActionsSheet } from 'hooks/Alerts/useActionsSheet';
import { ActionsSheetButtonProps } from 'types/components/Alerts/types';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { useTranslation } from 'react-i18next';

interface Props {
  onChange: (url?: string) => void;
  onRemove: () => void;
  url?: string;
  icon?: any;
}

export const AvatarInput = ({
  url, onChange, onRemove, icon,
}: Props) => {
  const [ status, requestPermission ] = ImagePicker.useMediaLibraryPermissions();
  const [ image, setImage ] = useState<string>(url || '');
  const { handleErrorAlert } = useErrorAlert();
  const { drawActionsSheet, handleActionsSheet } = useActionsSheet();
  const confirmation = useConfirmationAlert();
  const { t } = useTranslation();

  const onPickImage = async (): Promise<void> => {
    if (!status?.granted) {
      if (!status?.canAskAgain) {
        handleErrorAlert([], t('errors.no_media_library_permission.title'));
      } else {
        await requestPermission();
      }
    } else {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [ 4, 3 ],
        quality: 1,
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
      message: t('alerts.confirmation.remove.title'),
    });
    await onRemove();
    setImage('');
  };

  const actions: ActionsSheetButtonProps[] = [
    {
      onPress: onPickImage,
      title: t('actions.choose.title'),
      variant: 'primary',
    },
    {
      onPress: onRemoveImage,
      title: t('actions.remove.title'),
      variant: 'danger',
      visible: !!image,
    },
  ];

  return (
    <>
      {drawActionsSheet(actions)}
      <View style={styles.container}>
        <Avatar
          size="large"
          url={image}
          icon={icon}
        />
        <Button
          variant="link"
          title={t('actions.change.title').toUpperCase()}
          color="light"
          onPress={handleActionsSheet}
        />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
