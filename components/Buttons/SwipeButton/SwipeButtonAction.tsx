import { FC } from 'react';
import { SwipeButtonActionProps, SwipeButtonSize } from 'types/components/Buttons/types';
import { Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from 'themes/colors';
import { RectButton } from 'react-native-gesture-handler';

interface Props extends SwipeButtonActionProps {
  translateX: Animated.AnimatedInterpolation<number>;
  size?: SwipeButtonSize;
}

export const SWIPE_BUTTON_ACTION_DEFAULT_SIZE = 80;
export const SWIPE_BUTTON_ACTION_SMALL_SIZE = 50;

export const SwipeButtonAction: FC<Props> = ({
  icon,
  backgroundColor,
  onPress,
  color,
  translateX,
  size,
}) => {
  const contentColor = color ?? colors.WHITE;
  const width = size === 'small' ? SWIPE_BUTTON_ACTION_SMALL_SIZE : SWIPE_BUTTON_ACTION_DEFAULT_SIZE;

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <RectButton
        onPress={onPress}
        style={{
          backgroundColor,
          ...styles.container,
          width,
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
    height: '100%',
  },
});
