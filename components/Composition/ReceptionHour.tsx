import { Button } from 'components/Buttons/Button';
import { StyleSheet } from 'react-native';

interface Props {
  hour: string;
  onPress: () => void;
}

export const ReceptionHour = ({ hour, onPress }: Props) => (
  <Button
    onPress={onPress}
    title={hour}
    variant="outline"
    style={styles.button}
    containerStyle={styles.buttonContainer}
  />
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    marginRight: 10,
  },
});
