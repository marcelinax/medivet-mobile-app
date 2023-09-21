import { Button } from 'components/Buttons/Button';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import { alertStyles } from 'components/Alerts/utils/styles';
import { useTranslation } from 'react-i18next';

interface Props {
  isShown: boolean;
  onHide: () => void;
  title?: string;
  message?: string;
}

export const SuccessAlert = ({
  isShown,
  title,
  onHide,
  message,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={isShown}
      transparent
      animationType="slide"
    >
      <View style={alertStyles.modalContainer}>
        <View style={alertStyles.modal}>
          <Text style={[
            alertStyles.title,
            { marginBottom: !message ? 8 : 0 },
          ]}
          >
            {title || t('alerts.success.title')}
          </Text>
          <Text>
            {message}
          </Text>
          <View style={alertStyles.buttonsContainer}>
            <Button
              title="OK"
              color="primary"
              onPress={onHide}
              variant="solid"
              style={alertStyles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
