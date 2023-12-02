import {
  StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import colors from 'themes/colors';

interface Props {
  onChange: (value: number) => void;
  style?: StyleProp<ViewStyle>;
}

export const RatingInput = ({ onChange, style }: Props) => {
  const [ value, setValue ] = useState(0);

  const handleOnPress = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  const drawStarButtons = () => {
    const starButtons: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      const isSelected = value >= i + 1;
      starButtons.push(<Ionicons
        key={`star-${i}`}
        name={isSelected ? icons.STAR : icons.STAR_OUTLINE}
        size={25}
        color={colors.PRIMARY}
        onPress={() => handleOnPress(i + 1)}
      />);
    }
    return starButtons;
  };

  return (
    <View style={[ styles.container, style ]}>
      {drawStarButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
