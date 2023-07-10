import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FC, useContext, useRef } from 'react';
import { SwipeButtonActionProps, SwipeButtonProps } from 'types/components/Buttons/types';
import { SWIPE_BUTTON_ACTION_WIDTH, SwipeButtonAction } from 'components/Buttons/SwipeButton/SwipeButtonAction';
import { Animated, View } from 'react-native';
import { SwipeButtonContext } from 'contexts/buttons/SwipeButtonContext';

export const SwipeButton: FC<SwipeButtonProps> = ({ leftActions, rightActions, children }) => {
  const ref = useRef<Swipeable>(null);
  const visibleRightActions = (rightActions || []).filter((action) => action.visible !== false);
  const visibleLeftActions = (leftActions || []).filter((action) => action.visible !== false);
  const { currentSwipeButton, setCurrentSwipeButton } = useContext(SwipeButtonContext);
  const LEFT_ACTIONS_VIEW_WIDTH = SWIPE_BUTTON_ACTION_WIDTH * visibleLeftActions.length;
  const RIGHT_ACTIONS_VIEW_WIDTH = SWIPE_BUTTON_ACTION_WIDTH * visibleRightActions.length;

  const renderAction = (
    action: SwipeButtonActionProps,
    progress: Animated.AnimatedInterpolation<number>,
    outputRangeValue: number,
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [outputRangeValue, 0],
    });
    return (
      <SwipeButtonAction
        backgroundColor={action.backgroundColor}
        onPress={() => {
          action.onPress();
          if (ref.current) ref.current.close();
        }}
        translateX={translateX}
        id={action.id}
        key={action.id}
        icon={action.icon}
      />
    );
  };

  const renderActions = (
    actions: SwipeButtonActionProps[],
    progress: Animated.AnimatedInterpolation<number>,
    actionsViewWidth: number,
  ) => (
    <View
      style={{ flexDirection: 'row' }}
    >
      {actions.map((action, index) => {
        const outputRangeValue = actionsViewWidth - (index * (actionsViewWidth / actions.length));
        return renderAction(action, progress, outputRangeValue);
      })}
    </View>
  );

  const renderLeftActions = (progress: Animated.AnimatedInterpolation<number>) => renderActions(
    visibleLeftActions,
    progress,
    LEFT_ACTIONS_VIEW_WIDTH,
  );
  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => renderActions(
    visibleRightActions,
    progress,
    RIGHT_ACTIONS_VIEW_WIDTH,
  );

  const handleClosePreviousButton = () => {
    if (currentSwipeButton?.current) {
      currentSwipeButton.current.close();
    }
    setCurrentSwipeButton(ref.current);
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      ref={ref}
      rightThreshold={30}
      leftThreshold={40}
      friction={2}
      overshootFriction={10}
      onBegan={handleClosePreviousButton}
    >
      {children}
    </Swipeable>
  );
};
