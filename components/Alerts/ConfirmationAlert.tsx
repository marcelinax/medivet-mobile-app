import { Modal, Text, View } from 'react-native';
import { alertStyles } from 'components/Alerts/utils/styles';
import { Button } from 'components/Buttons/Button';
import React from 'react';
import { confirmationAlertTranslations } from 'constants/translations/alerts/confirmationAlert.translations';
import { buttonsTranslations } from 'constants/translations/buttons.translations';

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
}: Props) => (
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
          {title || confirmationAlertTranslations.CONFIRMATION_TITLE}
        </Text>
        <Text>
          {message}
        </Text>
        <View style={alertStyles.buttonsContainer}>
          <Button
            title={buttonsTranslations.CONFIRM}
            color="primary"
            onPress={onConfirm}
            variant="solid"
            style={alertStyles.button}
          />
          <Button
            title={buttonsTranslations.CANCEL}
            color="danger"
            onPress={onHide}
            variant="solid"
            style={[ alertStyles.button, alertStyles.secondButton ]}
          />
        </View>
      </View>
    </View>
  </Modal>
);
