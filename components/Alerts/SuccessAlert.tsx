import { Button } from 'components/Buttons/Button';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import { successAlertTranslations } from 'constants/translations/alerts/successAlert.translations';
import { alertStyles } from 'components/Alerts/utils/styles';

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
}: Props) => (
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
          {title || successAlertTranslations.SUCCESSFUL_ACTION}
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
