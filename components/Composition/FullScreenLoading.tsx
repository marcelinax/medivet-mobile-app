import { Modal, StyleSheet, View } from 'react-native';
import { Loading } from 'components/Composition/Loading';
import colors from 'themes/colors';

interface Props {
  loading: boolean;
}

export const FullScreenLoading = ({ loading }: Props) => (loading ? (
  <View style={styles.centeredView}>
    <Modal
      animationType="none"
      transparent
      visible={false}
      statusBarTranslucent
    >
      <View style={styles.centeredView}>
        <Loading />
      </View>
    </Modal>
  </View>
) : <></>);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    backgroundColor: colors.GRAY_LIGHT,
  },
});
