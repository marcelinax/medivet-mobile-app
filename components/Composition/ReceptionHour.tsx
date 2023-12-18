import { Button } from 'components/Buttons/Button';
import { StyleSheet } from 'react-native';

interface Props {
  hour: string;
  onPress: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  variant?: 'small' | 'normal';
}

export const ReceptionHour = ({
  hour, onPress, disabled, isSelected, variant,
}: Props) => (
  <Button
    onPress={onPress}
    title={hour}
    variant={isSelected ? 'solid' : 'outline'}
    disabled={disabled}
    style={variant === 'small' ? styles.buttonSmall : styles.buttonNormal}
  />
);

const styles = StyleSheet.create({
  buttonSmall: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonNormal: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
