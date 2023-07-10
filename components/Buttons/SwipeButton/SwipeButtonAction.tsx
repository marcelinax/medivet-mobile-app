import { FC } from 'react';
import { SwipeButtonActionProps } from 'types/components/Buttons/types';
import { Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from 'themes/colors';
import { RectButton } from 'react-native-gesture-handler';

interface Props extends SwipeButtonActionProps {
  translateX: Animated.AnimatedInterpolation<number>;
}

export const SWIPE_BUTTON_ACTION_WIDTH = 80;

export const SwipeButtonAction: FC<Props> = ({
  icon,
  backgroundColor,
  onPress,
  color,
  translateX,
}) => {
  const contentColor = color ?? colors.WHITE;

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <RectButton
        onPress={onPress}
        style={{
          backgroundColor,
          ...styles.container,
        }}
      >
        <Ionicons
          name={icon}
          color={contentColor}
          size={25}
        />
      </RectButton>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SWIPE_BUTTON_ACTION_WIDTH,
    height: '100%',

  },
});
