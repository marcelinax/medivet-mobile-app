import { Modal, StyleSheet, View } from 'react-native';
import { Loading } from 'components/Composition/Loading';
import colors from 'themes/colors';
import { FC } from 'react';

interface Props {
  loading: boolean;
}

export const FullScreenLoading: FC<Props> = ({ loading }) => (loading ? (
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
