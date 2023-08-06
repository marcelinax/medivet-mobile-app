import { Modal, StyleSheet, View } from 'react-native';
import sizes from 'constants/sizes';
import { ActionsSheetButtonProps } from 'types/components/Alerts/types';
import { ActionsSheetButton } from 'components/Alerts/ActionsSheet/ActionsSheetButton';
import colors from 'themes/colors';
import { buttonsTranslations } from 'constants/translations/buttons.translations';

interface Props {
  visible: boolean;
  onHide: () => void;
  buttons: ActionsSheetButtonProps[];
}

export const ActionsSheet = ({ visible, onHide, buttons }: Props) => {
  const visibleButtons = buttons.filter((button) => button.visible === true || button.visible === undefined);

  const drawButtons = (): JSX.Element[] => visibleButtons.map((button, index) => (
    <View
      style={index !== buttons.length - 1 ? styles.withSeparator : {}}
      key={`actions-sheet-button-${index}`}
    >
      <ActionsSheetButton
        onPress={() => {
          button.onPress();
          onHide();
        }}
        title={button.title}
        variant={button.variant}
      />
    </View>
  ));

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.buttonsContainer}>
            {drawButtons()}
          </View>
          <View style={styles.lastButtonContainer}>
            <ActionsSheetButton
              onPress={onHide}
              isLast
              title={buttonsTranslations.CANCEL}
              variant="primary"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: colors.OVERLAY,
  },
  modalContainer: {
    width: sizes.FULL_WIDTH,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 30,
    left: 0,
  },
  buttonsContainer: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors.GRAY_LIGHTER,
  },
  withSeparator: {
    borderBottomWidth: 0.2,
    borderBottomColor: colors.GRAY_DARK,
  },
  lastButtonContainer: {
    backgroundColor: colors.WHITE,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
});
