import { Modal, Text, View } from 'react-native';
import { alertStyles } from 'components/Alerts/utils/styles';
import { Button } from 'components/Buttons/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export const ConfirmationAlert = ({
  show, onHide, onConfirm,
  message, title,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={show}
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
            {title || t('alerts.confirmation.title')}
          </Text>
          <Text>
            {message}
          </Text>
          <View style={alertStyles.buttonsContainer}>
            <Button
              title={t('actions.confirm.title')}
              color="primary"
              onPress={onConfirm}
              variant="solid"
              containerStyle={alertStyles.button}
            />
            <Button
              title={t('actions.cancel.title')}
              color="danger"
              onPress={onHide}
              variant="solid"
              containerStyle={alertStyles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
