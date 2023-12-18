import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import moment from 'moment';
import { buttonStyles } from 'components/Buttons/utils/styles';
import colors from 'themes/colors';

interface Props {
  onPress: () => void;
  date: string;
  isSelected: boolean;
}

export const CalendarDay = ({ onPress, date, isSelected }: Props) => {
  const dayOfWeek = moment(date).format('ddd');
  const day = moment(date).date();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[
        buttonStyles.container,
        styles.container,
        {
          backgroundColor: isSelected ? colors.PRIMARY : colors.WHITE,
        },
      ]}
      >
        <Text style={[ styles.dayOfWeek, { color: isSelected ? colors.WHITE : colors.GRAY_DARK } ]}>{dayOfWeek}</Text>
        <Text style={[ styles.day, { color: isSelected ? colors.WHITE : colors.PRIMARY } ]}>{day}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.PRIMARY,
    borderWidth: 1,
    flexDirection: 'column',
    paddingHorizontal: 14,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayOfWeek: {
    fontSize: 14,
    marginBottom: 5,
  },
});
